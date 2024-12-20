import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: {type: String, requried: true},
    desc: {type: String, requried: true},
    bgColour: {type: String, requried: true},
    image : {type: String, requried: true}
})

const albumModel = mongoose.models.album || mongoose.model("album", albumSchema)

export default albumModel;