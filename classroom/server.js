const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get("/users", (req, res) => {
    res.send("List of users");
});

//show routes
app.get('"/users/:id', (req, res) => {
    res.send("get for users");
}   );



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



