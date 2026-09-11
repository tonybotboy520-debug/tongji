import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Article, Buildings, CalendarBlank,
  ChartBar, ChartLineUp, ChatsCircle, CheckCircle, Circle, CircleNotch,
  Desktop, DownloadSimple, FunnelSimple, GlobeSimple, LinkSimple,
  MagnifyingGlass, MapPin, Megaphone, NewspaperClipping, Phone, Pulse,
  Robot, ShoppingBagOpen, Sparkle, Target, TrendUp, UsersThree,
} from "@phosphor-icons/react";
import {
  SiBaidu, SiBilibili, SiKuaishou, SiSinaweibo,
  SiTiktok, SiWechat, SiXiaohongshu,
} from "react-icons/si";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";

const numberFormatter = new Intl.NumberFormat("zh-CN");

function CountUp({ value, suffix = "", duration = 1.35, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-24px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [delay, duration, inView, reduceMotion, value]);

  return <span ref={ref}>{numberFormatter.format(display)}{suffix}</span>;
}

const cardMotion = {
  initial: { opacity: 0, y: 14, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  whileHover: { y: -2, scale: 1.006, transition: { duration: 0.18 } },
};

const nodeCards = [
  { id: "geo-card", className: "geo-card", icon: Robot, title: "GEO", chip: "AI 搜索引擎", metric: "AI 推荐曝光量", value: 12860, tone: "violet" },
  { id: "product-card", className: "product-card", icon: ShoppingBagOpen, title: "商品卡", metric: "商品卡出卡量", value: 2315, tone: "violet" },
  { id: "ad-card", className: "ad-card", icon: Megaphone, title: "广告", metric: "广告点击量", value: 1946, tone: "blue" },
  { id: "site-card", className: "site-card", icon: Desktop, title: "官网", metric: "官网曝光量", value: 3680, tone: "blue" },
  { id: "phone-card", className: "phone-card", icon: Phone, title: "电话", metric: "电话曝光量", value: 418, tone: "teal" },
  { id: "address-card", className: "address-card", icon: MapPin, title: "地址", metric: "地址曝光量", value: 276, tone: "teal" },
  { id: "lead-card", className: "lead-card", icon: ChatsCircle, title: "咨询留资", metric: "咨询留资量", value: 326, tone: "teal" },
];

const platformLogos = [
  [SiXiaohongshu, "#ff2442", "小红书"],
  [SiTiktok, "#111827", "抖音"],
  [SiWechat, "#07c160", "微信"],
  [SiKuaishou, "#ff5b2d", "快手"],
  [SiBilibili, "#fb7299", "哔哩哔哩"],
  [SiSinaweibo, "#f0442c", "微博"],
];

const connectorPaths = [
  { id: "geo-search", from: "geo-card", to: "search-hub", tone: "purple", d: "M198 210 C226 210 250 225 282 225", tip: "GEO带动主动搜索", tipX: 239, tipY: 201 },
  { id: "geo-product", from: "geo-card", to: "product-card", tone: "purple", d: "M108 281 C108 320 98 350 98 385", tip: "GEO直接触发商品卡", tipX: 173, tipY: 331 },
  { id: "geo-phone", from: "geo-card", to: "phone-card", tone: "purple", d: "M154 137 C290 49 745 48 900 104", tip: "AI回答展示联系电话", tipX: 706, tipY: 63 },
  { id: "geo-site", from: "geo-card", to: "site-card", tone: "purple", d: "M180 140 C320 103 603 105 650 302", tip: "GEO推荐直达官网", tipX: 465, tipY: 103 },
  { id: "geo-address", from: "geo-card", to: "address-card", tone: "purple", d: "M169 139 C310 76 704 77 827 280", tip: "AI回答展示地址", tipX: 620, tipY: 78 },
  { id: "product-phone", from: "product-card", to: "phone-card", tone: "purple", d: "M179 453 C330 520 900 522 900 216", tip: "商品卡引导电话咨询", tipX: 555, tipY: 506 },
  { id: "search-ad", from: "search-hub", to: "ad-card", tone: "blue", d: "M500 188 C528 188 540 204 568 204", tip: "搜索结果进入广告", tipX: 535, tipY: 181 },
  { id: "search-site", from: "search-hub", to: "site-card", tone: "blue", d: "M500 254 C536 254 535 344 568 344", tip: "搜索结果进入官网", tipX: 542, tipY: 281 },
  { id: "search-address", from: "search-hub", to: "address-card", tone: "blue", d: "M500 318 C590 331 725 306 827 292", tip: "搜索结果展示地址", tipX: 702, tipY: 309 },
  { id: "ad-lead", from: "ad-card", to: "lead-card", tone: "teal", d: "M730 204 C803 225 878 323 880 396", tip: "广告点击产生留资", tipX: 816, tipY: 268 },
  { id: "site-phone", from: "site-card", to: "phone-card", tone: "teal", d: "M730 329 C783 311 774 181 827 180", tip: "官网引导电话咨询", tipX: 795, tipY: 241 },
  { id: "site-address", from: "site-card", to: "address-card", tone: "teal", d: "M730 358 C770 358 787 318 827 318", tip: "官网提供到店地址", tipX: 782, tipY: 337 },
  { id: "site-lead", from: "site-card", to: "lead-card", tone: "teal", d: "M730 386 C775 393 788 450 827 450", tip: "官网表单产生留资", tipX: 785, tipY: 419 },
];

function BrandMark() {
  return <div className="brand-mark" aria-label="360 智见"><span className="brand-ring" /><b>360</b><strong>智见</strong></div>;
}

function IconBubble({ Icon, tone }) {
  return <span className={`icon-bubble ${tone}`} aria-hidden="true"><Icon size={30} weight="fill" /></span>;
}

function NodeCard({ data, index, activeNodeId, setActiveNodeId }) {
  const Icon = data.icon;
  const active = activeNodeId === data.id;
  return (
    <motion.article id={data.id} className={`node-card ${data.className}${active ? " is-active" : ""}`} tabIndex="0"
      aria-label={`${data.title}，${data.metric} ${numberFormatter.format(data.value)}`}
      onMouseEnter={() => setActiveNodeId(data.id)}
      onMouseLeave={() => setActiveNodeId((current) => current === data.id ? null : current)}
      onFocus={() => setActiveNodeId(data.id)}
      onBlur={() => setActiveNodeId((current) => current === data.id ? null : current)}
      {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.18 + index * 0.055 }}>
      <IconBubble Icon={Icon} tone={data.tone} />
      <div className="node-copy">
        <div className="node-title-line"><h3>{data.title}</h3>{data.chip && <span className="mini-chip">{data.chip}</span>}</div>
        <p>{data.metric}</p>
        <strong className={`node-value ${data.tone}`}><CountUp value={data.value} delay={0.28 + index * 0.04} /></strong>
      </div>
    </motion.article>
  );
}

