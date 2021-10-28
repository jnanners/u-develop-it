const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware (if extended: true you can post nested objects)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/api", apiRoutes);

//Default response for any other request (Not Found). MUST BE THE LAST ROUTE
app.use((req, res) => {
    res.status(404).end();
})

//start server after DB connection
db.connect(err => {
    if(err) throw err;
    console.log("Database connected.");
    app.listen(PORT, () => {
        console.log(`Sever running on port ${PORT}`);
    });
});