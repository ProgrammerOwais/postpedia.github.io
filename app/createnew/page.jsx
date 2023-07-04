"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const New = () => {
  const router = useRouter();
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputTags, setInputTags] = useState("");
  const { data: session } = useSession();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`api/posts/new`, {
        method: "POST",
        body: JSON.stringify({
          title: inputTitle,
          content: inputContent,
          tags: inputTags,
          userId: session?.user.id,
        }),
      });
      if (res.ok) {
        alert("your data is successfully submitted");
        router.push("/");
      }
    } catch (error) {
      console.log("the error while posting the data: ", error);
    }
    setInputTitle("");
    setInputContent("");
    setInputTags("");
  };
  if (!session?.user) {
    return (
      <h1 className="text-3xl text-center mx-auto my-5">
        {" "}
        Sorry😌, Sign In than come back...
      </h1>
    );
  }
  return (
    <form className="shadow-lg border md:border-2 border-slate-400/20 rounded-md p-3 md:p-5 flex flex-col w-11/12 md:w-2/3 lg:w-1/3 gap-2 mx-auto my-6">
      <label htmlFor="title" className=" text-[1rem] md:text-xl">
        Title:
      </label>
      <input
        type="text"
        name="title"
        id="title"
        className="border md:border-2 text-[0.8rem] md:text-xl border-slate-400/70 focus:border-gray-100 p-2 rounded-md letter tracking-wide outline-none bg-transparent text-white"
        placeholder="Insert Your Title"
        onChange={(e) => setInputTitle(e.target.value)}
        value={inputTitle}
        required
      />
      <label htmlFor="title" className="text-[1rem] md:text-xl">
        Content:
      </label>
      <textarea
        name="content"
        rows={5}
        id="content"
        className=" p-2 border md:border-2 text-[0.8rem] md:text-xl border-slate-400/70 focus:border-gray-100 rounded-md letter tracking-wide bg-transparent text-white"
        placeholder="Paste your content here"
        onChange={(e) => setInputContent(e.target.value)}
        value={inputContent}
        required
      />
      <label htmlFor="tags" className="text-[1rem] md:text-xl">
        Tags:
      </label>
      <input
        type="text"
        name="tags"
        id="tags"
        className=" p-2 border md:border-2 text-[0.8rem] md:text-xl border-slate-400/70 focus:border-gray-100 rounded-md letter tracking-wide bg-transparent text-white"
        placeholder="Enter Your Tags with comma separated"
        onChange={(e) => setInputTags(e.target.value)}
        value={inputTags}
        required
      />
      <button
        type="submit"
        onClick={onSubmit}
        className=" text-[1rem] md:text-xl p-1 border-2 border-slate-400/70  hover:border-gray-100 rounded-md "
      >
        Submit{" "}
      </button>
    </form>
  );
};

export default New;