function SearchHub({ activeNodeId, setActiveNodeId }) {
  const active = activeNodeId === "search-hub";
  return (
    <motion.article id="search-hub" className={`search-hub${active ? " is-active" : ""}`} tabIndex="0" aria-label="搜索与内容平台数据"
      onMouseEnter={() => setActiveNodeId("search-hub")}
      onMouseLeave={() => setActiveNodeId((current) => current === "search-hub" ? null : current)}
      onFocus={() => setActiveNodeId("search-hub")}
      onBlur={() => setActiveNodeId((current) => current === "search-hub" ? null : current)}
      {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.26 }}>
      <div className="hub-heading"><IconBubble Icon={MagnifyingGlass} tone="blue" /><h3>搜索</h3></div>
      <div className="search-metrics">
        <div className="search-unit">
          <div className="search-label baidu"><SiBaidu aria-hidden="true" /><span>百度搜索</span></div>
          <strong><CountUp value={3920} delay={0.35} /></strong>
        </div>
        <div className="search-unit">
          <div className="search-label so360"><span className="so360-logo" aria-hidden="true"><CircleNotch weight="bold" /><Circle weight="fill" /></span><span>360 搜索</span></div>
          <strong><CountUp value={2360} delay={0.4} /></strong>
        </div>
      </div>
      <div className="hub-divider" />
      <div className="content-metric">
        <div className="content-label"><span className="content-icon"><ChartLineUp size={17} weight="bold" /></span><span>内容平台访问量</span></div>
        <strong><CountUp value={4302} delay={0.48} /></strong>
        <div className="platform-logo-row" aria-label="覆盖小红书、抖音、微信、快手、哔哩哔哩和微博">
          {platformLogos.map(([Logo, color, name], index) => (
            <motion.span key={name} title={name} aria-label={name} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.62 + index * 0.045, type: "spring", stiffness: 250, damping: 18 }} style={{ "--logo-color": color }}>
              <Logo aria-hidden="true" />
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function RelationshipMap() {
  const reduceMotion = useReducedMotion();
  const [activeNodeId, setActiveNodeId] = useState(null);

  return (
    <section className="journey-panel" aria-labelledby="journey-title">
      <div className="section-heading journey-heading">
        <div><div className="heading-title-row"><Sparkle size={20} weight="fill" aria-hidden="true" /><h1 id="journey-title">客户获取关系图</h1></div><p>从 AI 曝光到实际用户行为的全链路转化路径</p></div>
        <div className="date-chip" aria-label="当前统计周期 2026年9月5日至9月11日"><span>2026/09/05 — 09/11</span><CalendarBlank size={18} /></div>
      </div>
      <div className={`journey-canvas${activeNodeId ? " has-active-node" : ""}`}>
        <div className="zone zone-1"><h2>GEO 触达</h2><p>多元内容曝光 · 激发搜索意图</p></div>
        <div className="zone zone-2"><h2>搜索与内容平台</h2><p>搜索需求汇聚 · 内容种草触达</p></div>
        <div className="zone zone-3"><h2>承接渠道</h2><p>多触点承接流量 · 引导用户互动</p></div>
        <div className="zone zone-4"><h2>最终行为</h2><p>关键行为转化 · 获取高价值客户</p></div>
        <svg className={`connector-map${reduceMotion ? " reduced-motion" : ""}`} viewBox="0 0 1000 550" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            {[
              ["purple", "#7d63dc"],
              ["blue", "#2878ce"],
              ["teal", "#239da0"],
            ].map(([tone, color]) => (
              <marker key={tone} id={`arrow-${tone}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 Z" fill={color} />
              </marker>
            ))}
          </defs>
          {connectorPaths.map((connector, index) => {
            const connected = activeNodeId && (connector.from === activeNodeId || connector.to === activeNodeId);
            const muted = activeNodeId && !connected;
            return (
              <g key={connector.id} className={`connector-group${connected ? " is-connected" : ""}${muted ? " is-muted" : ""}`}>
                <path
                  className={`connector-path connector-${connector.tone}${connected ? " is-connected" : ""}${muted ? " is-muted" : ""}`}
                  d={connector.d}
                  markerEnd={`url(#arrow-${connector.tone})`}
                  style={{ "--connector-delay": `${0.45 + index * 0.055}s` }}
                />
              </g>
            );
          })}
        </svg>
        <div className="connector-tip-layer" aria-hidden="true">
          {connectorPaths.filter((connector) => activeNodeId && (connector.from === activeNodeId || connector.to === activeNodeId)).map((connector) => (
            <span
              className={`connector-tip tip-${connector.tone}`}
              key={connector.id}
              style={{ left: `${connector.tipX / 10}%`, top: `${connector.tipY / 5.5}%` }}
            >{connector.tip}</span>
          ))}
        </div>
        <div className="node-layer">
          {nodeCards.map((card, index) => <NodeCard data={card} index={index} key={card.id} activeNodeId={activeNodeId} setActiveNodeId={setActiveNodeId} />)}
          <SearchHub activeNodeId={activeNodeId} setActiveNodeId={setActiveNodeId} />
        </div>
      </div>
    </section>
  );
}

const trend7 = [
  { date: "09/05", value: 812 }, { date: "09/06", value: 845 }, { date: "09/07", value: 876 },
  { date: "09/08", value: 912 }, { date: "09/09", value: 956 }, { date: "09/10", value: 994 }, { date: "09/11", value: 1025 },
];
const trend30 = Array.from({ length: 30 }, (_, index) => ({ date: `08/${String(index + 13).padStart(2, "0")}`, value: 410 + index * 19 + Math.round(Math.sin(index * 0.8) * 11) }));

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return <div className="chart-tooltip"><span>{label}</span><strong>{numberFormatter.format(payload[0].value)} 条</strong></div>;
}

const platformBars = [["DeepSeek", 245, "#7f68e8"], ["豆包", 211, "#4e84ef"], ["文心一言", 187, "#3f9fd8"], ["Kimi", 154, "#42b4b2"], ["通义千问", 132, "#65b89a"], ["腾讯元宝", 54, "#e0a83e"], ["纳米", 42, "#9b80e5"]];
const ranking = [["派瑞林涂层", 186], ["纳米镀膜", 164], ["三防涂层", 151], ["真空镀膜", 139], ["电子元件防潮", 126]];
const termRows = [
  ["派瑞林涂层", "派瑞林涂层厂家如何选择", "搜索词", "DeepSeek", "PC 端", "09/11 15:42"],
  ["纳米镀膜", "电子元件纳米镀膜方案", "意图词", "豆包", "手机端", "09/11 14:18"],
  ["三防涂层", "三防涂层适合哪些场景？", "问答词", "文心一言", "PC 端", "09/11 11:07"],
  ["真空镀膜", "澄川新材真空镀膜怎么样？", "品牌词", "Kimi", "PC 端", "09/10 18:32"],
  ["电子元件防潮", "电子元件防潮供应商推荐", "意图词", "通义千问", "手机端", "09/10 16:25"],
  ["派瑞林涂层", "医疗器械表面涂层服务商", "问答词", "腾讯元宝", "PC 端", "09/10 12:06"],
];

const articleRows = [
  ["电子元件防潮涂层怎么选？从性能到交付的完整指南", "中国工业网", "派瑞林涂层", "09/10 16:20", "已回链"],
  ["汽车电子三防涂层的测试标准与选型建议", "制造前沿", "三防涂层", "09/09 14:08", "已回链"],
  ["真空镀膜工艺在精密器件中的应用边界", "科技观察", "真空镀膜", "09/08 11:32", "已回链"],
  ["医疗器械表面防护：派瑞林材料的合规要点", "新材料在线", "医疗器械涂层", "09/07 17:45", "已回链"],
  ["纳米镀膜供应商评估的五个核心维度", "产业创新网", "纳米镀膜", "09/06 10:18", "待复核"],
  ["PCB 防潮防腐处理方案横向对比", "电子工程专辑", "电子元件防潮", "09/05 09:40", "已回链"],
];

const searchContentRows = [
  ["搜索", "百度", "派瑞林涂层厂家", "864", "官网", "09/11"],
  ["搜索", "360搜索", "纳米镀膜供应商", "628", "广告", "09/11"],
  ["搜索", "百度", "电子元件防潮方案", "514", "官网", "09/10"],
  ["内容", "小红书", "精密器件防护方案", "926", "内容详情", "09/10"],
  ["内容", "抖音", "三防涂层工艺演示", "841", "企业主页", "09/09"],
  ["内容", "微信", "派瑞林材料应用指南", "736", "公众号文章", "09/09"],
  ["内容", "哔哩哔哩", "真空镀膜工艺解析", "618", "视频详情", "09/08"],
];

const channelRows = [
  ["广告", "360搜索品牌专区", "派瑞林涂层解决方案", "486", "38", "09/11 16:10"],
  ["官网", "AI 回答直达", "/solutions/parylene", "342", "31", "09/11 15:42"],
  ["广告", "百度搜索推广", "电子元件防潮", "317", "24", "09/11 13:18"],
  ["官网", "百度自然搜索", "/cases/electronics", "286", "19", "09/10 18:05"],
  ["官网", "360自然搜索", "/products/coating-c", "241", "17", "09/10 14:33"],
  ["广告", "360搜索行业词", "真空镀膜服务", "226", "14", "09/09 20:11"],
];

const behaviorRows = [
  ["咨询留资", "广告 → 留资表单", "360搜索", "上海", "访客 A31***", "09/11 16:42"],
  ["电话曝光", "GEO → 电话", "DeepSeek", "江苏", "回答 R19***", "09/11 15:18"],
  ["地址曝光", "搜索 → 地址", "百度", "浙江", "查询 Q72***", "09/11 13:06"],
  ["咨询留资", "官网 → 在线咨询", "官网", "广东", "访客 D31***", "09/11 11:29"],
  ["电话曝光", "商品卡 → 电话", "商品卡", "北京", "卡片 C08***", "09/10 19:37"],
  ["地址曝光", "GEO → 地址", "豆包", "湖北", "回答 B7E***", "09/10 14:55"],
  ["咨询留资", "官网 → 留言表单", "官网", "山东", "访客 H25***", "09/10 10:26"],
  ["地址曝光", "官网 → 地址", "官网", "四川", "访客 P06***", "09/09 17:11"],
];

const floorTrends = {
  geo: [74, 78, 81, 85, 89, 94, 100].map((value, index) => ({ day: `09/${String(index + 5).padStart(2, "0")}`, value })),
  search: [61, 68, 64, 73, 79, 83, 91].map((value, index) => ({ day: `09/${String(index + 5).padStart(2, "0")}`, value })),
  channel: [46, 51, 58, 56, 67, 74, 78].map((value, index) => ({ day: `09/${String(index + 5).padStart(2, "0")}`, value })),
  behavior: [33, 39, 36, 48, 52, 58, 64].map((value, index) => ({ day: `09/${String(index + 5).padStart(2, "0")}`, value })),
};

const stageMeta = {
  geo: { number: "01", title: "GEO", subtitle: "可见度与内容交付", icon: Robot, tone: "violet", note: "从被 AI 看见，到让优质内容成为可引用信源" },
  search: { number: "02", title: "搜索与内容平台", subtitle: "主动搜索与内容触达", icon: MagnifyingGlass, tone: "blue", note: "拆解百度、360搜索与六大内容平台的真实贡献" },
  channel: { number: "03", title: "承接渠道", subtitle: "广告与官网承接", icon: Buildings, tone: "cyan", note: "观察流量进入广告和官网后的承接效率与去向" },
  behavior: { number: "04", title: "最终行为", subtitle: "留资与关键信息曝光", icon: UsersThree, tone: "teal", note: "区分真实留资事件与电话、地址信息曝光" },
};

const geoSummary = {
  visibility: [
    { label: "目标词", value: 22, note: "重点业务词" },
    { label: "拓展词", value: 1291, note: "跨平台去重" },
    { label: "品牌收录", value: 1025, note: "AI 回答出现" },
    { label: "官网曝光", value: 549, note: "出现不等于访问" },
    { label: "电话曝光", value: 2399, note: "出现不等于拨打" },
  ],
  media: [
    { label: "成功发文", value: 24, suffix: "篇", note: "已发布" },
    { label: "覆盖媒体", value: 8, suffix: "家", note: "主体去重" },
    { label: "覆盖目标词", value: 6, suffix: "个", note: "文章关联" },
    { label: "有效回链", value: 22, suffix: "条", note: "可正常访问" },
    { label: "被 AI 引用", value: 15, suffix: "篇", note: "URL 匹配" },
  ],
};

const floorMetrics = {
  search: [
    { label: "百度搜索量", value: 3920, note: "本期有效搜索" },
    { label: "360 搜索量", value: 2360, note: "本期有效搜索" },
    { label: "内容平台访问", value: 4302, note: "六个平台聚合" },
    { label: "覆盖平台", value: 6, suffix: "个", note: "内容阵地" },
  ],
  channel: [
    { label: "广告点击量", value: 1946, note: "搜索广告点击" },
    { label: "官网曝光量", value: 3680, note: "AI 与搜索曝光" },
    { label: "官网访问事件", value: 549, note: "可追踪访问" },
    { label: "承接留资量", value: 326, note: "广告及官网" },
  ],
  behavior: [
    { label: "咨询留资量", value: 326, note: "真实表单/咨询" },
    { label: "电话曝光量", value: 418, note: "不等于拨打" },
    { label: "地址曝光量", value: 276, note: "不等于到店" },
    { label: "来源关联率", display: "92.9%", note: "可回溯路径" },
  ],
};

function MetricValue({ item, delay = 0 }) {
  return item.display ? <>{item.display}</> : <CountUp value={item.value} suffix={item.suffix || ""} delay={delay} />;
}

function FloorSparkline({ data, color }) {
  return <div className="floor-sparkline" aria-label="近7日变化趋势"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
    <defs><linearGradient id={`floor-fill-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.28} /><stop offset="100%" stopColor={color} stopOpacity={0.01} /></linearGradient></defs>
    <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2.2} fill={`url(#floor-fill-${color.replace("#", "")})`} isAnimationActive animationDuration={720} dot={false} />
  </AreaChart></ResponsiveContainer></div>;
}

function PlatformMiniatures() {
  return <div className="floor-platforms" aria-label="小红书、抖音、微信、快手、哔哩哔哩和微博">{platformLogos.map(([Logo, color, name]) => <span key={name} title={name} style={{ "--brand-color": color }}><Logo aria-hidden="true" /></span>)}</div>;
}

function StageFloor({ stage, metrics, onOpen, children }) {
  const meta = stageMeta[stage];
  const Icon = meta.icon;
  const colors = { violet: "#7653e8", blue: "#1f76e8", cyan: "#159fca", teal: "#159c90" };
  return <motion.article id={`floor-${stage}`} className={`stage-floor floor-${meta.tone}`} tabIndex="0" aria-label={`${meta.title}，查看详情`}
    onClick={onOpen} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(); } }}
    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
    <div className="floor-identity"><span className="floor-number">{meta.number}</span><span className="floor-icon"><Icon size={28} weight="fill" /></span><div><span>{meta.subtitle}</span><h3>{meta.title}</h3><p>{meta.note}</p></div></div>
    <div className="floor-content">{children || <div className="floor-metrics">{metrics.map((item, index) => <div className="floor-metric" key={item.label}><span>{item.label}</span><strong><MetricValue item={item} delay={index * 0.04} /></strong><small>{item.note}</small></div>)}</div>}</div>
    <div className="floor-insight"><span className="floor-trend-label"><Pulse size={15} weight="bold" />近 7 日持续增长</span><FloorSparkline data={floorTrends[stage]} color={colors[meta.tone]} />{stage === "search" && <PlatformMiniatures />}<button className="floor-link" type="button" onClick={(event) => { event.stopPropagation(); onOpen(); }}>查看详情 <ArrowRight size={16} weight="bold" /></button></div>
  </motion.article>;
}

function GeoFloor({ onOpen }) {
  const [tab, setTab] = useState("visibility");
  return <StageFloor stage="geo" onOpen={() => onOpen("geo", tab)}>
    <div className="geo-floor-content">
      <div className="floor-tabs" role="tablist" aria-label="GEO核心数据类型">
        <button role="tab" aria-selected={tab === "visibility"} className={tab === "visibility" ? "active" : ""} onClick={(event) => { event.stopPropagation(); setTab("visibility"); }}>AI可见度分析</button>
        <button role="tab" aria-selected={tab === "media"} className={tab === "media" ? "active" : ""} onClick={(event) => { event.stopPropagation(); setTab("media"); }}>发文数据分析</button>
      </div>
      <div className="floor-metrics geo-floor-metrics" role="tabpanel">{geoSummary[tab].map((item, index) => <div className="floor-metric" key={item.label}><span>{item.label}</span><strong><MetricValue item={item} delay={index * 0.04} /></strong><small>{item.note}</small></div>)}</div>
    </div>
  </StageFloor>;
}

function StageOverview({ onOpen }) {
  return <section className="stage-overview" id="stage-overview" aria-labelledby="detail-title">
    <div className="stage-heading"><div><span className="section-kicker">FULL-FUNNEL DATA</span><h2 id="detail-title">分阶段数据总览</h2><p>从 GEO 触达到最终行为，每个楼层展示阶段核心结果；进入详情可查看趋势、分布与逐条记录。</p></div><span className="updated-badge"><CheckCircle size={17} weight="fill" />数据更新至 09/11 18:00</span></div>
    <div className="floor-stack">
      <GeoFloor onOpen={onOpen} />
      <StageFloor stage="search" metrics={floorMetrics.search} onOpen={() => onOpen("search")} />
      <StageFloor stage="channel" metrics={floorMetrics.channel} onOpen={() => onOpen("channel")} />
      <StageFloor stage="behavior" metrics={floorMetrics.behavior} onOpen={() => onOpen("behavior")} />
    </div>
  </section>;
}

function DetailKpis({ items }) {
  return <section className={`detail-kpis count-${items.length}`} aria-label="核心指标">{items.map((item, index) => <article key={item.label}><span>{item.label}</span><strong><MetricValue item={item} delay={index * 0.045} /></strong><small>{item.note}</small></article>)}</section>;
}

function DetailSection({ title, subtitle, action, children, className = "" }) {
  return <section className={`detail-card ${className}`}><header><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>{action}</header>{children}</section>;
}

function DetailTrend({ data, color = "#7653e8", range = 7 }) {
  return <div className="detail-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 16, right: 18, left: -10, bottom: 4 }}>
    <defs><linearGradient id={`detail-fill-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.24} /><stop offset="100%" stopColor={color} stopOpacity={0.012} /></linearGradient></defs>
    <CartesianGrid stroke="#edf0f7" strokeDasharray="4 6" vertical={false} /><XAxis dataKey={data[0]?.date ? "date" : "day"} axisLine={false} tickLine={false} tick={{ fill: "#92a0b4", fontSize: 11 }} interval={range === 7 ? 0 : 4} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#92a0b4", fontSize: 11 }} width={48} />
    <Tooltip content={<ChartTooltip />} cursor={{ stroke: color, strokeOpacity: .3, strokeDasharray: "3 4" }} /><Area type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} fill={`url(#detail-fill-${color.replace("#", "")})`} animationDuration={850} activeDot={{ r: 5, fill: "#fff", stroke: color, strokeWidth: 2 }} />
  </AreaChart></ResponsiveContainer></div>;
}

function DistributionBars({ items, total, valueLabel = "次" }) {
  const max = Math.max(...items.map((item) => item[1]), 1);
  return <div className="distribution-bars">{items.map(([name, value, color], index) => <div className="distribution-row" key={name}><span>{name}</span><div><motion.i initial={{ width: 0 }} whileInView={{ width: `${value / max * 100}%` }} viewport={{ once: true }} transition={{ duration: .65, delay: index * .05 }} style={{ background: color || "#547ee8" }} /></div><strong>{numberFormatter.format(value)}</strong><small>{total ? `${(value / total * 100).toFixed(1)}%` : valueLabel}</small></div>)}</div>;
}

function FilterChips({ options, value, onChange, label }) {
  return <div className="detail-filters" role="group" aria-label={label}>{options.map((option) => <button type="button" key={option} className={value === option ? "active" : ""} aria-pressed={value === option} onClick={() => onChange(option)}>{option}</button>)}</div>;
}

function DataTable({ headers, rows, empty = "暂无匹配记录" }) {
  return <div className="detail-table-wrap"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, rowIndex) => <tr key={`${row[1]}-${rowIndex}`}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{index === 0 ? <span className="row-primary">{cell}</span> : cell}</td>)}</tr>) : <tr><td className="empty-table" colSpan={headers.length}>{empty}</td></tr>}</tbody></table></div>;
}

