const { spawn } = require('child_process');
const { resolve } = require('path');

const serverPath = resolve(__dirname + '../');
const process_spawn = (command, stdout, close) => {
  const value = spawn(command, { cwd: serverPath, shell: true });
  close && value.on('close', close);
  value.on('stdout', stdout);
  return value;
};

module.exports = class WebServer {
  state;
  processPid;

  constructor () {
    this.state = false;
    this.processPid = null;
  }

  start () {
    if (this.processPid) this.quit();
    this.processPid = process_spawn('npm run dev', (data) => {
      this.state = true;
    }, () => {
      this.processPid = null;
      this.state = false;
    });
    console.log(this.processPid.pid);
  };

  quit () {
    if (this.processPid) process_spawn(`taskkill -t -f /pid ${this.processPid.pid}`, () => {
      this.processPid = null;
      this.state = false;
    });
  };
};
