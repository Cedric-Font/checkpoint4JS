/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    const valuesUser = [
      ["cedric", "font", "cedricFont@mail.com", "fancover", "toto"],
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
