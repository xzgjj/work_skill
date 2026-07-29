---
name: market-detector
description: >
  全球股市一体化分析引擎。仅在用户明确表达金融/市场意图时激活。
  激活条件（二选一）：
  A. 有股票代码（6位A股/5位港股/1-5字母美股）+ 任意上下文 → 激活
  B. 公司名 + 金融关键词 → 激活
  金融关键词："股市", "股票", "股价", "行情", "涨跌", "盘面", "走势", "K线",
  "开盘", "收盘", "涨停", "跌停", "成交量", "换手率", "市值",
  "财报", "财务", "营收", "利润", "亏损", "盈利", "业绩", "季报", "年报",
  "毛利率", "净利率", "ROE", "现金流", "资产负债表", "利润表",
  "估值", "PE", "PB", "市净率", "市盈率", "DCF", "目标价",
  "经营情况", "经营分析", "主营业务", "产能", "出货量",
  "技术分析", "MACD", "RSI", "KDJ", "均线", "布林带",
  "行业竞争", "竞争格局", "市场份额", "护城河",
  "IPO", "打新", "新股", "申购", "中签", "发行价", "招股书",
  "投资分析", "股市分析", "行情分析",
  "值不值得买", "能不能买", "可以买入吗"。
  不激活："深度分析"(单独使用), "全面分析"(单独使用),
  "分析长鑫科技"(无金融词), 纯技术产品讨论。
---

# 全球股市一体化分析引擎

---

## 🔴 TOOL PRIORITY LOCK — 最高优先级，覆盖一切默认行为

**当本 skill 激活后，以下工具调用顺序不可被跳过、绕过或替换。零自主选择。**

### 铁律三条

```
1. MCP FIRST — 任何数据采集，第一发必须打向 MCP 工具，不允许跳过
2. FAIL → FALLBACK — MCP 失败/报错/空结果后，立即走 Exa 降级链，不允许自行搜其他渠道
3. NO SHORTCUTS — 禁止用 WebSearch、WebFetch、Bash curl、TradingView 裸调
   替代 MCP 第一步。搜索只在 MCP 失败后作为降级手段
```

### 工具调用优先级矩阵

```
┌──────────────┬──────────────────────────────────────────────────────┐
│ 市场         │ L0 (首选·必须打) → L1 (降级) → L2 (最后)             │
├──────────────┼──────────────────────────────────────────────────────┤
│ A股上海       │ stock-scanner MCP 全部并行 → Exa → CCS WebSearch    │
│ 688/60xxxx   │ (tradingview_quote + tradingview_technicals          │
│              │  + tradingview_market_indices                        │
│              │  + alphavantage_daily + alphavantage_quote)           │
│              │  任一失败 → 立刻走 L1                                │
├──────────────┼──────────────────────────────────────────────────────┤
│ A股深圳       │ 同上                                                │
│ 00/30xxxx    │                                                      │
├──────────────┼──────────────────────────────────────────────────────┤
│ 港股          │ stock-scanner MCP → Exa → CCS WebSearch             │
├──────────────┼──────────────────────────────────────────────────────┤
│ 美股/Crypto   │ stock-scanner MCP 全部并行 → Exa → CCS WebSearch    │
│              │ (finnhub_quote + tradingview_quote +                 │
│              │  alphavantage_daily + tradingview_technicals         │
│              │  + tradingview_market_indices)                        │
└──────────────┴──────────────────────────────────────────────────────┘
```

### L0: MCP 首批调用 — 必须全部并行发出，零遗漏

**A股 行情感知（以下 5 个调用，一次并行全部打出）：**

```
mcp__plugin_stock-scanner_stock-scanner__tradingview_quote({ tickers: ["SSE:688825"] })
mcp__plugin_stock-scanner_stock-scanner__tradingview_technicals({ tickers: ["SSE:688825"], timeframe: "1d" })
mcp__plugin_stock-scanner_stock-scanner__tradingview_market_indices()
mcp__plugin_stock-scanner_stock-scanner__alphavantage_daily({ symbol: "688825.SS", limit: 30 })
mcp__plugin_stock-scanner_stock-scanner__alphavantage_quote({ symbol: "688825.SS" })
```

