# inquirer Command Line Interaction Principles

## ANSI-escape-code
>ANSI-escape-code reference: https://handwiki.org/wiki/ANSI_escape_code
```js
// ANSI-escape-code escape sequences
console.log('\x1B[41m\x1B[4m%s\x1B[0m', 'your name:');
console.log('\x1B[2B%s', 'your name2:');
```
## readline Usage

```js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('your name: ', (answer => {
  console.log(answer);
  rl.close();
}));

```
## readline Principles
Listening to keyboard events
```js
emitKeypressEvents(input, this);
// `input` usually refers to stdin
input.on('keypress', onkeypress);
input.on('end', ontermend);
```
### readline Core Implementation Flowchart
<br/>
<img src="/images/readlineYM.jpg" alt="readline core implementation principles">

>readline leverages Generator function features (https://es6.ruanyifeng.com/#docs/generator)

## Manual Implementation of inquirer List
```js
const EventEmitter = require('events');
const readline = require('readline');
const MuteStream = require('mute-stream');
const { fromEvent } = require('rxjs');
const ansiEscapes = require('ansi-escapes');

const option = {
  type: 'list',
  name: 'name',
  message: 'select your name:',
  choices: [{
    name: 'sam', value: 'sam',
  }, {
    name: 'shuangyue', value: 'sy',
  }, {
    name: 'zhangxuan', value: 'zx',
  }],
};

function Prompt(option) {
  return new Promise((resolve, reject) => {
    try {
      const list = new List(option);
      list.render();
      list.on('exit', function(answers) {
        resolve(answers);
      })
    } catch (e) {
      reject(e);
    }
  });
}

class List extends EventEmitter {
  constructor(option) {
    super();
    this.name = option.name;
    this.message = option.message;
    this.choices = option.choices;
    this.input = process.stdin;
    const ms = new MuteStream();
    ms.pipe(process.stdout);
    this.output = ms;
    this.rl = readline.createInterface({
      input: this.input,
      output: this.output,
    });
    this.selected = 0;
    this.height = 0;
    this.keypress = fromEvent(this.rl.input, 'keypress')
      .forEach(this.onkeypress);
    this.haveSelected = false;
  }

  onkeypress = (keymap) => {
    const key = keymap[1];
    if (key.name === 'down') {
      this.selected++;
      if (this.selected > this.choices.length - 1) {
        this.selected = 0;
      }
      this.render();
    } else if (key.name === 'up') {
      this.selected--;
      if (this.selected < 0) {
        this.selected = this.choices.length - 1;
      }
      this.render();
    } else if (key.name === 'return') {
      this.haveSelected = true;
      this.render();
      this.close();
      this.emit('exit', this.choices[this.selected]);
    }
  };

  render() {
    this.output.unmute();
    this.clean();
    this.output.write(this.getContent());
    this.output.mute();
  }

  getContent = () => {
    if (!this.haveSelected) {
      let title = '\x1B[32m?\x1B[39m \x1B[1m' + this.message + '\x1B[22m\x1B[0m \x1B[0m\x1B[2m(Use arrow keys)\x1B[22m\n';
      this.choices.forEach((choice, index) => {
        if (index === this.selected) {
          if (index === this.choices.length - 1) {
            title += '\x1B[36m❯ ' + choice.name + '\x1B[39m ';
          } else {
            title += '\x1B[36m❯ ' + choice.name + '\x1B[39m \n';
          }
        } else {
          if (index === this.choices.length - 1) {
            title += '  ' + choice.name;
          } else {
            title += '  ' + choice.name + '\n';
          }
        }
      });
      this.height = this.choices.length + 1;
      return title;
    } else {
      const name = this.choices[this.selected].name;
      let title = '\x1B[32m?\x1B[39m \x1B[1m' + this.message + '\x1B[22m\x1B[0m \x1B[36m' + name + '\x1B[39m\x1B[0m \n';
      return title;
    }
  };

  clean() {
    const emptyLines = ansiEscapes.eraseLines(this.height);
    this.output.write(emptyLines);
  }

  close() {
    this.output.unmute();
    this.rl.output.end();
    this.rl.pause();
    this.rl.close();
  }
}

Prompt(option).then(answers => {
  console.log('answers:', answers);
});
```

