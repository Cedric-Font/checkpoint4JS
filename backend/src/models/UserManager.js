const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    await this.database.query(
      `insert into ${this.table} (firstname, lastname, mail, pseudo, password) values (?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.mail,
        user.pseudo,
        user.hashedPassword,
      ]
    );
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select firstname, lastname, mail, pseudo from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readByEmailWithPassword(mail) {
    const [rows] = await this.database.query(
      `select mail, password from ${this.table} where mail = ?`,
      [mail]
    );

    return rows[0];
  }
}

module.exports = UserManager;
