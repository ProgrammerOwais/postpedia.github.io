import Link from "next/link";

const About = () => {
  return (
    <article className="py-14 flex flex-col justify-center items-center mx-auto text-center w-1/2">
      <h1 className="text-xl md:text-3xl mb-6 ">
        Get Your Accounts Management Easy
      </h1>
      <p className="text-[14px] md:text-xl mb-6">
        In this simple & light weight web app, you can create, store & manage
        your posts here. Besides that you can direct through link post your post
        on your favourite social account. So what are you waiting for ☺ ...
      </p>
      <button
        type="button"
        className="cursor-pointer border rounded-md py-2 px-0 hover:bg-white hover:text-black hover:shadow-md active:bg-transparent"
      >
        <Link href={"/createnew"} className="py-2 px-3 rounded-md ">
          Create New +
        </Link>
      </button>
    </article>
  );
};

export default About;
