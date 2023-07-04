"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Card = ({ title, content, tags, postId }) => {
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);
  // copy to clipboard
  const copyPost = (title, content, tags) => {
    const text = `Title: ${title}, \n Content: ${content} , \n Tags: ${tags} `;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };
  //  handle delete
  const deletePost = async () => {
    const isConfirm = confirm("Are you sure, do you wanna delete it");
    if (isConfirm) {
      await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      setIsDeleted(true);
    }
  };
  if (isDeleted) return <></>;
  else {
    return (
      <div className="card relative border border-slate-700 shadow-md rounded-md px-10 py-5 text-center flex justify-center items-center gap-3 flex-col w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%]">
        <button
          onClick={(e) => {
            copyPost(title, content, tags);
            e.target.innerText = "✅";
          }}
          className="copy cursor-pointer text-[12px]  absolute right-2 top-3 "
        >
          📝
        </button>
        <button
          onClick={() => {
            deletePost();
          }}
          className="copy cursor-pointer text-[12px]  absolute left-2 top-3 "
        >
          ❌
        </button>
        <button
          onClick={() => {
            router.push(`/update?id=${postId}`);
          }}
          className="copy cursor-pointer text-[14px]   absolute left-2 bottom-3 "
        >
          🖊
        </button>
        <h2 className="title text-xl    ">{title} </h2>

        <p className="content text-[14px] ">{content}</p>
        <p className="tags text-left text-[14px]">{tags}</p>
      </div>
    );
  }
};

export default Card;
