# product-ui Design Provider Protocol v1 — Magpie adapter

本文件定义 `magpie-desktop-style` 如何参与 product-ui 的书面交接。权威协议为独立的 [product-ui / Design Provider Protocol v1](https://github.com/zengerai/product-ui/blob/02cdb1f14a59cd01d482648c31dda96be229fd86/references/design-provider-protocol.md)。2026-10-22 已读取本地 product-ui v3.7 的协议、路由、架构与验收规则。若未来协议版本不同，先核对差异，不自行宣称兼容所有未来版本。

## 发现与职责

`SKILL.md.name` 与 `design-provider.json.provider_id` 均为 `magpie-desktop-style`；发布版本从 `VERSION` 读取，协议版本固定为 `1.0`。product-ui 必须读取实际安装的原始 SKILL.md 和本文件，再检查表面与框架支持。GitHub 链接和 manifest 都不是安装或调用证据。

本技能不需要注册到硬编码 Provider 清单。product-ui 通过已安装技能、用户明确选择和已接受的 DESIGN.md 发现它。一个项目仍只有一个由 product-ui 管理的已接受 DESIGN.md；Provider 返回建议片段，不自行建立另一份设计真相。

顺序：当前明确用户要求和产品/权限/API 事实 → 已接受 DESIGN.md（授权重设计除外）→ product-ui 的任务、IA、密度和无障碍约束 → Magpie 风格建议 → 上游默认参数。

具体页面及导航由 product-ui 给出。Magpie 的窄侧栏、行高和 440px 面板是视觉基线，不是改变业务结构或忽略文本放大的理由。主窗口中的列表式内容可采用该密度；需要更多字段或触屏操作时，说明适配的尺寸，而非强行压缩。

## 四种模式

| mode | 项目文件更改 | 处理方法 |
|---|---|---|
| `style-candidate` | 无 | 接收相同任务、内容和区域，返回可比较的 Magpie 候选；不自选获胜、不创建新页面或预览文件 |
| `spec` | 无 | 已选风格下给出 token、主题、组件与状态映射、动效契约、可用性修正；代码片段仅作为建议 |
| `implement` | 仅显式获授权路径 | 在 product-ui 已允许实现的阶段，把方案落入现有组件；不改业务/API、审批或技术栈 |
| `style-audit` | 无 | 对请求范围给出证据、偏差、严重度和建议；不边审边修，不等同于整体 UX 或外部技能审计 |

这三种只读模式连“把报告保存到项目”也不执行。若已有外部授权包含保存产物，由 product-ui 明确切换到合适的写入交接；不重复要求用户确认已有授权。未知 mode、冲突的写权限或缺失重要上下文，返回问题及可继续的只读分析，不推定可写。

不自行调用 Hallmark、Impeccable、UI UX Pro Max、shadcn agent Skill；不重复 product-ui 的规划、审批或 A/B/C。缺少第三方库不会自动安装，推荐依赖也不产生安装授权。

## 输入交接

以下为只读规范的可用示例；它不是已执行的项目记录：

```yaml
contract_version: "1.0"
request_id: "sync-tool-magpie-spec"
provider_id: magpie-desktop-style
mode: spec
project_route: NEW_BUILD
visual_intent:
  family: magpie-desktop
  source: "用户明确选择 Magpie 风格"
product_job:
  primary_user: "管理多个同步源的桌面用户"
  primary_task: "查看状态并快速调整某个同步源的模式"
  frequency: "每日多次"
  density: "紧凑，重要名称完整可辨认"
surface_blueprint:
  page_type: "设置列表与快捷面板"
  regions: ["已确认的导航", "同步源列表", "持久状态", "动作反馈"]
  states: ["空", "加载中", "正常", "失败", "过期数据"]
  navigation: "已确认的页面与标签，不新增导航层级"
  data_contracts: "保留现有同步 API；样板使用演示数据"
environment:
  framework: react
  existing_component_library: "项目现有 primitives"
  targets: [desktop-webview, menubar-popover]
  constraints: ["不迁移框架", "不安装新依赖"]
design_source: "已批准的布局方案；视觉方向来自当前用户要求"
change_scope: read-only
deliverable: ["visual-spec", "component-mapping", "motion-contract"]
constraints:
  preserve_business_and_API_contracts: true
  accessibility: ["键盘可用", "长中文名称", "文本缩放", "reduced-motion"]
  permissions: "没有项目文件写权限"
```

输入应包括协议/id/mode、四种项目路线之一、视觉依据、产品任务、已确认结构及状态、环境、设计来源、变更范围、产物和约束。可从现有交接上下文获取，未知项明确标记。影响写入、业务含义或框架兼容的缺失信息需返回 product-ui 解决。

`implement` 的 `change_scope` 应明确列出可编辑文件/表面和排除项，而不是只给仓库路径。`style-audit` 即使发现很明显的问题也不自动升级为实现。

## 返回交接

返回与以下结构等价的书面结果；填入当前版本和真实结果，不把示例状态当作事实：

- `provider_id`、`provider_version`（读取 VERSION）、`contract_version`、`mode`。
- `status`：`executed` / `skipped-not-needed` / `unavailable` / `blocked` / `failed`，解释原因与证据。
- `visual_family`：`magpie-desktop`；无适用 preset 时写无，不虚构框架 preset。
- `constraints`：当前设计约束、范围和选择理由。
- `design_decisions`：主题、token 来源、排版、表面、品牌保留、项目覆盖项。
- `component_mapping`：已确认产品元素 → 组件/视觉形态 → 交互状态保留 → 框架实现或限制。
- `motion`：每个重要动画的触发、结束状态、时长/曲线、中断策略、reduced-motion、焦点行为；业务结果不能等待动画结束才生效。
- `artifacts`：实际文件/patch/既有样板路径或本次文字规范；未写文件不能列出“已生成”的项目路径。
- `verification`：实际执行的检查、结果、未验证事项，明确浏览器示意与原生宿主区别。
- `compatibility`：框架及 `native` / `adapted` / `guidance` 支持等级、现有组件复用与依赖情况。
- `unresolved`：需要 product-ui 或用户决定的事项。
- `style_conformance`：`pass` / `warnings` / `fail` / `not-tested`，附具体依据。只提交方案时通常为 `not-tested`；规范检查通过不证明实现通过。

例如：React 项目可返回“现有 Select/Dialog primitives + scoped tokens，adapted”；不能因 HTML 样板可运行就声称拥有原生 React 组件库。SwiftUI/WinUI/Qt 为 guidance；只有宿主代码实现并验证后才能报告菜单栏集成完成。

## 风格符合度检查

按任务范围选择项目，不强制给局部改动增加全项目审计：

1. 明度层次、石墨导航、动作强调符合已接受主题；允许项目品牌覆盖，不把所有选中态涂紫。
2. 已确认的分组和信息密度保留；行内控件对齐，长名称、缩放和窄窗不破坏关键动作。
3. 主窗口、快速面板、系统菜单栏、窗口内状态职责清楚；无意义图表/圆环不因原作存在而增加。
4. 所需状态有真实反馈；加载失败不显示正常 0，状态文案不会推挤主列表。
5. 重要控件有可读对比度、焦点与键盘路径；关闭内层弹层后焦点回归，reduced-motion 降低动画。
6. 若实现原生菜单栏，另验锚定、多屏、失焦/Esc、Space 与后台驻留；仅 Web 预览时记录未验证。

`style_conformance: pass` 只表示本次受检范围内符合风格与明确约束，不等于产品发布批准、Hallmark/Impeccable 已执行或全产品无障碍认证。
