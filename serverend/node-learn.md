# Node.js Knowledge

## Enable ES Modules in Node

Supported in Node 14+, use `.mjs` as file extension.
For versions below 14, you need to add the command line argument `--experimental-modules`.

## Node Version Management Tools

### nvm

Installation on macOS
>GitHub URL: https://github.com/nvm-sh/nvm

Install nvm
```bash
# 1
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
# 2
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
Add the following content to one of your shell profile files,
choose any one of: `~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`
```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Usage
```bash
nvm ls # List locally installed Node versions
nvm ls-remote # List remote Node versions
nvm use 12.9.0 # Switch local Node version to 12.9.0
nvm install 14.15.1 # Install Node 14.15.1 locally
```

## Another Node Version Management Tool
> `n` is another Node version management tool, also very simple to use. Please refer to the official documentation: https://www.npmjs.com/package/n


