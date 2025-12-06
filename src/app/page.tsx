import TopicCreateForm from "@/components/topics/topic-create-form";
// import { getDataSource } from "@/db/connect";
// import { User } from "@/entities/User";
// import { AuthButtons } from "@/components/auth-buttons"; // 👈 Import your new component
// import { Session } from "next-auth";
// import { auth } from "@/auth";
// import { user } from "@nextui-org/react";
// import Profile from "@/components/Profile";
export default async function Home() {
  // const session = await auth();
  // const db = await getDataSource();
  // const users = await db.getRepository(User).find();
  // console.log(users);

  return (
    // <div className="p-10">
    //   <div className="mt-4">
    //     <AuthButtons />
    //     {
    //       session?.user ? <div>Signed IN<br></br>{JSON.stringify(session.user)}</div> : <div>Signed Out</div>
    //     }
    //   </div>
    //   <Profile />
    // </div>
    <>
      <div className=" grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
          <h1 className="text-xl m-2">
            Top Posts
          </h1>
        </div>

        <div>
          <TopicCreateForm />
        </div>
      </div>

    </>
  );
}