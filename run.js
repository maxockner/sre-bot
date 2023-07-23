const path = require('path')
const fs = require('fs')
const SREBot = require('./SREBot.js')

// Copy code to temporary location for the purpose of a repeatable demo.
const basepath = path.resolve(__dirname, "server.js")
const spath = path.resolve(__dirname, "_live_server.js")
const code = fs.readFileSync(basepath)
fs.writeFileSync(spath, code)

const bot = new SREBot(spath)
bot.start()
