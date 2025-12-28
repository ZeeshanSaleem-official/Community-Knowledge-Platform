import { DataSource, DataSourceOptions } from "typeorm"; // THIS IS CORRECT
import { Account } from "@/entities/Account";
import { User } from "@/entities/User";
import { VerificationToken } from "@/entities/VerificationToken";
import "reflect-metadata";
import { Session } from "@/entities/Session";
import { Post } from "@/entities/Post";
import { Topic } from "@/entities/Topic";
import { Comment } from "@/entities/Comment";

export const connectionOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: false,
  entities: [User, Account, VerificationToken, Session, Post, Topic, Comment],
  migrations: [],
  // Inside connectionOptions...
  ssl: process.env.DB_HOST !== "localhost" && {
    rejectUnauthorized: false,
  },
};
const AppDataSource = new DataSource(connectionOptions);
let initialize = false;
export const getDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
