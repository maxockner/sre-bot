const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const fs = require('fs')
const Bluebird = require('bluebird')
const fix_code = require('./fix_code'); // import fix_code.js
const ServerController = require('./ServerController'); // import ServerController
const wtf = require('./WTFBot.js')

const incidents = {}

class SREBot {
    constructor(serverPath) {
        this.serverPath = serverPath;
        this.controller = new ServerController(this.serverPath);
    }

    // async receive_event(){

    // }
    async start() {

        while (true) {

            // Start the server
            this.controller.startServer();
            console.log('SREBot: Started server');

            const error = await this.controller.nextError()
            console.log("SREBot received error:", error.toString())
            console.log("WTFBot:", wtf.get_random_phrase())

            // Wait 500ms so we don't shut down the server before the request completes.
            // lol :)
            await Bluebird.delay(500)

            // Yes, this is dumb. We can't expect all of the code to live in one file.
            // TODO: We should deduce the correct file path from the stack trace.
            const code_str = fs.readFileSync(this.serverPath).toString()
            // console.log(code_str)

            //
            const res = await fix_code(code_str, error)
            fs.writeFileSync(this.serverPath, res.new_code)
            console.log("SREBot:", res.explanation)

            // Shutdown the server
            this.controller.shutdownServer();
            console.log('SREBot: Stopped server');

            // Wait for 5 seconds before starting the server again
            // await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

module.exports = SREBot;
