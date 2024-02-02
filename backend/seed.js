/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();
const argon2 = require("argon2");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];
    const hashingOptions = {
      type: argon2.argon2id,
      memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
      timeCost: 2,
      parallelism: 1,
    };
    const mdp = "Cedricfont2!";
    const newhasPassword = await argon2.hash(mdp, hashingOptions);
    const valuesUser = [
      ["cedric", "font", "cedricFont@gmail.com", "fancover", newhasPassword],
      ["john", "smis", "johnSmis@studio.com", "smith", "tata"],
    ];
    for await (const rowValues of valuesUser) {
      queries.push(
        database.query(
          "INSERT INTO user (firstname, lastname, mail, pseudo, password) VALUES (?)",
          [rowValues]
        )
      );
    }

    const valuesVideoCategory = [["home"], ["personal"], ["private"]];

    for await (const rowValues of valuesVideoCategory) {
      queries.push(
        database.query("INSERT INTO categorie (name) VALUES (?)", [rowValues])
      );
    }
    const valuesVideo = [
      ["reussir mon checkpoint 4", "home", 1, 1],
      ["finir la premiere us", "personal", 2, 2],
    ];

    for await (const rowValues of valuesVideo) {
      queries.push(
        database.query(
          "INSERT INTO liste (task, names, categorie_id, user_id) VALUES (?)",
          [rowValues]
        )
      );
    }

    // try {
    //   // Declare an array to store the query promises
    //   // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    //   const queries = [];

    //   /* ************************************************************************* */

    //   // Generating Seed Data

    //   // Optional: Truncate tables (remove existing data)
    //   await database.query("truncate item");

    //   // Insert fake data into the 'item' table
    //   for (let i = 0; i < 10; i += 1) {
    //     queries.push(
    //       database.query("insert into item(title) values (?)", [
    //         faker.lorem.word(),
    //       ])
    //     );
    //   }

    //   /* ************************************************************************* */

    //   // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
