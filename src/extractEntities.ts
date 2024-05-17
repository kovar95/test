import { AppDataSource } from "./data-source";
import { City } from "./entity/City";
import { Brand } from "./entity/Brand";
import { DishType } from "./entity/DishType";
import { Diet } from "./entity/Diet";

interface Entity {
  id: number;
  name: string;
}

interface Combination {
  city?: Entity;
  brand?: Entity;
  dishType?: Entity;
  diet?: Entity;
}

const extractEntities = async (searchTerm: string): Promise<Combination[]> => {
  await AppDataSource.initialize();

  const cityRepo = AppDataSource.getRepository(City);
  const brandRepo = AppDataSource.getRepository(Brand);
  const dishTypeRepo = AppDataSource.getRepository(DishType);
  const dietRepo = AppDataSource.getRepository(Diet);

  const entities = {
    city: [] as Entity[],
    brand: [] as Entity[],
    dishType: [] as Entity[],
    diet: [] as Entity[],
  };

  const searchTerms = searchTerm.toLowerCase().split(" ");

  const cities = await cityRepo.find();
  const brands = await brandRepo.find();
  const dishTypes = await dishTypeRepo.find();
  const diets = await dietRepo.find();

  for (const word of searchTerms) {
    for (const city of cities) {
      if (city.name.toLowerCase() === word) {
        entities.city.push(city);
      }
    }
    for (const brand of brands) {
      if (brand.name.toLowerCase() === word) {
        entities.brand.push(brand);
      }
    }
    for (const dishType of dishTypes) {
      if (dishType.name.toLowerCase() === word) {
        entities.dishType.push(dishType);
      }
    }
    for (const diet of diets) {
      if (diet.name.toLowerCase() === word) {
        entities.diet.push(diet);
      }
    }
  }

  const combinations: Combination[] = [];

  for (const city of entities.city) {
    for (const brand of entities.brand) {
      for (const dishType of entities.dishType) {
        for (const diet of entities.diet) {
          const combination: Combination = {};
          if (city && city.id) combination.city = city;
          if (brand && brand.id) combination.brand = brand;
          if (dishType && dishType.id) combination.dishType = dishType;
          if (diet && diet.id) combination.diet = diet;
          combinations.push(combination);
        }
      }
    }
  }

  await AppDataSource.destroy();

  return combinations;
};

// Usage example
extractEntities("vegan sushi in London")
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
