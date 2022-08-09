const channelId = "1004497459814334594" // your channel id to log at
const {Client, GatewayIntentBits} = require("discord.js") // require discord.js
const express = require("express") // requires express
require("dotenv").config() // require dotenv and config it
const client = new Client({
    intents : [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
}) // create new client
const app = express() // creates an app for our api
app.get("/", (req, res) => {
    res.send("welcome to my site")
}) // whenever  you go to "yoursite/", it will return "welcome to my site"
app.post("/log/", (req, res) => { // whenever you do a "POST" request to yoursite/log/, this will fire
    if (req.headers.apikey === process.env.apikey){ // checks if api key is valid (for security)
        const logMessage = req.query.message // gets the message from the query
        if (logMessage){ // checks if the log message is valid
            client.channels.fetch(channelId) // fetches the channel
            .then(channel => { // if it did send the log and return "Sent log"
                channel.send(logMessage)
                res.send("Sent log")
            })
            .catch(err => { // if it errored it will return "ERROR : yourerror"
                res.send("ERROR : " + err)
            })
        } else {
            res.send("Invalid message")
        }
    } else {
        res.send("Invalid api key")
    }
})
app.listen(8080, () => {
    console.log("app ready")
}) // listens for the API

client.on("ready", () => {
    console.log("READY") // prints "READY"
    client.user.setActivity('logs.', {type:"WATCHING"}) // sets the activity to "Watching logs."
}) // the function passed to this function will fire when its "ready"
client.login(process.env.token) // login the discord bot