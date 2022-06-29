const StudentsGroups = require("../models/students_groups.js");
const {
  AuthrizationError,
  ForbiddenError,
  InternalServerError,
} = require("../utils/errors.js");

const GET = (req, res, next) => {
  try {
    const { id } = req.params;
    const studentGroup = new StudentsGroups();
    if (id) {
      const foundStudentGroup = studentGroup.findStudentGroupById(id);
      if (foundStudentGroup) {
        return res.status(200).json(foundStudentGroup);
      } else {
        return res.status(404).json({ message: "studentGroup not found" });
      }
    }
    res.status(200).json(studentGroup.getStudentGroups());
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const POST = (req, res, next) => {
  try {
    const { studentId, groupId } = req.body;

    if (!studentId || !groupId) {
      return res
        .status(400)
        .json({ message: "group_name or group_price is required" });
    }

    if (typeof studentId === "string" || typeof groupId === "string") {
      return res
        .status(400)
        .json({ message: "studentId or groupId typeof is string" });
    }

    const studentGroup = new StudentsGroups(studentId, groupId);
    studentGroup.addId();
    const result = studentGroup.insertStudentGroupData();
    if (result) {
      res.status(201).json(studentGroup.getStudentGroups(result.id));
    } else {
      res.status(400).json({
        message: "did not register, because the location is not enough:(",
      });
    }
  } catch (error) {
    // return next(new AuthrizationError(400, error.message));
    res.status(500).end();
  }
};

const DELETE = (req, res, next) => {
  try {
    const { studentId, groupId } = req.body;
    const studentGroup = new StudentsGroups();

    studentGroup.deleteStudentsGroup(studentId, groupId);

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    return next(new ForbiddenError(403, error.message));
  }
};

module.exports = { GET, POST, DELETE };
