import { SignUp } from "@clerk/clerk-react";


const page = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white dark:bg-blue-950">
      <SignUp />
    </div>
  );
};

export default page;
