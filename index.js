const express = require("express");
const app = express();
const pool = require("./db");


app.use(express.json()) // can allow us to access client info => req.body

//Routes//

//get all plants

app.get("/plants", async (req,res) => {
    try{
        const allPlants = await pool.query("SELECT * FROM plantinfo");
        res.json(allPlants);
    } catch(err){
        console.error(err.message);
    }
});

//get a plant

app.get("/plants/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const plant = await pool.query("SELECT * FROM plantinfo WHERE plant_id = $1", [id] );
        res.json(plant);
    } catch(err){
        console.error(err.message);
    }
});

//create a plant

app.post("/plants", async (req, res) => {
    try {
        //destructure
        const {common_name, colors, geographical_area } = req.body;
        const newPlant = await pool.query(
            "INSERT INTO plantinfo (common_name, colors, geographical_area) VALUES ($1, $2, $3) RETURNING *",
            [common_name, colors, geographical_area]
            );
        res.json(newPlant);
    } catch(err){
        console.log(err.message)
    }
})

//update a plant

app.put("/plants/:id", async (req, res) => {
    try{
        const {id} = req.params; //WHERE
        const {common_name, colors, geographical_area} = req.body; //SET

        const updatePlants = await pool.query(
            "UPDATE plantinfo SET common_name = $1, colors = $2, geographical_area = $3 WHERE plant_id = $4",
            [common_name, colors, geographical_area, id]);
            res.json("plants has been updated");
    }catch (err){
        console.error(err.message);
    }
})

//delete a plant

app.delete("/plants/:id", async (req, res) => {
    try{
        const {id} = req.params;

        const deletePlants = await pool.query(
            "DELETE FROM plantinfo WHERE plant_id = $1", [id]
        );
        res.json("plant was successfully deleted")
    }catch (err){
        console.error(err.message);
    }
})


app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});