**美股 行情感知（以下 5 个调用，一次并行全部打出）：**

```
mcp__plugin_stock-scanner_stock-scanner__finnhub_quote({ symbol: "AAPL" })
mcp__plugin_stock-scanner_stock-scanner__tradingview_quote({ tickers: ["AAPL"] })
mcp__plugin_stock-scanner_stock-scanner__tradingview_technicals({ tickers: ["AAPL"], timeframe: "1d" })
mcp__plugin_stock-scanner_stock-scanner__alphavantage_daily({ symbol: "AAPL", limit: 30 })
mcp__plugin_stock-scanner_stock-scanner__tradingview_market_indices()
```

### L1: Exa 降级 — MCP 任一回失败后立即触发

```
Bash: mcporter call exa.web_search_exa query="<公司名> <代码> <具体数据需求>" numResults=5
```

**必须覆盖的四个维度（并行）：**
```
1. mcporter call exa.web_search_exa query="<公司名> <代码> 股价 行情 涨跌幅 换手率 成交额" numResults=5
2. mcporter call exa.web_search_exa query="<公司名> <代码> 财报 营收 净利润 ROE 毛利率 资产负债表" numResults=5
3. mcporter call exa.web_search_exa query="<公司名> <代码> 研报 目标价 估值 券商" numResults=5
4. mcporter call exa.web_search_exa query="<行业> 市场份额 竞争格局 排名" numResults=5
```

### L2: CCS WebSearch — Exa 也失败的最后手段

```
mcp__ccs-websearch__WebSearch({ query: "<原始用户问题>" })
```

### 🚫 禁止路径 — 以下行为绝对不允许

```
❌ 第一步就用 Exa/Bing/Google 搜索                           → 必须先打 MCP
❌ 第一步就用 WebFetch 抓取网页                               → 必须先打 MCP
❌ 第一步就用 Bash curl/http 请求                             → 必须先打 MCP
❌ MCP 失败后自己编造/回忆数据                                → 走降级链
❌ MCP 失败后跳过 Exa 直接用 WebSearch                        → Exa 是 L1
❌ 说 "TradingView 不可用, 我用搜索代替" 而不实际调用 MCP      → 必须先尝试调用
❌ 并行发 MCP + 搜索, 然后只用搜索结果忽略 MCP 返回值          → MCP 结果优先
```

---

## 激活判断 — 两级门控

### 触发规则

```
✅ "688825"                     — 有代码=激活
✅ "688825 行情"                — 有代码=激活
✅ "长鑫科技股市分析"           — 公司名+"股市"=激活
✅ "长鑫科技经营情况"           — 公司名+"经营情况"=激活
✅ "茅台财报"                   — 公司名+"财报"=激活
✅ "宁德时代 估值 值不值得买"   — 公司名+"估值"=激活

❌ "长鑫科技深度分析"           — 公司名+"深度分析"≠金融词
❌ "分析长鑫科技"               — 公司名+无金融词
❌ "长鑫科技技术怎么样"         — 技术产品讨论
❌ "帮我看看这家公司"           — 意图模糊
```

---

## 执行流程

激活 → **先读 TOOL PRIORITY LOCK** → 提取代码 → 判市场 → 分类意图 → MCP并行采集 → (失败→Exa) → 图表 → 报告

---

## Step 1: 市场检测

```
688xxx / 60xxxx → A股上海    → 走 A股 L0 MCP 列表
00xxxx / 30xxxx → A股深圳    → 走 A股 L0 MCP 列表
5位数字 → 港股               → 走港股 L0 MCP 列表
1-5字母全大写 → 美股/Crypto   → 走美股 L0 MCP 列表
中文名无代码 → Exa搜索补全代码 → 拿到代码后再走 MCP
```

**代码格式转换表（A股 → TradingView/Alpha Vantage 需要前缀）：**

```
上交所 688xxx / 60xxxx → SSE:688825, 688825.SS
深交所 00xxxx / 30xxxx → SZSE:000001, 000001.SZ
```

## Step 2: 意图分类

