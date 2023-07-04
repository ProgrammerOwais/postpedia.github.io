import { connectToDB } from "@/utils/database";
// import PostsData from "@/utils/database";
import PostsData from "@/models/PostsData";

export const POST = async (req, res) => {
  const { title, content, tags, userId } = await req.json();
  try {
    await connectToDB();
    let data = new PostsData({
      creator: userId,
      title: title,
      content: content,
      tags: tags,
    });
    await data.save();
    return new Response("the data is successfully submitted", { status: 201 });
  } catch (error) {
    console.log("the error while posting the data:  ", error);
    return new Response("Failed to post the data ", { status: 500 });
  }
};
