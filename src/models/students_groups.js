const fs = require("fs");
const Groups = require("./groups");
const Student = require("./student");

class StudentsGroups {
  #database = __dirname + "/../database/studentGroup.json";
  #students = new Student();
  #groups = new Groups();

  constructor(groupId, studentId) {
    this.id = 0;
    this.groupId = groupId;
    this.studentId = studentId;
  }

  addId() {
    const studentGroupsData = this.getStudentGroupsData();

    if (studentGroupsData && studentGroupsData.length) {
      this.id = studentGroupsData[studentGroupsData.length - 1].id + 1;
    } else {
      this.id = 0;
    }
  }

  findStudentGroupById(id) {
    const data = this.getStudentGroupsData();

    return data.find((data) => data.id == id);
  }

  getStudentGroupsData() {
    const file = fs.readFileSync(this.#database, "utf8");
    if (file) {
      return [...JSON.parse(file)];
    } else {
      return [];
    }
  }

  getStudentGroups(id = "") {
    const studentGroup = this.getStudentGroupsData();
    const students = this.#students.getStudentsData();
    const groups = this.#groups.getGroupsData();
    const result = studentGroup.map((sg) => {
      const foundStudent = students.find((s) => s.id === sg.studentId);
      const foundGroup = groups.find((g) => g.id === sg.groupId);
      sg["student"] = foundStudent;
      sg["group"] = foundGroup;

      return sg;
    });

    return result.find((r) => r.id === id);
  }

  insertStudentGroupData() {
    const data = this.getStudentGroupsData();

    const foundGroup = this.#groups
      .getGroupsData()
      .find((g) => g.id === this.groupId);
    const foundStudent = this.#students
      .getStudentsData()
      .find((s) => s.id === this.studentId);

    if (foundGroup.groupPrice > foundStudent.balance) return false;

    if (data && data.length) {
      fs.writeFileSync(this.#database, JSON.stringify([...data, this]));
    } else {
      fs.writeFileSync(this.#database, JSON.stringify([this]));
    }

    return this;
  }

  deleteStudentsGroup(sId, gId) {
    const data = this.getStudentGroupsData();
    const filterData = data.filter((d) => {
      if (d.studentId !== sId && d.groupId !== gId) {
        return d;
      }
    });
    fs.writeFileSync(this.#database, JSON.stringify([...filterData]));
  }
}

module.exports = StudentsGroups;
