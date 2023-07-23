const fs = require('fs')
const path = require('path')
const SREBot = require('./SREBot.js')

// Copy code to temporary location
const basepath = path.resolve(__dirname, "server2.js")
const spath = path.resolve(__dirname, "_live_server.js")
const code = fs.readFileSync(basepath)
fs.writeFileSync(spath, code)

const bot = new SREBot(spath)
bot.start()
