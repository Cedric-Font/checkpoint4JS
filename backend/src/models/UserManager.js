const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select firstname, lastname, mail, pseudo from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }
}

module.exports = UserManager;
