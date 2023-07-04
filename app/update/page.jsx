"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePost = () => {
  const [inputData, setInputData] = useState([
    {
      title: "",
      content: "",
      tags: "",
    },
  ]);
  const seachParams = useSearchParams();
  const id = seachParams.get("id");
  const router = useRouter();
  const { data: session } = useSession();
  // load the data
  useEffect(() => {
    const fetchPostData = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setInputData(data);
    };
    fetchPostData();
  }, [id]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`api/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: inputData.title,
          content: inputData.content,
          tags: inputData.tags,
          userId: session?.user.id,
        }),
      });
      if (res.ok) {
        alert("your data is successfully updated");
        setInputData([
          {
            title: "",
            content: "",
            tags: "",
          },
        ]);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("the error while posting the data: ", error);
    }
  };
  if (!session?.user) {
    return (
      <h1 className="text-3xl mx-auto text-center my-5">
        {" "}
        Sorry😌, Sign In than come back...
      </h1>
    );
  }
  return (
    <form className="border p-5 flex flex-col w-1/3 gap-2 mx-auto my-6">
      <label htmlFor="title" className="text-xl">
        Title:
      </label>
      <input
        type="text"
        name="title"
        id="title"
        className="border p-2 rounded-sm letter tracking-wide"
        placeholder="Insert Your Title"
        onChange={(e) => setInputData({ ...inputData, title: e.target.value })}
        value={inputData.title}
        required
      />
      <label htmlFor="title" className="text-xl">
        Content:
      </label>
      <textarea
        name="content"
        rows={5}
        id="content"
        className="border p-2 rounded-sm letter tracking-wide"
        placeholder="Paste your content here"
        onChange={(e) =>
          setInputData({ ...inputData, content: e.target.value })
        }
        value={inputData.content}
        required
      />
      <label htmlFor="tags" className="text-xl">
        Tags:
      </label>
      <input
        type="text"
        name="tags"
        id="tags"
        className="border p-2 rounded-sm letter tracking-wide"
        placeholder="Enter Your Tags with comma separated"
        onChange={(e) => setInputData({ ...inputData, tags: e.target.value })}
        value={inputData.tags}
        required
      />
      <button
        type="submit"
        onClick={onSubmit}
        className="border rounded-sm text-xl p-1"
      >
        Submit{" "}
      </button>
    </form>
  );
};

export default UpdatePost;
