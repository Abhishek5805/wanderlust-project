const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/users", users);

//insert routes
app.get("/posts", (req, res) => {
    res.send("List of posts");
});

//show routes
app.get("/posts/:id", (req, res) => {
    res.send("Show a post");
});

//post routes
app.post("/posts", (req, res) => {
    res.send("Create a new post");
});

//update routes
app.put("/posts/:id", (req, res) => {
    res.send("Update a post");
});

//delete routes
app.delete("/posts/:id", (req, res) => {
    res.send("Delete a post ");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



