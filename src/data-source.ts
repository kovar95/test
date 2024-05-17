import { DataSource } from "typeorm";
import { City } from "./entity/City";
import { Brand } from "./entity/Brand";
import { DishType } from "./entity/DishType";
import { Diet } from "./entity/Diet";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/./../.env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [City, Brand, DishType, Diet],
  dropSchema: false,
  migrations: [],
  subscribers: [],
  ssl: {
    // if db requires SSL certificate
    // ca: process.env.DB_CERTIFICATE,
    rejectUnauthorized: false, // Necessary for self-signed certificates
  },
});
