import Link from "next/link";
const Main = () => {
  return (
    <article className="py-14 flex flex-col justify-center items-center mx-auto text-center w-1/2">
      <h1 className="text-xl md:text-3xl mb-6 ">
        Create Your Own Posts & Instantly Post It on Your Social Accounts
      </h1>
      <p className="text-[14px] md:text-xl mb-6">
        Create your awesome posts & store here. A very simple & light app where
        you can store your own valuable posts, then posts it whenever you want
        on your social accounts directly from here.
      </p>
      <button
        type="button"
        className="cursor-pointer border rounded-md py-2 px-0 hover:bg-white hover:text-black hover:shadow-md active:bg-transparent"
      >
        <Link href={"/createnew"} className=" py-2 px-3 rounded-md ">
          Create New +
        </Link>
      </button>
    </article>
  );
};

export default Main;
