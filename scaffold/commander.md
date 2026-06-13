# commander

```js
const commander = require('commander');
const pkg = require('../package.json');

// Get the commander singleton
// const { program } = commander;

// Instantiate a Command instance
const program = new commander.Command();

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', 'Enable debug mode', false)
  .option('-e, --envName <envName>', 'Get environment variable name');

// command registration
const clone = program.command('clone <source> [destination]');
clone
  .description('clone a repository')
  .option('-f, --force', 'Force clone')
  .action((source, destination, cmdObj) => {
    console.log('do clone', source, destination, cmdObj.force);
  });

// addCommand for subcommands
const service = new commander.Command('service');
service
  .command('start [port]')
  .description('start service at some port')
  .action((port) => {
    console.log('do service start', port);
  });
service
  .command('stop')
  .description('stop service')
  .action(() => {
    console.log('stop service');
  });

program.addCommand(service);

// my-dev-cli install init -> my-cli init
// This usage allows Scaffold A to call Scaffold B commands
program
  .command('install [name]', 'install package', {
    executableFile: 'my-cli',
    // isDefault: true,
    hidden: true,
  })
  .alias('i');

// program
//   .arguments('<cmd> [options]')
//   .description('test command', {
//     cmd: 'command to run',
//     options: 'options for command',
//   })
//   .action(function(cmd, options) {
//     console.log(cmd, options);
//   });

// Advanced customization 1: Custom help message
// program.helpInformation = function() {
//   return '';
// };
// program.on('--help', function() {
//   console.log('your help information');
// });

// Advanced customization 2: Implement debug mode
program.on('option:debug', function() {
  if (program.opts().debug) {
    process.env.LOG_LEVEL = 'verbose';
  }
  console.log(process.env.LOG_LEVEL);
});

// Advanced customization 3: Listen for unknown commands
program.on('command:*', function(obj) {
  // console.log(obj);
  console.error('Unknown command: ' + obj[0]);
  const availableCommands = program.commands.map(cmd => cmd.name());
  // console.log(availableCommands);
  console.log('Available commands: ' + availableCommands.join(','));
});

program
  .parse(process.argv);
```
