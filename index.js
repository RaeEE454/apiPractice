const express = require("express");
const app = express();
const pool = require("./db");


app.use(express.json()) // can allow us to access client info => req.body

//Routes//

//get all plants

//get a plant

//create a plant

app.post("/plants", async (req, res) => {
    try {
        //destructure
        const {common_name } = req.body;
        const newCommonName = await pool.query(
            "INSERT INTO plantinfo (common_name) VALUES ($1) RETURNING *",
            [common_name]
            );
        res.json(newCommonName);
    } catch(err){
        console.log(err.message)
    }
})

//update a plant

//delete a plant

app.listen(5000, () => {
    console.log("Server is listetning on port 5000");
});