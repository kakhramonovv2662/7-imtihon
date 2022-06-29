const Groups = require("../models/groups.js");
const {
  AuthrizationError,
  ForbiddenError,
  InternalServerError,
} = require("../utils/errors.js");

const GET = (req, res, next) => {
  try {
    const { id } = req.params;
    const group = new Groups();
    if (id) {
      const foundGroup = group.findGroupById(id);
      if (foundGroup) {
        return res.status(200).json(foundGroup);
      } else {
        return res.status(404).json({ message: "group not found" });
      }
    }
    res.status(200).json(group.getGroupsData());
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const POST = (req, res, next) => {
  try {
    const { groupName, groupPrice } = req.body;

    if (!groupName || !groupPrice) {
      return res
        .status(400)
        .json({ message: "group_name or group_price is required" });
    }

    if (typeof groupPrice === "string") {
      return res.status(400).json({ message: "groupPrice typeof is string" });
    }

    const group = new Groups(groupName, groupPrice);
    group.addId();
    group.insertGroupData();
    res.status(201).json(group);
  } catch (error) {
    // return next(new AuthrizationError(400, error.message));
    res.status(500).end();
  }
};

module.exports = { GET, POST };
