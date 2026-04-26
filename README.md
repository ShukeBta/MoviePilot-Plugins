# ShukeBta MoviePilot 插件仓库

个人 MoviePilot 插件集合，只需添加这一个源即可使用所有插件。

## 📦 插件列表

### SeedKeeper - 做种助手
智能管理 MoviePilot 转移后的种子做种任务。

**功能：**
- 🌱 智能做种 - 自动监听下载完成事件
- 📊 做种策略 - 支持按分享率/按做种时间/手动管理
- 🔧 配置灵活 - 支持 qBittorrent / Transmission

---

### Shuk-光鸭云盘
将光鸭云盘挂载为 MoviePilot / Emby 存储介质。

**功能：**
- 🔐 扫码登录 - OAuth2 安全授权
- 📂 文件管理 - 上传 ~~浏览、下载、删除、重命名~~
- 💾 存储挂载 - 作为 MoviePilot 外部存储
- ~~🌐 WebDAV 服务 - Emby/Jellyfin 直连播放~~
- ~~🎬 流式播放 - 无需下载到本地~~

---

## 🔧 快速安装

1. 进入 MoviePilot 后台 → **设置** → **插件市场**
2. 点击「添加源」，输入：
   ```
   https://github.com/ShukeBta/MoviePilot-Plugins
   ```
3. 点击**刷新**，即可看到所有插件
4. 安装即可使用

## 📚 开发说明

### 添加新插件

1. 将插件放入 `plugins.v2/<plugin_id>/` 目录
2. 在 `package.v2.json` 中添加插件索引
3. 提交并推送

### 目录结构

```
MoviePilot-Plugins/
├── package.v2.json           # 插件索引
├── plugins.v2/
│   ├── seedkeeper/          # 做种助手
│   └── shukguangyadisk/     # 光鸭云盘
└── README.md
```

## 📄 License

MIT License
