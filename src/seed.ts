import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { City } from "./entity/City";
import { Brand } from "./entity/Brand";
import { DishType } from "./entity/DishType";
import { Diet } from "./entity/Diet";

const seedData = async () => {
  await AppDataSource.initialize();

  const cityRepo = AppDataSource.getRepository(City);
  const brandRepo = AppDataSource.getRepository(Brand);
  const dishTypeRepo = AppDataSource.getRepository(DishType);
  const dietRepo = AppDataSource.getRepository(Diet);

  const cities = [{ name: "London" }, { name: "Manchester" }];
  const brands = [{ name: "McDonald's" }, { name: "Burger King" }];
  const dishTypes = [{ name: "Sushi" }, { name: "Burger" }];
  const diets = [{ name: "Vegan" }, { name: "Vegetarian" }];

  await cityRepo.save(cities);
  await brandRepo.save(brands);
  await dishTypeRepo.save(dishTypes);
  await dietRepo.save(diets);

  await AppDataSource.destroy();
};

seedData().catch((error) => console.error(error));
