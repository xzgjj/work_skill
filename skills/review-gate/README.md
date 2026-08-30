# review-gate Skill — 维护说明

## 交付说明
本项目最终交付 = 项目（`-review-gate` 仓库，可独立工作）＋ 本 Skill（其他 agent 装上即懂）。
上传目标：`work_skill`（公开）→ `skills/review-gate/`（与本仓库 `skill/review-gate/` 同源）。

## 同源清单（改动必须双向同步）
| 本 Skill | 项目源文档 |
|---|---|
| `SKILL.md`（§二/三/五/六） | `docs/deliverables.md` §3 已定稿格式 |
| `references/workflow.md` | `审查配合方案.md` |
| `references/audit.md` | `docs/agent/auditor.md` |
| `scripts/rg-path.mjs` | 调用 `bin/rg.cmd` / `src/cli.mjs` |

## 同步方法
1. 改项目文档 → 手动同步到对应 skill 文件（或改 skill → 同步回项目文档）；
2. 上传：复制 `skill/review-gate/` → `work_skill/skills/review-gate/` → git push。
