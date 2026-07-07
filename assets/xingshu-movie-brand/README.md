# 星枢屠戮影视 Logo / 图标设计规范

## 产品定位

星枢屠戮影视是独立影视客户端产品，目标覆盖：

- Android 手机 / 平板
- Android TV / 电视盒子
- 华为 Android 兼容设备
- HarmonyOS NEXT 原生方向
- iPhone / iPad / Apple TV
- Windows / macOS / Linux 桌面端

## 设计概念

- **星枢**：用环绕星轨表达“聚合、多源、智能调度”。
- **影视**：用播放三角表达视频播放与内容消费。
- **客户端**：圆角矩形图标符合移动端、TV 端、桌面端应用入口规范。
- **企业级官方风格**：深空蓝、官方蓝、银白高光，强调可信、专业、科技感。

## 主色

| Token | Color | 用途 |
|---|---|---|
| Deep Space | `#050B18` | 深色背景 / TV 大屏背景 |
| Official Blue | `#0A59F7` | 主品牌色 / 焦点色 |
| Ice White | `#F8FBFF` | Logo 高光 / 文字 |
| Cyan Beam | `#62DBFF` | 星轨辅助高光 |
| Muted Slate | `#8FA8CC` | 英文副标题 / 次级文字 |

## 资产清单

| 文件 | 用途 |
|---|---|
| `xingshu-movie-app-icon.svg` | 手机/桌面 App 图标母版，适合导出 1024/512/256/128/64/32 PNG |
| `xingshu-movie-logo-horizontal.svg` | 官网、启动页、关于页、应用内品牌头图 |
| `xingshu-movie-tv-banner.svg` | TV 端启动页、Android TV banner、横屏海报入口 |

## 平台建议

- Android adaptive icon：以前景播放键 + 星轨为 foreground，深空蓝渐变为 background。
- Android TV：使用 `xingshu-movie-tv-banner.svg` 导出 1280x720 或 320x180。
- iOS：使用 `xingshu-movie-app-icon.svg` 导出 1024x1024，无透明背景。
- HarmonyOS：使用同一母版导出 1024x1024，后续 DevEco 工程按 HAP 图标规范切图。
- 桌面端：使用母版生成 `.ico`、`.icns`、PNG 多尺寸。

## 禁止事项

- 不要直接复用主项目 OpenClaw 图标，避免与主项目混淆。
- 不要把影视客户端 release/tag 与主项目 release/tag 混用。
- 不要在小尺寸图标中加入复杂文字，小尺寸只保留星轨 + 播放键。
