# 来源、版本与证据边界

- 原作：[yetone/magpie](https://github.com/yetone/magpie)，MIT，Copyright (c) 2026 yetone。
- 提取时间：2026-10-20（Asia/Shanghai）。
- 固定源码：[318697dcea4ebd7514606a298a56fba9773d893d](https://github.com/yetone/magpie/tree/318697dcea4ebd7514606a298a56fba9773d893d)，提交时间 2026-10-20 12:32:05 UTC。
- 本机 `/Applications/magpie.app`：Info.plist 为 **0.1.1296**，bundle id `com.yetone.magpie`，不证明与上述 main 提交字节一致。
- 实际观察主窗口“会话”和“Agent”页：浅色、分组侧栏、白色选中行、分组列表、右侧选择器/开关、底部网关状态。侧栏已保存宽度为 176。未修改模型、供应商、网关或主题设置。
- 未实际打开本机系统菜单栏浮层；菜单栏数字、浮层几何与关闭行为依据源码，未宣称本机运行验证。系统栏辅助进程未能读取。

## 按问题查源

链接固定到快照，与选择器/函数共同定位。

| 结论 / 用途 | 源码与定位 |
|---|---|
| 主题、字体、容器 | [app.css](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/internal/gui/assets/app.css)，`:root`、`body.panel`、`.list` |
| 侧栏及主窗口 | 同文件 `.sidebar`、`.nav-gl`、`.side-foot`、`.side-gw`、`.crumb`、`.view` |
| 可拖侧栏边界 | [app.js](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/internal/gui/assets/app.js)，`SIDE_MIN`、`SIDE_MAX`、`sideFit` |
| 控件对齐 | app.css `.fields`、`.field`、`body.window .row` |
| 当前浮层摘要/展开 | app.css `.ptabs`、`body.panel .row.agent`、`.ag-sum`、`.ag-open`、`.ag-body` |
| 面板内容与底部结构 | [index.html](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/internal/gui/assets/index.html)，`#ptabs`、`#panelQuota`、footer；app.js `setPanelTab` |
| 配额圆环/微图 | app.css `.pq-card`、`.pq-dial`、`.pq-spark` |
| 状态反馈、选择器、动效 | app.css `.foot`、`.status`、`.pop`、`--ease`、`prefers-reduced-motion` |
| 窗口/面板尺寸 | [textsize.go](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/internal/gui/textsize.go)，`panelWidth`、`panelFrame`、`windowMin` |
| 原生面板配置/定位 | [app.go](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/internal/gui/app.go)，`panelOptions`、`PositionWindow` |
| 关闭主窗口后驻留 | [lightweight.go](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/internal/gui/lightweight.go)，`makeMain`、`WindowClosing` |
| macOS 状态项绘制 | [trayimage_darwin.go](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/internal/gui/trayimage_darwin.go)，`mpLogo`、`mpRowFont`、`mpRows`、`mpMasked` |
| 状态项数据与点击 | [trayusage_tray.go](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/internal/gui/trayusage_tray.go)，`watchTrayUsage`、`trayCellClick` |
| 右键菜单 | [traymenu.go](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/internal/gui/traymenu.go)，`trayMenuLabels` |

## 公开图片对照

- [主窗口浅色](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/site/public/img/agents-light.png)
- [主窗口深色](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/site/public/img/agents-dark.png)
- [旧版面板浅色](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/site/public/img/panel-light.png)
- [选择器](https://github.com/yetone/magpie/blob/318697dcea4ebd7514606a298a56fba9773d893d/site/public/img/picker-light.png)

已查看 `panel-light.png`：880px 物理宽，表现的是两倍尺度的 440px 面板，仍为直接并排选择器。当前 CSS 在后续规则覆盖为 36px 摘要行 + 原位展开，不能只看 CSS 前段或宣传图复刻当前面板。

不打包用户的真实会话名、路径、账户资料或私人界面截图。预览使用虚构数据、普通线图标和独立产品名。

## 文件性质与许可

- `assets/tokens.json`：颜色从上述 CSS 精确抽取，几何来自对应规则，附来源和单位。
- `assets/magpie.css`：有命名空间的裁剪/改写，不是完整上游 CSS；响应式适配不代表原作逐像素实现。
- `assets/preview.html` / `preview.js`：新编写的视觉与交互样板，不接 Magpie API、不操作本机业务。
- 业务迁移、无障碍补强与样板响应式布局属于建议，不冒充原作功能。
- [MIT 许可副本](../assets/LICENSE.magpie.txt) 随提取和改写样式保留。分发派生素材时保留原作者声明；第三方品牌不能自动作为新产品标识。

更新时固定新提交并复核最终 CSS 覆盖。没有实际观察过的宿主行为保持“源码依据”标记。

## 初始视觉样板校验（2026-10-20）

skill-creator 的 `quick_validate.py` 已通过；本地引用均存在，JSON 可解析，JavaScript 语法通过。Web 样板在 1320px 与 560px 视口无页面横向溢出，面板实测宽 440px，展开后高度随内容增长。已检查浅深主题、搜索筛选、方向键 + Enter 选择、Esc 关闭并回归触发器、标签方向键切换及主窗口/面板数值同步；浏览器未记录控制台错误。未做真实原生托盘集成测试。

## Provider 适配（2026-10-22）

Provider 版本 1.0.0，兼容 product-ui v3.7 的 Design Provider Protocol v1。新增工作模式、职责/权限边界、书面输入输出与框架支持元数据；视觉资产与原有业务样板未改动。接口与验收规则见 [provider-protocol.md](provider-protocol.md)。原有浏览器检查记录属于 2026-10-20 的视觉样板验证，不代表本次已运行真实产品中的端到端 Provider 集成。

本次通过 product-ui 原始 `validate_provider_manifest.py` 与 skill-creator 原始 `quick_validate.py`；检查了技能 ID/manifest 一致性、版本、全部本地文档链接、JSON、JavaScript 语法及发布文件中的绝对个人路径。已逐文件确认 assets 与初始验收版本一致。
