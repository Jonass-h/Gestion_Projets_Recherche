// CRUD functionality.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Brings in the User and Contact models, so that they can be used in the routes.
const User = require("../models/User");
const Project = require("../models/Project");

// GET route with "api/contacts" endpoint to get all of the user's contacts. Private access.
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST route with "api/contacts" endpoint to add a new contact. Private access.
router.post(
  "/",
  [auth, [check("name", "Name is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, details, type } = req.body;

    try {
      const newProject = new Project({
        name,
        details,
        type,
        user: req.user.id,
      });

      const project = await newProject.save();

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// PUT route with "api/contacts/:id" endpoint to update contact. Private access.
router.put("/:id", auth, async (req, res) => {
  const { name, details, type } = req.body;

  // Checks to see if the fields are submitted by initializing an object and then adds to the contact fields.
  const contactFields = {};
  if (name) contactFields.name = name;
  if (details) contactFields.details = details;
  if (type) contactFields.type = type;

  try {
    let project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: "project not found." });

    // Verifies that logged in user is the owner of contact.
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not authorized." });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE route with "api/contacts/:id" endpoint to update contact. Private access.
router.delete("/:id", auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: "project not found." });

    // Verifies that logged in user is the owner of contact.
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not authorized." });
    }

    await Project.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact has been removed." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
