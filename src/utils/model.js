import fs from "fs";
import path from "path";

function read(fileName) {
  let data = fs.readFileSync(
    path.join(process.cwd(), "src", "database", fileName + ".json"),
    "utf-8"
  );
  return JSON.parse(data) || [];
}

function write(fileName, data) {
  fs.writeFileSync(
    path.join(process.cwd(), "src", "database", fileName + ".json"),
    JSON.stringify(data, null, 4)
  );
  return true;
}

export { read, write };

export const users = [
  {
    user_id: 1,
    username: "salim",
    password: "12Aa$1oe",
    email: "salim@gmail.com",
  },
];

export const categories = [
  { categoryId: 1, categoryName: "electronics", subCat: [] },
  { categoryId: 2, categoryName: "clothes", subCat: [] },
];

export const subCategories = [
  {
    subCategoryId: 1,
    categoryId: 1,
    subCategoryName: "smart phones",
    subArr: [],
  },
  {
    subCategoryId: 2,
    categoryId: 1,
    subCategoryName: "televisions",
    subArr: [],
  },
  {
    subCategoryId: 3,
    categoryId: 1,
    subCategoryName: "laptops",
    subArr: [],
  },
  {
    subCategoryId: 4,
    categoryId: 2,
    subCategoryName: "boots",
    subArr: [],
  },
  {
    subCategoryId: 5,
    categoryId: 2,
    subCategoryName: "shirts",
    subArr: [],
  },
];

export const products = [
  {
    productId: 1,
    subCategoryId: 1,
    model: "redmi",
    productName: "redmi note 6 pro",
    color: "black",
    price: "140",
  },
  {
    productId: 2,
    subCategoryId: 1,
    model: "samsung",
    productName: "galaxy 7",
    color: "red",
    price: "190",
  },
  {
    productId: 3,
    subCategoryId: 2,
    model: "Artel",
    productName: "Artel 48 2x",
    color: "black",
    price: "340",
  },
  {
    productId: 4,
    subCategoryId: 3,
    model: "hp",
    productName: "hp pavilon",
    color: "silver",
    price: "640",
  },
  {
    productId: 5,
    subCategoryId: 4,
    model: "salamandra",
    productName: "salamandra 42 x1",
    color: "black",
    price: "32",
  },
  {
    productId: 6,
    subCategoryId: 5,
    model: "polo",
    productName: "polo xr13",
    color: "white",
    price: "12",
  },
];

for (let i = 0; i < categories.length; i++) {
  for (let j = 0; j < subCategories.length; j++) {
    if (categories[i].categoryId === subCategories[j].categoryId) {
      if (subCategories[j].subArr.length > 0) {
        for (let m = 0; m < subCategories[j].subArr.length; m++) {
          delete subArr[m];
        }
      }

      categories[i]["subCat"].push(subCategories[j]);
    }
  }
}

for (let i = 0; i < subCategories.length; i++) {
  for (let j = 0; j < products.length; j++) {
    if (subCategories[i].subCategoryId === products[j].subCategoryId) {
      subCategories[i]["subArr"].push(products[j]);
    }
  }
}
