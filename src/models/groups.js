const fs = require("fs");

class Groups {
  #database = __dirname + "/../database/group.json";

  constructor(groupName = "", groupPrice = "") {
    this.id = 0;
    this.groupName = groupName;
    this.groupPrice = groupPrice;
  }

  addId() {
    const groupsData = this.getGroupsData();

    if (groupsData && groupsData.length) {
      this.id = groupsData[groupsData.length - 1].id + 1;
    } else {
      this.id = 0;
    }
  }

  findGroupById(id) {
    const data = this.getGroupsData();

    return data.find((data) => data.id == id);
  }

  getGroupsData() {
    const file = fs.readFileSync(this.#database, "utf8");
    if (file) {
      return [...JSON.parse(file)];
    } else {
      return [];
    }
  }

  insertGroupData() {
    const data = this.getGroupsData();
    if (data && data.length) {
      fs.writeFileSync(this.#database, JSON.stringify([...data, this]));
    } else {
      fs.writeFileSync(this.#database, JSON.stringify([this]));
    }
  }
}

module.exports = Groups;
