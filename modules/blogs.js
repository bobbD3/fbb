const mongoose = require('mongoose')

//Schema Setup
const blogSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    metadata: String,
    metadataDesc: String,
    author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username: String
     }
})
var Post = mongoose.model("Blog", blogSchema)
module.exports = Post