function downloadCsv(filename, headers, rows) {
  const escape = (value) => `"${String(value).replaceAll('"', '""')}"`;
  const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(escape).join(",")).join("\n")}`;
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function GeoVisibilityDetail() {
  const [range, setRange] = useState(7);
  const [type, setType] = useState("全部词类型");
  const data = useMemo(() => range === 7 ? trend7 : trend30, [range]);
  const rows = useMemo(() => type === "全部词类型" ? termRows : termRows.filter((row) => row[2] === type), [type]);
  return <div className="detail-sections"><DetailKpis items={geoSummary.visibility} />
    <div className="detail-two-col wide-left"><DetailSection title="累计收录量明细" subtitle="各平台有效收录结果的每日变化" action={<div className="range-switch">{[7, 30].map((item) => <button type="button" className={range === item ? "active" : ""} key={item} onClick={() => setRange(item)}>近 {item} 天</button>)}</div>}><DetailTrend data={data} range={range} /></DetailSection>
      <DetailSection title="各 AI 平台品牌收录" subtitle="本期共 1,025 次"><DistributionBars items={platformBars} total={1025} /></DetailSection></div>
    <div className="detail-two-col"><DetailSection title="目标词拓展榜 Top 5" subtitle="跨平台去重统计"><div className="detail-ranking">{ranking.map(([name, value], index) => <div key={name}><span className={`rank-badge rank-${index + 1}`}>{index + 1}</span><b>{name}</b><strong>{value}</strong></div>)}</div></DetailSection>
      <DetailSection title="AI 回答证据" subtitle="审核并脱敏的最近回答"><div className="evidence-list">{termRows.slice(0, 4).map((row) => <article key={row[1]}><span><Sparkle size={15} weight="fill" />{row[3]}</span><b>{row[1]}</b><small>{row[5]} · 已完成归属核验</small></article>)}</div></DetailSection></div>
    <DetailSection title="词条收录明细" subtitle="支持按词类型筛选并导出" action={<button className="text-action" type="button" onClick={() => downloadCsv("GEO词条明细.csv", ["目标词", "拓展词", "词类型", "平台", "终端", "更新时间"], rows)}><DownloadSimple size={15} />导出</button>}>
      <FilterChips label="词类型筛选" options={["全部词类型", "搜索词", "问答词", "意图词", "品牌词"]} value={type} onChange={setType} /><DataTable headers={["目标词", "拓展词", "词类型", "发布平台", "终端", "更新时间"]} rows={rows} />
    </DetailSection>
  </div>;
}

function GeoMediaDetail() {
  const [mediaType, setMediaType] = useState("全部媒体");
  const typedRows = useMemo(() => mediaType === "全部媒体" ? articleRows : articleRows.filter((row) => mediaType === "行业媒体" ? ["中国工业网", "制造前沿", "新材料在线", "产业创新网"].includes(row[1]) : ["科技观察", "电子工程专辑"].includes(row[1])), [mediaType]);
  return <div className="detail-sections"><DetailKpis items={geoSummary.media} />
    <div className="detail-two-col"><DetailSection title="发布媒体类型分布" subtitle="按已发布文章统计"><DistributionBars items={[["行业媒体", 13, "#7653e8"], ["科技媒体", 7, "#277ee7"], ["综合媒体", 4, "#18a5a1"]]} total={24} valueLabel="篇" /></DetailSection>
      <DetailSection title="媒体发布排行" subtitle="按发文篇数排序"><DistributionBars items={[["中国工业网", 5, "#7653e8"], ["制造前沿", 4, "#547ee8"], ["科技观察", 4, "#3f9fd8"], ["新材料在线", 3, "#42b4b2"], ["电子工程专辑", 3, "#65b89a"]]} valueLabel="篇" /></DetailSection></div>
    <DetailSection title="最新发文与原文回链" subtitle="按发布时间倒序展示已成功发布文章" action={<button className="text-action" type="button" onClick={() => downloadCsv("GEO发文明细.csv", ["文章标题", "发布媒体", "关联词", "发布时间", "回链状态"], typedRows)}><DownloadSimple size={15} />导出</button>}>
      <FilterChips label="媒体类型筛选" options={["全部媒体", "行业媒体", "科技媒体"]} value={mediaType} onChange={setMediaType} /><DataTable headers={["文章标题", "发布媒体", "关联词", "发布时间", "原文回链"]} rows={typedRows} />
    </DetailSection>
  </div>;
}

function SearchContentDetail() {
  const [type, setType] = useState("全部来源");
  const rows = useMemo(() => type === "全部来源" ? searchContentRows : searchContentRows.filter((row) => row[0] === type), [type]);
  return <div className="detail-sections"><DetailKpis items={floorMetrics.search} />
    <div className="detail-two-col wide-left"><DetailSection title="搜索与内容访问趋势" subtitle="三类流量统一按日统计"><DetailTrend data={floorTrends.search} color="#1f76e8" /></DetailSection>
      <DetailSection title="平台贡献分布" subtitle="搜索与内容平台聚合"><DistributionBars items={[["百度", 3920, "#1769e8"], ["360搜索", 2360, "#24a867"], ["小红书", 926, "#ff2442"], ["抖音", 841, "#22283b"], ["微信", 736, "#07b957"], ["其他内容平台", 1799, "#7d68dc"]]} total={10582} /></DetailSection></div>
    <DetailSection title="搜索与内容平台明细" subtitle="搜索词与内容主题分开统计，避免把曝光量和访问量混用" action={<button className="text-action" type="button" onClick={() => downloadCsv("搜索与内容平台明细.csv", ["类型", "平台", "关键词/内容主题", "数量", "落地位置", "日期"], rows)}><DownloadSimple size={15} />导出</button>}>
      <FilterChips label="来源类型筛选" options={["全部来源", "搜索", "内容"]} value={type} onChange={setType} /><DataTable headers={["类型", "平台", "关键词 / 内容主题", "数量", "落地位置", "日期"]} rows={rows} />
    </DetailSection>
  </div>;
}

function ChannelDetail() {
  const [type, setType] = useState("全部渠道");
  const rows = useMemo(() => type === "全部渠道" ? channelRows : channelRows.filter((row) => row[0] === type), [type]);
  return <div className="detail-sections"><DetailKpis items={floorMetrics.channel} />
    <div className="detail-two-col wide-left"><DetailSection title="承接事件趋势" subtitle="广告点击与官网访问按日汇总"><DetailTrend data={floorTrends.channel} color="#159fca" /></DetailSection>
      <DetailSection title="渠道承接构成" subtitle="数量不直接换算成交"><div className="channel-cards"><article><span><Megaphone size={22} weight="fill" /></span><div><b>搜索广告</b><strong>1,946</strong><small>广告点击事件</small></div></article><article><span><Desktop size={22} weight="fill" /></span><div><b>企业官网</b><strong>549</strong><small>可追踪访问事件</small></div></article><article><span><ChatsCircle size={22} weight="fill" /></span><div><b>留资承接</b><strong>326</strong><small>广告与官网汇总</small></div></article></div></DetailSection></div>
    <DetailSection title="承接渠道明细" subtitle="查看具体广告来源、官网页面和下游留资" action={<button className="text-action" type="button" onClick={() => downloadCsv("承接渠道明细.csv", ["渠道", "来源", "落地位置", "点击/访问", "下游留资", "更新时间"], rows)}><DownloadSimple size={15} />导出</button>}>
      <FilterChips label="承接渠道筛选" options={["全部渠道", "广告", "官网"]} value={type} onChange={setType} /><DataTable headers={["渠道", "来源", "落地位置", "点击 / 访问", "下游留资", "更新时间"]} rows={rows} />
    </DetailSection>
  </div>;
}

function BehaviorDetail() {
  const [type, setType] = useState("全部行为");
  const rows = useMemo(() => type === "全部行为" ? behaviorRows : behaviorRows.filter((row) => row[0] === type), [type]);
  return <div className="detail-sections"><div className="definition-note"><FunnelSimple size={20} weight="fill" /><div><b>最终行为口径</b><span>咨询留资为真实互动事件；电话曝光与地址曝光仅表示信息在 AI、搜索或地图结果中出现，不代表已拨打或已到店。</span></div></div><DetailKpis items={floorMetrics.behavior} />
    <div className="detail-two-col wide-left"><DetailSection title="行为信号趋势" subtitle="按记录发生日期统计"><DetailTrend data={floorTrends.behavior} color="#159c90" /></DetailSection>
      <DetailSection title="行为来源分布" subtitle="可回溯至上游触点"><DistributionBars items={[["官网", 138, "#159fca"], ["广告", 112, "#3479e8"], ["GEO", 96, "#7653e8"], ["搜索", 74, "#4e9cdf"], ["商品卡", 42, "#9a6ce8"]]} total={462} /></DetailSection></div>
    <DetailSection title="最终行为明细" subtitle="来源路径、地区和访客标识均按隐私规则处理" action={<button className="text-action" type="button" onClick={() => downloadCsv("最终行为明细.csv", ["行为类型", "来源路径", "触点", "地区", "访客标识", "时间"], rows)}><DownloadSimple size={15} />导出</button>}>
      <FilterChips label="行为类型筛选" options={["全部行为", "咨询留资", "电话曝光", "地址曝光"]} value={type} onChange={setType} /><DataTable headers={["行为类型", "完整来源路径", "触点", "地区", "访客标识", "时间"]} rows={rows} />
    </DetailSection>
  </div>;
}

function DetailPage({ stage, geoTab, setGeoTab, onBack }) {
  const meta = stageMeta[stage];
  const DetailIcon = meta.icon;
  return <main className="detail-page"><button type="button" className="detail-back" onClick={onBack}><ArrowLeft size={17} weight="bold" />返回数据总览</button>
    <section className={`detail-hero detail-${meta.tone}`}><div className="detail-hero-icon"><DetailIcon size={34} weight="fill" /></div><div><span>阶段 {meta.number} · {meta.subtitle}</span><h1>{meta.title}数据详情</h1><p>{meta.note}。当前统计周期为 2026/09/05—09/11。</p></div><div className="detail-period"><CalendarBlank size={17} /><span>近 7 天</span></div></section>
    {stage === "geo" && <div className="detail-main-tabs" role="tablist" aria-label="GEO详情类型"><button role="tab" className={geoTab === "visibility" ? "active" : ""} aria-selected={geoTab === "visibility"} onClick={() => setGeoTab("visibility")}><Target size={18} weight="fill" />AI可见度分析</button><button role="tab" className={geoTab === "media" ? "active" : ""} aria-selected={geoTab === "media"} onClick={() => setGeoTab("media")}><NewspaperClipping size={18} weight="fill" />发文数据分析</button></div>}
    {stage === "geo" && (geoTab === "visibility" ? <GeoVisibilityDetail /> : <GeoMediaDetail />)}
    {stage === "search" && <SearchContentDetail />}{stage === "channel" && <ChannelDetail />}{stage === "behavior" && <BehaviorDetail />}
  </main>;
}

function parseDetailHash() {
  const match = window.location.hash.match(/^#stage\/(geo|search|channel|behavior)(?:\/(visibility|media))?$/);
  return match ? { stage: match[1], tab: match[2] || "visibility" } : null;
}

function Topbar() {
  return <header className="topbar"><BrandMark /><nav aria-label="后台主导航"><a href="#journey-title">首页</a><a href="#stage-overview">企业知识库</a><a href="#stage-overview">营销知识库</a><a href="#stage-overview">AI创作</a><a className="active" href="#journey-title">数据报告</a></nav><div className="account"><span>澄</span><b>澄川新材</b></div></header>;
}

export function App() {
  const initial = typeof window === "undefined" ? null : parseDetailHash();
  const [detailStage, setDetailStage] = useState(initial?.stage || null);
  const [geoTab, setGeoTabState] = useState(initial?.tab || "visibility");

  useEffect(() => {
    const sync = () => { const current = parseDetailHash(); setDetailStage(current?.stage || null); if (current?.tab) setGeoTabState(current.tab); };
    window.addEventListener("popstate", sync); window.addEventListener("hashchange", sync);
    return () => { window.removeEventListener("popstate", sync); window.removeEventListener("hashchange", sync); };
  }, []);

  const openDetail = (stage, tab = "visibility") => {
    window.history.pushState({ stage, tab }, "", `#stage/${stage}${stage === "geo" ? `/${tab}` : ""}`);
    setDetailStage(stage); setGeoTabState(tab); window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const changeGeoTab = (tab) => { setGeoTabState(tab); window.history.replaceState({ stage: "geo", tab }, "", `#stage/geo/${tab}`); };
  const closeDetail = () => { window.history.pushState({}, "", `${window.location.pathname}#stage-overview`); setDetailStage(null); requestAnimationFrame(() => document.getElementById("stage-overview")?.scrollIntoView({ block: "start" })); };

  return <div className="app-shell"><Topbar />{detailStage ? <DetailPage stage={detailStage} geoTab={geoTab} setGeoTab={changeGeoTab} onBack={closeDetail} /> : <main><RelationshipMap /><StageOverview onOpen={openDetail} /></main>}
    {!detailStage && <a className="back-top" href="#journey-title" aria-label="返回顶部"><ArrowUpRight size={18} weight="bold" /></a>}
  </div>;
}
