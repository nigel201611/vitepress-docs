# syncvsplugin Plugin
> Self-developed VS Code Plugin
## Main Features
* Team VS Code plugin version synchronization, one-click install plugin list
* Support custom plugin list in the working directory (syncvsplugin.config.json)

Default plugin list (json)

```javascript
{
  "esbenp.prettier-vscode": "9.3.0"  // key represents the VS Code plugin unique identifier (can be found in the plugin's bottom-right info), value represents the currently installed version
  "vscode-icons-team.vscode-icons": "11.10.0",
  "qinjia.view-in-browser": "0.0.5",
  "eamodio.gitlens": "12.0.5",
  "formulahendry.auto-close-tag": "0.5.14",
  "formulahendry.auto-rename-tag": "0.1.10"
}
```

## Using the Plugin

Run command (shift+command+p)
* Sync plugin command
```bash
syncPlugins
```
* Delete plugin command
```bash
removeAllPlugins # Remove all plugins based on user configuration and default plugin list

```

* Optionally, configure showSuccTips = false to silently install plugins
   ```javascript
  {
    "showSuccTips": false,
    "esbenp.prettier-vscode": "9.3.0"  // key represents the VS Code plugin unique identifier (can be found in the plugin's bottom-right info), value represents the currently installed version
    "vscode-icons-team.vscode-icons": "11.10.0",
    "qinjia.view-in-browser": "0.0.5",
    "eamodio.gitlens": "12.0.5",
    "formulahendry.auto-close-tag": "0.5.14",
    "formulahendry.auto-rename-tag": "0.1.10"
  }
  ```
