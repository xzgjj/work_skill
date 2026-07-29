<p align="center">
  <h1 align="center">🧰 Work Skill</h1>
  <p align="center">
    Claude Code 技能合集 · 即插即用 · 每个 Skill 独立可用
    <br/>
    <em>A Collection of Claude Code Skills — Plug & Play — Each Skill Stands Alone</em>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/skills-1-blue" alt="skills">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="license">
  <img src="https://img.shields.io/badge/platform-Claude%20Code-orange" alt="platform">
</p>

---

## 📖 这是什么？ / What is this?

一个 Claude Code Skill 合集仓库。每个 Skill 是一个独立文件夹，**单独下载即可使用**，不依赖其他 Skill 或全局配置。

A collection of Claude Code Skills. Each skill is a self-contained folder — **download one and use it immediately**, no dependencies on other skills or global config.

---

## 📦 技能列表 / Skill List

| Skill | 描述 / Description | 市场 / Market |
|-------|-------------------|---------------|
| [**market-detector**](./skills/market-detector/) | 全球股市一体化分析引擎 — 行情/技术面/基本面/行业竞争/HTML报告 | A股 · 港股 · 美股 · Crypto |
| _更多 Skill 即将添加..._ | | |

---

## ⚡ 快速开始 / Quick Start

### 方式一：Clone 全部

```bash
git clone git@github.com:xzgjj/work_skill.git
cp -r work_skill/skills/* ~/.claude/skills/
```

### 方式二：单独下载一个 Skill

直接把对应文件夹复制到 `~/.claude/skills/`：

```bash
# 例如只安装 market-detector
cp -r skills/market-detector ~/.claude/skills/
```

### 方式三：手动复制 SKILL.md

打开 `skills/[skill-name]/SKILL.md`，复制全部内容，粘贴到 `~/.claude/skills/[skill-name]/SKILL.md`。

---

## 📁 仓库结构 / Repo Structure

```
work_skill/
├── README.md                           # 本文件 / This file
├── LICENSE                             # MIT
├── .gitignore
│
├── skills/                             # 所有 Skill 放这里
│   └── market-detector/                # 每个 Skill 一个文件夹
│       ├── SKILL.md                    # Skill 核心文件（YAML frontmatter + Markdown）
│       └── README.md                   # Skill 说明：功能、安装、依赖
│
│   └── your-future-skill/              # 未来添加的新 Skill
│       ├── SKILL.md
│       └── README.md
```

> 每个 Skill 文件夹完全自包含。**单独复制一个文件夹 = 完整安装。**

---

## ➕ 贡献新 Skill / Adding a Skill

```bash
# 1. 在 skills/ 下创建新文件夹
mkdir -p skills/my-skill

# 2. 编写 SKILL.md（必须包含 YAML frontmatter）
cat > skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: 简短描述。触发条件、关键词、适用场景。
---

# My Skill

## 执行流程
...
EOF

# 3. 编写 README.md（给用户看的说明）
# 4. 更新本 README.md 的技能列表表格
# 5. 提交 PR
```

### SKILL.md 格式规范

- **YAML frontmatter 必填字段**：`name`（技能名）、`description`（触发条件描述）
- **正文**：Markdown 格式，Claude 在 Skill 激活后会全文读入
- **长度建议**：控制在 3000 字以内（过长会影响加载速度）

---

## 📋 兼容性 / Compatibility

- **Claude Code** (CLI / VS Code / JetBrains / Desktop)
- 部分 Skill 需要配置 MCP 服务器（详见各 Skill 的 README）

---

## 📄 License

MIT © [xzgjj](https://github.com/xzgjj)

每个 Skill 独立 MIT 授权。你可以自由使用、修改、分发。
Each skill is independently MIT licensed. Free to use, modify, and distribute.

---

<p align="center">
  <sub>Made with ❤️ for the Claude Code community</sub>
</p>
