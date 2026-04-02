const express = require('express');
const router = express.Router();
const users=require("./routes/user.js");
//insert routes
router.get("/", (req, res) => {
    res.send("List of users ");
});

//show routes
router.get("/:id", (req, res) => {
    res.send("Show a user");
});

//post routes
router.post("/", (req, res) => {
    res.send("Create a new user");
});

//update routes
router.put("/:id", (req, res) => {
    res.send("Update a user");
});

//delete routes
router.delete("/:id", (req, res) => {
    res.send("Delete a user");
});
