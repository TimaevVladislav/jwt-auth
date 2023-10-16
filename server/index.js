const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const mongoose = require("mongoose")
require("dotenv").config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookie())
app.use(cors())

const start = async () => {
    try {
      await mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true})

      app.listen(PORT, () => console.log(`Server started on Port ${PORT}`))
    } catch (e) {
      console.log(e)
    }
}
