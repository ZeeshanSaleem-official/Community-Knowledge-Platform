import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";

// Import entities separately to avoid barrel file circular dependencies
import { User } from "@/entities/User";
import { Account } from "@/entities/Account";
import { VerificationToken } from "@/entities/VerificationToken";
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
  ssl: process.env.DB_HOST !== "localhost" && {
    rejectUnauthorized: false,
  },
};

const globalForTypeorm = globalThis as unknown as {
  AppDataSource: DataSource;
};

const AppDataSource =
  globalForTypeorm.AppDataSource || new DataSource(connectionOptions);

if (process.env.NODE_ENV !== "production") {
  globalForTypeorm.AppDataSource = AppDataSource;

  // Monkey-patch getRepository to survive Next.js HMR class reference changes
  const originalGetRepository = AppDataSource.getRepository.bind(AppDataSource);
  AppDataSource.getRepository = function (entity: any) {
    if (typeof entity === "function" && entity.name) {
      return originalGetRepository(entity.name);
    }
    return originalGetRepository(entity);
  };
}

export const getDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
