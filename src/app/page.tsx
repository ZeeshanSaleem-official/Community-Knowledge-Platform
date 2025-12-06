
import { getDataSource } from "@/db/connect";
import { User } from "@/entities/User";
import { AuthButtons } from "@/components/auth-buttons"; // 👈 Import your new component
import { Session } from "next-auth";
import { auth } from "@/auth";
import { user } from "@nextui-org/react";
import Profile from "@/components/Profile";
export default async function Home() {
  const session = await auth();
  // const db = await getDataSource();
  // const users = await db.getRepository(User).find();
  // console.log(users);

  return (
    <div className="p-10">
      <h1>Welcome to the Snippet App</h1>
      <div className="mt-4">
        <AuthButtons />

        {
          session?.user ? <div>Signed IN<br></br>{JSON.stringify(session.user)}</div> : <div>Signed Out</div>
        }
      </div>
      <Profile />
    </div>
  );
}