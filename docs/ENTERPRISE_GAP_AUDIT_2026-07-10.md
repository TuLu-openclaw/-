# 星枢影视企业版质量差距审计

日期：2026-07-10

## 当前结论

当前项目已经具备基础 Android/TV 构建和影视核心功能，但距离“企业版官方级”仍有明显差距。不能再用“构建成功”判断上线，必须按 `docs/ENTERPRISE_RELEASE_GATE.md` 逐项验收。

## 已完成的企业级补强

- Android/TV 可调用核心影视后端命令：`vod_fetch`、`missav_api_fetch`、`napp03_api_fetch` 已取消 Windows-only 注册限制。
- `vod_fetch` 对 MyAvLive / doppiocdn 请求补齐 `Front-Version`、`Origin`、`Referer`、`Accept-Language`。
- 正式 Tauri 客户端禁用公网 CORS 代理作为兜底，仅允许本地浏览器开发模式使用。
- 实时直播增加 API 失败后的 HTML 页面解析兜底，并显示真实失败链路。
- 手机端增加强制响应式补丁：防横向溢出、频道横滑、片库/直播网格自适应、播放器全屏安全区。
- 补齐 `@tauri-apps/plugin-dialog`、`@tauri-apps/plugin-autostart` 依赖，修复 dev 调试缺包。
- 新增 `npm run enterprise:smoke`，检查企业级基础禁止项。

## 已验证

- `npm run enterprise:smoke`：通过。
- `npm run build`：通过。
- `cargo fmt --manifest-path src-tauri/Cargo.toml --check`：通过。

## 本机验证阻塞

- 本机缺 `aarch64-linux-android` Rust target，无法直接执行 Android target `cargo check`。
- 本机缺 clang/MSVC 编译链，完整 Windows `cargo check` 被 `ring` build script 阻塞。
- Playwright 浏览器内核未安装，暂不能自动截图验手机/TV UI。
- 当前本地补丁未提交推送，远端 CI 不能验证本轮补丁。

## 主要企业级差距

### 1. 架构差距

- `src/pages/movie-tool.js` 超过 6000 行，混合了数据源、解析、UI、播放器、状态管理、移动端逻辑。
- `src/style/movie-tool.css` 超过 2600 行，移动/TV/桌面样式互相覆盖，维护风险高。
- 缺少清晰的 Site Adapter 层，资源站接入仍有大量散落函数。

### 2. 后端差距

- 影视请求虽然已有 Rust 后端，但缺少统一 typed API、统一错误分类和统一日志结构。
- Android/TV 编译验证还依赖 CI，缺少本地可重复 Android check 环境。
- 部分播放器链路仍引用 `127.0.0.1:18188/hls-proxy`，移动/TV 端必须确认是否内置可用，否则要改为 Tauri 自有代理或禁用。

### 3. 前端体验差距

- 手机/TV 适配目前是补丁式兜底，仍需拆成正式设计系统和组件。
- 缺少自动截图回归，无法稳定证明“没有横向溢出/按钮可点/播放器可用”。
- 错误态虽有改进，但仍需统一错误组件和重试策略。

### 4. 发布差距

- CI 构建成功后需要自动保存日志、产物路径、Release 链接。
- 缺少“提交后自动跑企业 smoke + 前端 build + Android build”的统一发布门禁。
- 缺少真机/TV 验收记录模板。

## 下一阶段必须做

1. 拆 `movie-tool.js`：优先抽出 `network`、`adapters`、`player`、`mobile-tv` 四层。
2. 建立资源站 Adapter 标准：每个源必须实现列表、搜索、详情、播放、分页、错误分类。
3. 建立统一错误组件：展示源、接口、阶段、原因、重试按钮、日志代码。
4. 替换移动端不可用的 `127.0.0.1:18188` 播放代理链路。
5. 增加 CI 门禁：`npm run enterprise:smoke` + `npm run build` + Android build。
6. 安装 Playwright 浏览器并加入手机/TV 视口截图测试。
7. 提交推送本轮修复，重新跑 Android Phone/TV CI，下载新 APK/AAB 和日志。

## 上线判断

当前状态：**不能标记正式企业版上线**。

原因：本地已通过基础门槛，但本轮补丁尚未经过提交后的 Android CI 和真机/TV 验收。
