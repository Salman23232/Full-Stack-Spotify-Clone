import React, { useContext } from "react";
import { assets } from "./assets/assets";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import { PlayerContext } from "./context/PlayerContext";
import LoadingSpinner from "./components/Loading";

// Clerk components
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton
} from "@clerk/clerk-react";

import {
  Routes,
  Route,
  Outlet
} from "react-router-dom";

// Pages
import DisplayHome from "./components/DisplayHome";
import DisplayAlbum from "./components/DisplayAlbum";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AppLayout = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <>
      <SignedIn>
        <div className="h-screen bg-black">
          {songsData.length !== 0 ? (
            <>
              <div className="h-[90%] flex">
                <Sidebar />
                <div className="flex-1 overflow-auto p-4">
                  {/* Render nested routes here */}
                  <Outlet />
                </div>
              </div>
              <Player />
              <audio ref={audioRef} src={track ? track.file : ""} preload="auto" />
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
        <Routes>
          {/* Auth routes */}
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

          {/* Main App layout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DisplayHome />} />
            <Route path="album/:id" element={<DisplayAlbum />} />
          </Route>
        </Routes>
    </ClerkProvider>
  );
};

export default App;
