# Market Detector

> 全球股市一体化分析引擎 · Global Stock Market Analysis Engine

## 简介

市场分析 Skill，覆盖 **A股 / 港股 / 美股 / 加密货币**，自动检测代码所属市场并路由到正确数据源。支持行情速览、技术分析、基本面分析、行业竞争格局，生成 Mermaid 图表和 HTML 投资报告。

激活条件：
- 有股票代码（6位A股 / 5位港股 / 1-5字母美股）+ 任意上下文
- 公司名 + 金融关键词（股市、股价、财报、估值、投资分析等）

## 支持市场

| 市场 | 代码格式 | 数据源 |
|------|---------|--------|
| 🇨🇳 A股上海 | 688xxx / 60xxxx | stock-scanner MCP |
| 🇨🇳 A股深圳 | 00xxxx / 30xxxx | stock-scanner MCP |
| 🇭🇰 港股 | 5位数字 | stock-scanner MCP |
| 🇺🇸 美股 | 1-5字母 | Finnhub + TradingView + Alpha Vantage |
| 🪙 加密货币 | BTC/ETH 等 | CoinGecko + TradingView |

## 安装

将 `market-detector/` 文件夹复制到 `~/.claude/skills/` 即可：

```bash
cp -r skills/market-detector ~/.claude/skills/
```

## 依赖

需配置以下 MCP 服务器（在 `~/.claude/.mcp.json` 中）：
- `plugin_stock-scanner` — 股市数据源

可选：`mcporter` (Exa 搜索降级方案)

## 输出能力

- 📝 纯文字分析报告
- 📈 Mermaid 图表（K线、营收柱状图、技术指标）
- 📄 HTML 投资报告（Chart.js 交互图表 + 风险矩阵 + Signal Box）
