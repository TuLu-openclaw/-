# 星枢OpenClaw 客户端平台矩阵

## 已自动构建

| 平台 | 产物 | Workflow | 说明 |
|---|---|---|---|
| Windows x64 | NSIS `.exe` | `release.yml` | 桌面客户端 |
| Windows ARM64 | NSIS `.exe` | `release.yml` | ARM Windows 客户端 |
| macOS Intel | `.dmg` | `release.yml` | 桌面客户端，未签名 |
| macOS Apple Silicon | `.dmg` | `release.yml` | 桌面客户端，未签名 |
| Linux x64 | `.AppImage` / `.deb` | `release.yml` | 桌面客户端 |
| Android 手机/平板 | `.apk` / `.aab` | `mobile-release.yml` | Tauri Android 客户端 |
| Android TV/电视盒子 | `.apk` / `.aab` | `mobile-release.yml` | 同 Android 构建，额外加入 Leanback/遥控器适配提示 |

## 需要额外签名或原生工程

| 平台 | 状态 | 原因 |
|---|---|---|
| iPhone / iPad | 准备中 | 需要 Apple Developer Team、证书、provisioning profile，并在 macOS 生成/维护 iOS 工程后输出签名 IPA/TestFlight |
| Apple TV | 准备中 | 需要 tvOS 原生工程、Apple 签名材料和遥控器交互适配 |
| 华为鸿蒙 Android 兼容设备 | 可使用 Android APK | 设备支持 Android 兼容层时可安装 APK |
| HarmonyOS NEXT 原生 | 需单独工程 | 需要 DevEco Studio / ArkTS / HAP 工程与华为签名，不是 Tauri 默认产物 |

## UI 适配标准

- 手机端：安全区、触控尺寸、竖屏/横屏、低动效、高对比模式。
- TV 端：方向键焦点、确认键、返回键、大屏网格、远距离可读字号、焦点高亮。
- 桌面端：企业级卡片层级、官方蓝主色、暗色模式、鼠标/键盘可访问性。

## 发布规则

- 正式构建使用 `v*` tag 触发。
- tag 版本必须与 `package.json`、`src-tauri/tauri.conf.json`、`src-tauri/Cargo.toml` 保持一致。
- 桌面产物由 `Release` workflow 输出。
- Android/Android TV 产物由 `Mobile and TV Client Release` workflow 输出。
