const Student = require("../models/student.js");
const {
  InternalServerError,
  AuthrizationError,
} = require("../utils/errors.js");

const GET = (req, res, next) => {
  try {
    const { id } = req.params;
    const student = new Student();
    if (id) {
      const foundStudent = student.findStudentById(id);
      if (foundStudent) {
        return res.status(200).json(foundStudent);
      } else {
        return res.status(404).json({ message: "student not found" });
      }
    }
    res.status(200).json(student.getStudentsData());
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const POST = (req, res, next) => {
  try {
    const { username, age, balance } = req.body;

    console.log(req.body);

    if (!username || !age || !balance) {
      return res
        .status(400)
        .json({ message: "username or age or balance is required" });
    }

    if (typeof age === "string" || typeof balance === "string") {
      return res
        .status(400)
        .json({ message: "age or balance typeof is string" });
    }

    const student = new Student(username, age, balance);
    student.addId();
    student.insertStudentData();
    res.status(201).json(student);
  } catch (error) {
    return next(new AuthrizationError(400, error.message));
  }
};

module.exports = {
  GET,
  POST,
};
