---
name: review-gate
description: 核心项目「结对编程 + 审查门禁」工作流。触发词（类似关键词即可，无关键词不触发）：审计 / 结对审计 / 同步审计 / 互审 / 彼此审计 / 外审 / 独立审计 / 帮我审 / 审一下 / review / 门禁 / 阶段收口 / consent / 待返工。审计分四档：A 结对审计 · B 同步审计（进行中）· C agent 彼此审计（互审）· D 独立审计（外审）。用法：任何 agent（Claude Code / ChatGPT / DSH）加载本 skill 后，按流程执行，并由 scripts/rg-path 调用 `rg` CLI（项目可独立工作，skill 只负责"教你怎么用+帮你调"）。
---

# review-gate — 结对编程 + 审查门禁 工作流 Skill

## 一、这个流程在解决什么
核心项目不允许黑箱：**每轮生成 → 最小测试跑通 → （按需）独立审计 → 阶段收口（3 轮审查通过）→ 文档先于 git → git 需用户同意**。
审计执行方三端任选、双向可调：DSH 我的子代理 / Claude Code 直调 / ChatGPT；审计**默认不触发，用户要求才跑**。

## 二、回合反馈格式（每回合标配）
```
信头: [块 i/n · 阶段 · 行数 · 最小测试 ✅p/q · 门禁 PASS｜FAIL｜待返工 · 审计 未启用｜⏳等待反馈｜已返回 k 条 ｜ 状态: 等待你的决定]
① 完整代码（生成原样，含注释，不压缩）
② 简要说明 + 项目进度
③ 代码分析（purpose / mechanism / keyContent{算法,数据结构,关键参数⚠️} / risks；有重点不啰嗦）
④ 审计（按需）：执行完成后一次性给全（意见带优先级 P0 阻断/P1 建议/P2 可后续 + 证据行号）
⑤ 等待决定：放行 / 打回（返工不计回合）
```

## 三、`rg` 命令表（执行前先调 scripts/rg-path.mjs 定位）
| 命令 | 用途 |
|---|---|
| `rg gate --stage <id> [--base <ref>]` | 技术门（确定性，fail-closed：任一 fail → exit 1 + 待返工） |
| `rg audit --stage <id> [--tool any\|dsh-subagent\|claude-code\|chatgpt] [--inline-docs] [--exec-claude]` | 审计任务包（默认不触发；`--inline-docs` 自包含；`--exec-claude` 直调 Claude Code） |
| `rg review --stage <id> --round <n> --result pass\|fail [--agent 谁] [--notes 意见来源]` | 审查轮次（pass 必附意见来源；≥3 连续 pass 才可收口） |
| `rg stage new --stage <id>` / `rg stage finish --stage <id>` | 整数分支校验（前置必收口）/ 收口检查 → ready-for-consent + 阶段总结 |
| `rg problems` | VS Code Problems 等价检查（diagnostics 0 错） |
| `rg status` / `rg init` / `--help` | 台账总览 / 生成配置模板 / 帮助 |

退出码：0=通过 1=待返工 2=配置/参数/台账错误 3=环境错误。

## 四、审计执行方（三端任选 + 双向；四档触发，默认不触发）
**触发**：类似关键词即可（结对审计 / 同步审计 / 互审 / 彼此审计 / 外审 / 独立审计 / 帮我审 / 审一下）；**无关键词不触发**。
- **A 结对审计**：你+主 Agent 回合级共审，你主导裁决；
- **B 同步审计**：项目进行中随时对当前成果全量审一次；
- **C 彼此审计（互审）**：我审 CC/ChatGPT 的块（`dsh --profile headless "<包>"`），CC/ChatGPT 审我的块（`rg audit --exec-claude` / 粘贴）；
- **D 独立审计（外审）**：`rg audit --stage <id> --tool any|dsh-subagent|claude-code|chatgpt [--inline-docs]`，一次性给全（P0/P1/P2+分析）。
- **自包含**：对外侧执行方一律用 `--inline-docs`（内联 SPEC/方案/CLAUDE.md，外侧无文件访问权）。

## 五、阶段收口（每阶段，用户 review 后才 git）
全量测试绿 →（用户要求时）全面审计 → review ≥3 连续 pass → problems 0 错 → **更新文档** → 阶段总结（目的/思路/修改文件按模块分组/代码要点）→ 用户 review → **git 需用户同意**（consent 仅人工）→ 下一阶段在新整数分支（1,2,3…）从 main 派生。

## 六、边界（重要）
- 审计**默认不触发**；证据链/结对/审计/说明都是**用户启用才执行**（用户说"审计/帮我审"才跑）；
- **项目流程 ≠ 审计要求**：两道门/三轮制/git 纪律是"做项目的责任"，由主 Agent 配合，不属审计职责；
- 技术门是"事实闸"（语法/测试/漂移），AI 审计是"判断闸"（质量/需求符合性）——两者不互相替代，**门禁通过 ≠ 可合并**。

## 七、维护与同源（防漂移）
本 skill 内容与项目文档同源：`SKILL.md` ← `docs/deliverables.md` §3；`references/workflow.md` ← `审查配合方案.md`；`references/audit.md` ← `docs/agent/auditor.md`。**改动项目文档时须同步本 skill（或反之），见 skill/README.md 维护清单。**
