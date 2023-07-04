"use client";
import { useSession } from "next-auth/react";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import Image from "next/image";

const Dashboard = () => {
  const [userData, setUserData] = useState([
    {
      title: "",
      content: "",
      tags: "",
    },
  ]);

  const { data: session } = useSession();
  useEffect(() => {
    const fetchpost = async () => {
      const res = await fetch(`api/posts/users/${session?.user.id}/posts`);
      const data = await res.json();
      setUserData(data);
    };
    fetchpost();
  }, [session?.user.id]);
  return (
    <section className="flex flex-col md:flex-row justify-between">
      <aside className="bg-cyan-500 w-full text-center md:min-h-screen gap-4 md:w-[20%] p-6 flex md:flex-col items-center">
        <h2 className="text-xl md:text-2xl">Dashboard</h2>
        {session?.user ? (
          <>
            <Image
              src={session?.user.image}
              className="rounded-full"
              alt="profile-img"
              width={50}
              height={50}
            />
            <h2 className=" text-2xl md:text-3xl">{session?.user.name}</h2>
          </>
        ) : (
          <h3>The user is not yet LoggedIn</h3>
        )}
      </aside>
      <main className="w-full md:w-[75%] ">
        {!session?.user ? (
          <h2 className="text-3xl">First YOU Will Need To LogIn</h2>
        ) : (
          <>
            <section className="p-5">
              <h2 className="text-center text-3xl mb-3">Your Posts</h2>
              <div className="cards  flex justify-center gap-3 flex-wrap">
                {userData.map((data, id) => {
                  return (
                    <Card
                      key={id}
                      title={data.title}
                      content={data.content}
                      tags={data.tags}
                      postId={data._id}
                    />
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </section>
  );
};

export default Dashboard;
