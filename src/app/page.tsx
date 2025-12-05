import { getDataSource } from "@/db/connect";
import { User } from "@/entities/User";

export default async function Home() {
  try {

    const db = await getDataSource();
    const users = await db?.getRepository(User).find();
    console.log(users);
  }
  catch (error) {
    console.error("Error Fectching users: ", error);
  }
  return (
    <>
    </>
  );
}
