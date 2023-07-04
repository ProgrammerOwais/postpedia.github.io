"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  // providers will use to get the user value
  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  // const isUserLoggedIn = true;
  const { data: session } = useSession();

  return (
    <nav className="w-full bg-blue-300 flex justify-between items-center h-[70px] py-8 px-6">
      <div className="w-[10%] flex justify-between items-center">
        <h1
          className="text-xl text-white  sm:text-3xl"
          onClick={() => {
            // console.log("provider valiue is: ", providers);
            // console.log("session valiue is: ", session?.user);
          }}
        >
          <Link href={"/"}> Postpedia</Link>
        </h1>
      </div>
      <div className="w-[50%] hidden text-[0.8rem] md:block">
        <ul className="w-full flex justify-between items-center">
          <li>
            <Link className="text-xl/4 text-white cursor-pointer  " href={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-xl/4 text-white cursor-pointer"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="text-xl/4 no-underline text-white cursor-pointer"
              href={"/createnew"}
            >
              Create New +
            </Link>
          </li>
          <li>
            <Link
              className="text-xl/4 no-underline text-white cursor-pointer"
              href={"/about"}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-[8%] cursor-pointer flex justify-center text-2xl border md:hidden relative">
        <div
          className="hamburger"
          onClick={(e) => {
            setToggle(!toggle);
          }}
        >
          {" "}
          ☰
        </div>
        {/* mobile menu  */}
        <div
          className={`mobile-menu md:hidden  w-[100vw] min-h-screen absolute ${
            toggle ? "flex" : "hidden"
          } flex-col justify-start items-center gap-2 border shadow p-10 -right-6 top-10 text-center bg-black`}
        >
          <div className="w-full  text-[0.8rem] ">
            <ul className="w-full flex flex-col gap-2 justify-between items-center">
              <li>
                <Link
                  className="text-3xl text-white cursor-pointer  "
                  href={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-3xl text-white cursor-pointer"
                  href={"/dashboard"}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="text-3xl no-underline text-white cursor-pointer"
                  href={"/createnew"}
                >
                  Create New +
                </Link>
              </li>
              <li>
                <Link
                  className="text-3xl no-underline text-white cursor-pointer"
                  href={"/about"}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full  flex flex-col gap-3 justify-between items-center ">
            {session?.user ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                  }}
                  className="text-2xl py-3 px-4 bg-black text-yellow-300 rounded-xl outline-none cursor-pointer border border-solid border-slate-500"
                >
                  SignOut
                </button>
                <Image
                  src={session?.user.image}
                  alt="medical Logo"
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              </>
            ) : (
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="text-2xl py-3 px-4 bg-black text-yellow-300 rounded-xl outline-none cursor-pointer border border-solid border-slate-500"
                    >
                      SignIn
                    </button>
                  ))}{" "}
              </>
            )}
          </div>
        </div>
      </div>
      {/* // desktop menu */}
      <div className="w-[15%] lg:w-[12%] hidden md:flex md:justify-between md:items-center ">
        {session?.user ? (
          <>
            {/* ☰ */}
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="text-[1rem] py-1 px-2 bg-black text-yellow-300 rounded-xl outline-none cursor-pointer border border-solid border-slate-500"
            >
              SignOut
            </button>
            <Image
              src={session?.user.image}
              alt="medical Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="text-[1rem] py-1 px-2 bg-black text-yellow-300 rounded-xl outline-none cursor-pointer border border-solid border-slate-500"
                >
                  SignIn
                </button>
              ))}{" "}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
