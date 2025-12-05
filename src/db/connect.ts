import { DataSource } from "typeorm"
import { DataSourceOptions } from "typeorm/browser";
import { Account } from "@/entities/Account";
import { User } from "@/entities/User";
import { VerificationToken } from "@/entities/VerificationToken";
import "reflect-metadata"



export const connectionOptions: DataSourceOptions = ({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities:
        [
            User, Account, VerificationToken,
        ],
    migrations:
        [

        ]

})
const AppDataSource = new DataSource(connectionOptions);
let initialize = false;
export const getDataSource = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
}
