import { connectToDB } from "@/utils/database";
import PostsData from "@/models/PostsData";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const data = await PostsData.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log("the error while fetching the user posts:  ", error);
    console.log("the params value is :  ", params.id);
    return new Response("Failed to fetch the user posts ", { status: 500 });
  }
};
