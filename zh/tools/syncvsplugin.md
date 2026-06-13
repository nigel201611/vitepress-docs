# syncvsplugin 插件
>自研 VS Code 插件
## 主要功能
* 团队 vscode 插件版本的同步、一键安装插件列表
* 支持工作目录下自定插件列表（syncvsplugin.config.json）

默认插件列表（json）

```javascript
{
  "esbenp.prettier-vscode": "9.3.0"  // key 代表 VS Code 插件唯一标识(插件右下角信息查看到)，valu代表当前安装的版本号
  "vscode-icons-team.vscode-icons": "11.10.0",
  "qinjia.view-in-browser": "0.0.5",
  "eamodio.gitlens": "12.0.5",
  "formulahendry.auto-close-tag": "0.5.14",
  "formulahendry.auto-rename-tag": "0.1.10"
}
```

## 使用插件

运行命令(shift+command+p）
* 同步插件命令 
```bash
syncPlugins
```
* 删除插件命令
```bash
removeAllPlugins # 根据用户配置和默认插件列表，删除所有插件

```

* 根据需要，配置 showSuccTips = false，静默安装插件 
   ```javascript
  {
    "showSuccTips": false,
    "esbenp.prettier-vscode": "9.3.0"  // key 代表 VS Code 插件唯一标识(插件右下角信息查看到)，valu代表当前安装的版本号
    "vscode-icons-team.vscode-icons": "11.10.0",
    "qinjia.view-in-browser": "0.0.5",
    "eamodio.gitlens": "12.0.5",
    "formulahendry.auto-close-tag": "0.5.14",
    "formulahendry.auto-rename-tag": "0.1.10"
  }
  ```





