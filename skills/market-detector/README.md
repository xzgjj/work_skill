# Market Detector

> 全球股市一体化分析引擎 · Global Stock Market Analysis Engine v2.0

## 简介

覆盖 **A股 / 港股 / 美股 / 韩股 / 加密货币** 的智能分析 Skill，自动检测代码所属市场并路由到正确数据源。

### v2.0 新增

- **15板块公司分析模板 (B+)** — 技术视角、产品与销量、产业链对标、FCF/ROIC、DCF交叉验证、多期路径敏感性、催化剂日历、历史周期参照、独立验证、定量风险触发
- **TECH模块自动路由** — 三层行业判定（白名单→业务推断→Exa确认），半导体/AI/机器人/航空航天等自动触发技术深度分析
- **14板块市场分析模板 (C)** — 资金面归因拆解、催化剂日历、历史周期参照、定量风险矩阵
- **搜索降级链** — MCP → Exa 7维度并行 → Chrome DevTools Bing → CCS WebSearch
- **高价值参考自动收集** — 搜索中主动抓取机构报告(Counterpoint/TrendForce/高盛/野村)优先采信
- **韩国市场适配** — KRX代码格式、ADR跨市场套利、杠杆ETF传导分析

## 激活条件

- 有股票代码（6位A股 / 5位港股 / 1-5字母美股 / 6位韩股）+ 任意上下文
- 公司名 + 金融关键词（股市、股价、财报、估值、投资分析等）
- 国家/地区/市场名 + 金融关键词

金融关键词三层：
- **个股层**: 股价/行情/财报/营收/利润/估值/PE/PB/ROE/DCF/目标价/经营分析/技术分析/竞争格局等
- **市场层**: 股市/大盘/指数/板块/市场分析/投资分析等
- **宏观层**: 经济/GDP/CPI/通胀/利率/货币政策/出口/汇率等

## 支持市场

| 市场 | 代码格式 | 数据源 |
|------|---------|--------|
| 🇨🇳 A股上海 | 688xxx / 60xxxx | stock-scanner MCP |
| 🇨🇳 A股深圳 | 00xxxx / 30xxxx | stock-scanner MCP |
| 🇭🇰 港股 | 5位数字 | stock-scanner MCP |
| 🇰🇷 韩股 | 6位数字 | stock-scanner MCP + Finnhub(ADR) |
| 🇺🇸 美股 | 1-5字母 | Finnhub + TradingView + Alpha Vantage |
| 🪙 加密货币 | BTC/ETH 等 | CoinGecko + TradingView |

## 模板体系

| 模板 | 适用场景 | 板块数 | 特点 |
|------|---------|:--:|------|
| **A** | 行情速览 | 3 | 纯事实·快览 |
| **B+** | 公司投资分析 | 15 | TECH自动路由·估值模型·独立验证 |
| **C** | 市场/国家分析 | 14 | 宏观·政策·国际局势·全球对比 |

### B+ 15板块

基本情况 → 行情与技术面 → 技术视角[TECH] → 产品与销量 → 产业链与竞争格局 → 政府政策与监管 → 国际局势 → 资金面 → 基本面(FCF/ROIC) → 关键转折与深度归因 → 估值模型(DCF+多期路径) → 催化剂日历 → 历史周期参照 → 风险矩阵(定量) → 综合研判(独立验证)

## 安装

```bash
cp -r skills/market-detector ~/.claude/skills/
```

## 依赖

需配置以下 MCP 服务器（在 `~/.claude/.mcp.json` 中）：
- `plugin_stock-scanner` — 股市数据源
- `frankfurter` — 汇率数据

可选降级通道：
- `mcporter` (Exa 搜索)
- `chrome-devtools` (Bing搜索降级)
- `ccs-websearch` (最后手段)

## 输出能力

- 📝 纯文字分析报告（模板A/B+/C）
- 📈 Mermaid 图表（K线、营收柱状图、技术指标）
- 📄 HTML 投资报告（Chart.js 交互图表 + 风险矩阵 + Signal Box）
