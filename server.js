const express = require("express")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 5500

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to Note API"})
})

app.listen(port, () => console.log("Listening on port", port))