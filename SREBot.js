const fs = require('fs')
const Bluebird = require('bluebird')
const fix_code = require('./fix_code'); // import fix_code.js
const ServerController = require('./ServerController'); // import ServerController

class SREBot {
    constructor(serverPath) {
        this.serverPath = serverPath;
        this.controller = new ServerController(this.serverPath);
    }

    async start() {
        // console.log("WTFFFFFF")
        // this.controller.startServer();
        // const error = await this.controller.nextError()
        // console.log("GOT ERROR", error.toString())

        while (true) {

            // Start the server
            this.controller.startServer();
            console.log('Started');

            const error = await this.controller.nextError()
            console.log("GOT ERROR", error.toString())

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
            console.log("REASON FOR CHANGE:", res.explanation)

            // Shutdown the server
            this.controller.shutdownServer();
            console.log('Stopped');

            // Wait for 5 seconds before starting the server again
            // await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

module.exports = SREBot;
