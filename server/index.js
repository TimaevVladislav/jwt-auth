const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const errorMiddleware = require("./middlewares/error.middleware")
const mongoose = require("mongoose")
require("dotenv").config()

const routes = require("./routes/index")
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookie())
app.use(cors())
app.use("/api", routes)
app.use(errorMiddleware)

const start = async () => {
    try {
      await mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true})

      app.listen(PORT, () => console.log(`Server started on Port ${PORT}`))
    } catch (e) {
      console.log(e)
    }
}

start()