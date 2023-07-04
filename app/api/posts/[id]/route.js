import { connectToDB } from "@/utils/database";
import PostsData from "@/models/PostsData";

// get the data

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const postExists = await PostsData.findById(params.id).populate("creator");
    if (!postExists) {
      return new Response("the post is not found", 404);
    }
    return new Response(JSON.stringify(postExists), { status: 200 });
  } catch (error) {
    console.log("the error while fetching the post:  ", error);
    return new Response("Failed to fetch the post ", { status: 500 });
  }
};

// update the data
export const PATCH = async (req, { params }) => {
  const { title, content, tags } = await req.json();
  try {
    await connectToDB();
    // const postExists = await PostsData.findOne({ _id: userId });
    const postExists = await PostsData.findById(params.id);
    if (!postExists) {
      return new Response("the post is not found", 404);
    }
    (postExists.title = title),
      (postExists.content = content),
      (postExists.tags = tags);
    postExists.save();

    return new Response("the use data is successfully updated", {
      status: 200,
    });
  } catch (error) {
    console.log("the error while updating the post:  ", error);
    return new Response("Failed to update the post ", { status: 500 });
  }
};

// delete the post
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await PostsData.findByIdAndRemove(params.id);

    return new Response("the posts is deleted successfully", { status: 200 });
  } catch (error) {
    console.log("the error while deleting the post:  ", error);
    return new Response("Failed to fetch the post ", { status: 500 });
  }
};
