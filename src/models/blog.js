import mongoose from "mongoose";

// database
// models
// api routes -> add , fetch  / get , delete , update

const BlogSchema = new mongoose.Schema({
    title:String,
    description: String
})

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema)

export default Blog