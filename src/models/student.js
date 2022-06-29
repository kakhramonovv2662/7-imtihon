const fs = require("fs");

class Student {
  #database = __dirname + "/../database/student.json";

  constructor(username = "", age = 0, balance = 0) {
    this.id = 0;
    this.username = username;
    this.age = age;
    this.balance = balance;
  }

  addId() {
    const studentsData = this.getStudentsData();

    if (studentsData && studentsData.length) {
      this.id = studentsData[studentsData.length - 1].id + 1;
    } else {
      this.id = 0;
    }
  }

  findStudentById(id) {
    const data = this.getStudentsData();

    return data.find((data) => data.id == id);
  }

  getStudentsData() {
    const file = fs.readFileSync(this.#database, "utf8");
    if (file) {
      return [...JSON.parse(file)];
    } else {
      return [];
    }
  }

  insertStudentData() {
    const data = this.getStudentsData();
    if (data && data.length) {
      fs.writeFileSync(this.#database, JSON.stringify([...data, this]));
    } else {
      fs.writeFileSync(this.#database, JSON.stringify([this]));
    }
  }
}

module.exports = Student;
