const db = require('./db')
const express = require('express')
const cors = require("cors")

db();
const app = express()
const port = 5000

app.use(express.json())
app.use(cors({
 origin: 'http://localhost:3000/NoteMe'
}))

app.use("/api/auth", require("./routes/users"))
app.use("/api/notes", require("./routes/notes"))
app.get("/", (req, res)=>{
  res.send("Welcome")
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})