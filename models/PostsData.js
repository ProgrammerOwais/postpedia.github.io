import { Schema, model, models } from "mongoose";

const PostsSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "the title is required"],
  },
  content: {
    type: String,
    required: [true, "the content is required"],
  },
  tags: {
    type: String,
    required: [true, "the tags is required"],
  },
});

const PostsData = models.PostsData || model("PostsData", PostsSchema);

export default PostsData;
