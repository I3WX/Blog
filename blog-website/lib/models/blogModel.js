import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    authorImg: { type: String, default:`/author_img.png` ,required: true },
    Date:{type:Date,default:Date.now}
});

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default BlogModel;