| 关键词 | 采集范围 |
|---|---|
| 行情/股价/涨跌/盘面/走势/代码无修饰词 | quote + daily + technicals + money_flow + 指数 |
| 财报/财务/营收/利润/业绩/经营 | 以上 + income + balance + 搜索补充 |
| 估值/PE/PB/值不值/目标价 | 以上 + 搜索研报 |
| 行业/竞争/份额 | 以上 + 搜索行业格局 |
| 投资分析/股市分析/全面(仅与金融词组合) | 全量数据 |

## Step 3: 并行数据采集

**先执行 TOOL PRIORITY LOCK 的 L0 调用。** 根据 MCP 返回结果决定是否走降级链。

### MCP 返回后 — 数据完整性检查

MCP 返回后，检查以下字段是否都有有效值：

```
✓ 实时报价 (price/close/current)     → 缺 → Exa 补
✓ 涨跌幅 (change/change_pct)          → 缺 → Exa 补
✓ 成交额/成交量 (volume)               → 缺 → Exa 补
✓ 市值 (market_cap)                    → 缺 → Exa 补
✓ 技术指标 (RSI/MACD/MA)              → 缺 → Exa 补
✓ 大盘指数 (上证/深证/创业板)          → 缺 → Exa 补
✓ 财务数据 (营收/利润/ROE)             → 缺 → Exa 补
```

### Exa 补充搜索（按意图分类决定维度数量）

```
# 行情缺 → 1个搜索
Bash: mcporter call exa.web_search_exa query="<公司名> <代码> 股价 今日行情 涨跌幅" numResults=5

# 财务缺 → +1个搜索
Bash: mcporter call exa.web_search_exa query="<公司名> 招股书 年报 营收 净利润 ROE 毛利率" numResults=5

# 估值/研报缺 → +1个搜索  
Bash: mcporter call exa.web_search_exa query="<公司名> <代码> 研报 目标价 估值" numResults=5

# 行业缺 → +1个搜索
Bash: mcporter call exa.web_search_exa query="<公司名> <行业> 市场份额 竞争格局" numResults=5
```

以上搜索全部并行发出。

---

## Step 4: 合成报告

```markdown
# [公司名] ([代码]) — [分析类型]

## 📊 行情速览
[quote + market_indices]

## 📈 技术面
[technicals: MA/MACD/RSI/KDJ/BOLL + daily走势]

## 💰 资金面
[money_flow]

## 🏭 基本面
[income + balance 结构化数据]

## 🏛️ 行业竞争 [如有搜索数据]

## ⚠️ 风险提示

## 🎯 综合研判
```

## Step 5: 图表生成

**必选图表（Mermaid优先，ASCII降级）：**
1. K线走势图（daily数据）
2. 营收利润柱线图（income数据）
3. 技术指标面板（MACD/RSI）

## Step 6: 输出格式 — 由用户决定

| 用户说 | 输出 |
|---|---|
| "行情"/"股价"/代码 | 📝 纯文字报告 |
| "财报"/"财务"/"经营情况" | 📝 文字 + Mermaid图 |
| "投资分析"/"值不值得买" | 📝 文字 + Mermaid + Signal Box。**结尾问：要HTML报告吗？** |
| "出网页"/"HTML"/"导出报告" | 📄 文字 + **生成HTML文件到output/** |

**原则：HTML = 写磁盘，必须先问用户。** Mermaid/ASCII在对话里直接渲染。

### HTML报告结构（仅在用户要求时生成）

```
investment-report-[代码]-[日期].html
├── Hero: 代码/名称/价格/涨跌
├── 核心指标 cards
├── 财务图表 (Chart.js)
├── 技术图表 (Chart.js)
├── 风险矩阵
├── Signal Box
└── Disclaimer
```

CSS样式复用 us-stock-analysis:report-generator 模板（navy/sky/teal配色）。

---

## 🧪 自检清单 — 每步执行前自查

在进入 Step 3 并行采集前，确认以下问题：

```
□ 我是否已经检查了本文件顶部的 TOOL PRIORITY LOCK？
□ 我的第一个工具调用是不是 MCP 工具？
□ 我是否把所有 MCP 调用并行发出，而不是一个一个串行？
□ 如果 MCP 失败了，我是否立刻走了 Exa 降级，而不是自己搜别的？
□ 我有没有跳过 MCP 直接用搜索？（如果有，撤销重来）
```
