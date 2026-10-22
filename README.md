# Magpie Desktop Design Provider

将 [Magpie](https://github.com/yetone/magpie) 的桌面 UI、菜单栏和快捷浮层设计整理成可复用的 Codex Skill。兼容 [product-ui](https://github.com/zengerai/product-ui) 的 **Design Provider Protocol v1**，也可独立使用。

当前版本：**1.0.0**。这是独立的设计技能，不隶属于 Magpie 项目，不包含其网关或账户管理功能。

## 包含什么

- 紧凑主窗口、窄侧栏、分组行与行内选择器。
- 浅深主题、字体、尺寸、状态色与动效参数。
- macOS 菜单栏数字、440px 快捷浮层、窗口底部状态反馈规范。
- 有命名空间的 CSS、JSON tokens、使用虚构数据的可交互 HTML 样板。
- Provider 的 `style-candidate`、`spec`、`implement`、`style-audit` 四种模式。

## 安装

将仓库克隆到 Codex 的技能目录；目标目录已存在时先检查原有文件，避免覆盖本地修改：

```sh
git clone https://github.com/zengerai/magpie-desktop-style.git "${CODEX_HOME:-$HOME/.codex}/skills/magpie-desktop-style"
```

已通过 Git 安装的副本可在工作区干净时运行 `git pull --ff-only` 更新。直接复制安装的旧版本不会自动变成 Git checkout。

## 配合 product-ui

确保两个原始技能都已安装，向 Codex 说明：

> 用 $product-ui 设计这个桌面工具，视觉 Provider 选择 $magpie-desktop-style，覆盖主窗口、菜单栏浮层和状态反馈。

已有项目也可以只审查：

> 用 $product-ui 调用 $magpie-desktop-style 的 style-audit，只读检查设置页的风格符合度，不修改文件。

product-ui 负责产品任务、IA、流程、审批、DESIGN.md 和整体 QA；本 Provider 负责视觉规范与获授权的视觉实现。三个只读模式不修改项目文件，`implement` 只编辑交接授权范围。选择 Provider 不会自动更换框架、安装依赖或重设计现有产品。

**不需要在 product-ui 仓库中注册名称。** 它从已安装的原始技能、当前用户选择或项目 DESIGN.md 发现 Provider。`design-provider.json` 是可选元数据，不是运行时插件或执行记录。

详见 [Provider 协议](references/provider-protocol.md)。适配时核对的版本为 product-ui v3.7 / Protocol v1。

## 独立使用与预览

> 用 $magpie-desktop-style 优化这个工具的设置列表，保留业务逻辑和现有技术栈。

直接打开 [assets/preview.html](assets/preview.html)，或在仓库目录启动本地服务：

```sh
python3 -m http.server 8764 --bind 127.0.0.1 --directory assets
```

然后在浏览器访问 `http://127.0.0.1:8764/preview.html`。可切换主题、展开行、搜索选择、键盘操作以及查看状态反馈。样板离线运行，不接业务 API。

| 目标栈 | 支持等级 |
|---|---|
| 原生 HTML/CSS/JS | 直接使用 assets；manifest 中的 native 指 Web 资产直接可用 |
| React / Vue | adapted：迁移样式至现有组件，不附带框架组件库 |
| Electron / Tauri | adapted：提供 WebView 视觉，原生窗口/托盘需实现 |
| SwiftUI/AppKit、WinUI、Qt | guidance：规范与参数，不提供已测试的宿主代码 |

Web 样板不等于系统菜单栏集成。原生行为规范来自固定源码快照，未宣称已对所有平台进行运行验证。

## 文件入口

- [SKILL.md](SKILL.md)：技能入口与工作边界。
- [design-provider.json](design-provider.json)：Provider 元数据。
- [设计规范](references/design-spec.md)：颜色、尺寸、组件和动效。
- [状态表面](references/status-surfaces.md)：系统栏、快捷浮层、窗口内状态。
- [来源与验证范围](references/source-map.md)：固定提交、观测与推断边界。
- [assets/tokens.json](assets/tokens.json)、[assets/magpie.css](assets/magpie.css)：可复用实现素材。

## 来源与许可

视觉基线来自 Magpie 的 [318697d](https://github.com/yetone/magpie/tree/318697dcea4ebd7514606a298a56fba9773d893d) 快照，提取日期为 2026-10-20；不会自动跟随 Magpie 最新版本。

本仓库采用 [MIT License](LICENSE)。上游提取与改写部分保留 [Magpie 的 MIT 声明](assets/LICENSE.magpie.txt)。第三方名称/标识归各自所有者；新产品应使用自己的品牌。
