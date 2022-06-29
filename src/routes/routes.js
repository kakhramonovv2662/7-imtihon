const { Router } = require("express");
const studentController = require("../controllers/studentControl");
const groupController = require("../controllers/groupControl");
const studentGroupController = require("../controllers/studentGroup");

const router = Router();

router.get("/students", studentController.GET);
router.get("/students/:id", studentController.GET);
router.post("/students", studentController.POST);
router.get("/groups", groupController.GET);
router.get("/groups/:id", groupController.GET);
router.post("/groups", groupController.POST);
router.delete("/deleteFromGroup", studentGroupController.DELETE);
router.get("/studentGroups", studentGroupController.GET);
router.get("/studentGroups/:id", studentGroupController.GET);
router.post("/addToGroup", studentGroupController.POST);

module.exports = router;
