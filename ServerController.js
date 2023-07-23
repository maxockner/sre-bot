const { spawn } = require('child_process');
const path = require('path')

class ServerController {
    constructor(serverPath) {
        this.serverPath = serverPath;
        this.serverProcess = null;
    }

    startServer() {
        if (this.serverProcess === null) {
            this.serverProcess = spawn('node', [this.serverPath]);

            this.serverProcess.stdout.on('data', (data) => {
                console.log(`STDOUT: ${data}`);
            });

            // this.serverProcess.stderr.on('data', (data) => {
            //     console.log(`MSG FROM STDERR: ${data}`);
            // });

            this.serverProcess.on('close', (code) => {
                console.log(`Server process exited with code ${code}`);
                this.serverProcess = null;
            });

            console.log(`Server started with PID: ${this.serverProcess.pid}`);
        } else {
            console.log('Server is already running.');
        }
    }

    shutdownServer() {
        if (this.serverProcess !== null) {
            this.serverProcess.kill('SIGTERM');
            console.log('Server shutdown signal sent.');
        } else {
            console.log('No server process to shutdown.');
        }
    }

    nextError() {
        // simplest implementation - don't bother saving a buncha things
        return new Promise((resolve, reject) => {
            this.serverProcess.stderr.on('data', resolve)
            this.serverProcess.on('close', (code) => {
                // need to tell gpt4 not to look for errors in code in this case - just restart?
                resolve("server crashed! Maybe we should restart it?")
            });
        })
        
    }
}

module.exports = ServerController;



