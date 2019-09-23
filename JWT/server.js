const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
require("dotenv").config()

const posts = [
  {
    username: "gaowujian",
    title: "post 1"
  },
  {
    username: "tony",
    title: "title 2"
  }
]

app.get("/", (req, res) => {
  res.json(posts)
})

app.post("/login", (req, res) => {
  const { username } = req.body
  const user = { "name": username }
  const acccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ acccessToken })
})

app.get("/posts", authenticateToken, (req, res) => {
  console.log(req.user)
  res.json(posts.filter(post => post.username == req.user.name))
})

function authenticateToken(req, res, next) {
  const authHeather = req.headers["authorization"]
  const token = authHeather && authHeather.split(" ")[1]
  if (!token) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
    if (err) return res.sendStatus(403)
    req.user = decoded
    next()
  })
}

app.listen(3000, err => {
  console.log("server is running on 3000")
})
