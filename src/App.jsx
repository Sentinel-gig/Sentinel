import { useState, useEffect } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#06090F",
  surface: "#0B1120",
  surfaceAlt: "#0E1628",
  border: "#172035",
  borderHi: "#1E2E4A",
  accent: "#2563EB",
  accentBright: "#3B82F6",
  accentGlow: "rgba(37,99,235,0.12)",
  steel: "#6B82A0",
  steelHi: "#8FA3C0",
  text: "#E2E8F2",
  muted: "#7A90AA",
  dim: "#3A506A",
  danger: "#DC2626",
  amber: "#D97706",
  green: "#16A34A",
  white: "#FFFFFF",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${C.bg};color:${C.text};font-family:'IBM Plex Sans',sans-serif;}
  ::-webkit-scrollbar{width:5px;}
  ::-webkit-scrollbar-track{background:${C.bg};}
  ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px;}
  textarea,input{font-family:'IBM Plex Sans',sans-serif;}
  textarea::placeholder,input::placeholder{color:${C.dim};}
`;

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const SEED_STATS = [
  { id: 1, value: "12M+", label: "Gig Workers in India (FY2024-25)", source: "NITI Aayog" },
  { id: 2, value: "90%", label: "Workforce operating informally — outside safety nets", source: "Ministry of Labour" },
  { id: 3, value: "400+", label: "Worker deaths from workplace accidents in India (2024)", source: "IndustriALL" },
  { id: 4, value: "23.5M", label: "Projected gig workers by 2029-30", source: "NITI Aayog" },
  { id: 5, value: "₹0", label: "Average platform compensation to families after on-job fatalities", source: "Field Research" },
  { id: 6, value: "1,109", label: "Avg annual factory deaths (2017–2020) — gig workers not counted", source: "DGFASLI" },
];

const SEED_CASES = [
  { id: 1, city: "Mumbai", title: "Delivery Rider Found Hours After Accident", date: "Mar 2025", desc: "A Swiggy delivery partner met with an accident in Andheri at 11 PM. No platform alert was triggered. His family found out 6 hours later when they called police.", tag: "INCIDENT" },
  { id: 2, city: "Delhi", title: "Zomato Partner Robbed, Platform Unreachable", date: "Jan 2025", desc: "A delivery executive was robbed at knifepoint in South Delhi. He had no emergency protocol. The platform's helpline put him on hold for 22 minutes.", tag: "ROBBERY" },
  { id: 3, city: "Bangalore", title: "Night-Shift Cab Driver Disappears for 14 Hours", date: "Feb 2025", desc: "An Ola driver went off-grid during a late-night pickup in Whitefield. His family had no tracking access. He was found at a hospital — had suffered a cardiac event alone.", tag: "MEDICAL" },
];

const SEED_NEWS = [
  { id: 1, title: "Gig Workers' Strike Reveals Intolerable Working Conditions", source: "The Hindu", date: "Jan 2026", url: "#", summary: "First nationwide collective assertion by gig workers demanding dignity, regulation, and accountability in India's platform economy." },
  { id: 2, title: "Union Budget 2025: Identity Cards & Healthcare for Gig Workers", source: "Drishti IAS", date: "Feb 2025", url: "#", summary: "Union Budget 2025 introduces identity cards and healthcare benefits for gig workers, but enforceable safety standards remain absent." },
  { id: 3, title: "Karnataka Introduces Gig Workers Insurance Scheme", source: "PMC", date: "2024", url: "#", summary: "Karnataka's Platform-Based Gig Workers Bill mandates health, life, and disability insurance — a model other states are yet to follow." },
];

const SEED_BLOGS = [
  {
    id: 1,
    slug: "invisible-workforce",
    tag: "SAFETY",
    title: "India's Invisible Workforce: Why Gig Workers Die Alone",
    date: "May 2025",
    readTime: "6 min read",
    author: "Secured Systems Editorial",
    body: `Every morning, 12 million Indians strap on a helmet, open an app, and disappear into the city. They carry your food. They drive you home. They deliver the package you forgot you ordered.

And when something goes wrong — an accident, a robbery, a medical emergency — they handle it alone.

There is no protocol. No alert. No platform-side response. Just a worker, a phone, and the hope that someone notices.

**The Numbers Don't Lie**

India reported over 400 worker deaths from workplace accidents in 2024 alone. These are the ones that got counted — formal sector workers in registered facilities. Gig workers, operating outside these systems, don't appear in the data at all.

The Ministry of Labour's statistics stop at factory gates. The delivery executive who collapsed on a highway in Pune, the cab driver who was carjacked outside Gurugram — they're statistical ghosts.

**Platforms Know. Platforms Don't Act.**

Every major gig platform has real-time GPS data on their workers. They know where each worker is, at every minute. They have the infrastructure to detect an anomaly — a worker stationary for too long, a route deviation, a sudden stop.

They choose not to build safety systems on top of this data because safety costs money. Liability costs more. So they've made a calculated decision: let workers self-manage risk.

**What Sentinel Changes**

Sentinel runs passively. Workers don't have to press a button or remember to check in. The system watches quietly — and only surfaces when something looks wrong.

A peer-based assistance mesh means the nearest verified gig worker gets a nudge when an alert triggers. No central call centre. No 22-minute holds. Real people, close by, who understand the job.

This is what infrastructure looks like when you build it for the people who actually need it — not for the quarterly report.`,
  },
  {
    id: 2,
    slug: "tier2-risk",
    tag: "RESEARCH",
    title: "Tier-2 Cities: Where Gig Worker Risk Is Highest and Visibility Lowest",
    date: "Apr 2025",
    readTime: "5 min read",
    author: "Secured Systems Editorial",
    body: `Kanpur. Lucknow. Patna. Coimbatore. These cities don't make the safety headlines. They should.

As quick commerce and food delivery platforms expand aggressively into India's tier-2 cities, they're replicating metro-level operations without metro-level infrastructure. The result is a gig workforce operating in cities with weaker emergency response, fewer hospitals per capita, and virtually no platform safety presence.

**The Expansion Playbook**

Platforms like Blinkit and Zepto reported a 120% surge in orders during the 2025 festive season, driven largely by tier-2 expansion. This is extraordinary growth — but it's worker growth without welfare growth.

In Mumbai, a delivery worker in distress is 15 minutes from a government hospital. In Kanpur, that number can triple. Response time in an emergency isn't just a statistic — it's survival.

**What the Data Shows**

Of India's 12 million gig workers, the metro-focused data dramatically underrepresents tier-2 reality. Bangalore has ~234,000 app-based gig workers. Delhi has ~225,000. Mumbai, ~133,000. These numbers are tracked, studied, cited.

Kanpur's gig workforce? No published estimate. No safety study. No platform disclosure.

Invisibility is the most dangerous condition a worker can be in.

**Sentinel's Tier-2 Pilot**

Kanpur is one of Sentinel's four pilot cities precisely because of this gap. The real validation of any safety system happens in the city where conditions are hardest — not where it's easiest to look good.

Our tier-2 data will become the evidence base for a category that currently has none.`,
  },
];

const SENTINEL_METRICS = [
  { value: "200", label: "Downloads", icon: "↓" },
  { value: "4", label: "Cities Targeted", icon: "◎" },
  { value: "100", label: "Pilot Workers Onboarded", icon: "◈" },
  { value: "50", label: "Real-time Alerts Triggered", icon: "⚡" },
  { value: "<10 min", label: "Theoretical Response Time", icon: "⏱" },
  { value: "2025", label: "Founded", icon: "◆" },
];

const CITY_DATA = [
  { city: "Mumbai", workers: "133,000+", status: "Active Pilot" },
  { city: "Delhi", workers: "225,000+", status: "Active Pilot" },
  { city: "Bangalore", workers: "234,000+", status: "Active Pilot" },
  { city: "Kanpur", workers: "Tier-2 Validation", status: "Active Pilot" },
];

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────
async function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
async function saveData(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Tag({ children, color = C.accent }) {
  return (
    <span style={{
      fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px",
      letterSpacing: "0.15em", textTransform: "uppercase",
      color, background: `${color}18`,
      border: `1px solid ${color}33`,
      padding: "3px 8px", borderRadius: "2px",
    }}>{children}</span>
  );
}

function Btn({ children, onClick, variant = "primary", small, style = {} }) {
  const base = {
    border: "none", borderRadius: "5px", cursor: "pointer",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontWeight: 500, letterSpacing: "0.03em",
    transition: "all 0.15s",
    padding: small ? "7px 16px" : "11px 24px",
    fontSize: small ? "12px" : "13px",
    ...style,
  };
  if (variant === "primary") return <button onClick={onClick} style={{ ...base, background: `linear-gradient(135deg, ${C.accent}, #1D4ED8)`, color: C.white }}>{children}</button>;
  if (variant === "ghost") return <button onClick={onClick} style={{ ...base, background: "none", border: `1px solid ${C.borderHi}`, color: C.steelHi }}>{children}</button>;
  if (variant === "danger") return <button onClick={onClick} style={{ ...base, background: `${C.danger}22`, border: `1px solid ${C.danger}44`, color: C.danger }}>{children}</button>;
}

function Input({ value, onChange, placeholder, multiline, rows = 3, label }) {
  const shared = {
    width: "100%", background: C.surface,
    border: `1px solid ${C.border}`, borderRadius: "6px",
    padding: "10px 14px", color: C.text,
    fontSize: "13px", lineHeight: 1.6, outline: "none",
    transition: "border-color 0.15s",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {label && <label style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</label>}
      {multiline
        ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
            style={{ ...shared, resize: "vertical" }}
            onFocus={e => e.target.style.borderColor = C.accent}
            onBlur={e => e.target.style.borderColor = C.border} />
        : <input value={value} onChange={onChange} placeholder={placeholder}
            style={{ ...shared }}
            onFocus={e => e.target.style.borderColor = C.accent}
            onBlur={e => e.target.style.borderColor = C.border} />
      }
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(6,9,15,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s", padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px",
    }}>
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "30px", height: "30px", background: "transparent" }>
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAMgAyADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8Q6KKK9A5wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK7/9nT9lj9oz9rjx2Php+zR8GPEHjXW/L8yay0HT2m+zx5x5kz/cgjzxvkZVzxmgDgKK+67f/g2k/wCC2tzAtxH+xO4V1yBJ8RPDiN+KtqII+hFP/wCIZ3/gtx/0ZT/5kjw3/wDLGp54dx2Z8I0V93f8Qzv/AAW4/wCjKf8AzJHhv/5Y0f8AEM7/AMFuP+jKf/MkeG//AJY0c8O4WZ8I0V91XX/BtL/wW0tLd7mX9ieQqi5YRfEPw47EeyrqJJPsBXyX8ff2b/j1+yz8QZ/hV+0X8I9e8GeIbdBI2ma/pz27yRkkCWMsNssZIOJELKcHBNNSi9mFmjiaKKKYgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+yX/glF+wB8M/+Cc/7GPhP4JeDfDtrDr1xpdvf+O9ZSECfVdXkiDTySP1KIxMcanhI0Udck/xtV/dxWFduyRpTCiiiuY0CiiigAr5T/wCCxX/BN/4a/wDBSb9jLxL8NNd8OWzeM9E0y51L4da95I+0afqaRlkiD9RDOUWKVOhVg2N0aFfqyimm07oNz+Eeiiiu85wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv7uK/hHr+7iuev0NKfUKKKK5zQKKKKACiiigD+EeiiivQOcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/u4r+Eev7uK56/Q0p9QooornNAooooAKKKKAP4R6KKK9A5wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv7uK/hHr+7iuev0NKfUKKKK5zQKKKKACiiigD+EeiiivQOcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/u4r+Eev7uK56/Q0p9QooornNAooooAKKKKAP4R6KKK9A5wr6z+Af/AAQu/wCCsv7TPgu1+Inwj/Yr8Rz6NfRCWxvdd1Cx0YXMRGVkjXUbiBpEI5DqCpByCRX0t/wao/sAfDP9r39s7xH8bfjL4dtda0H4P6XZ39lo17CJIJ9Xu5ZFs5JUPDpEtvcSBTx5ixk8KQf6b6xqVeV2RcY3Vz+TX/iGd/4Lcf8ARlP/AJkjw3/8saP+IZ3/AILcf9GU/wDmSPDf/wAsa/rKorP28yuRH8mv/EM7/wAFuP8Aoyn/AMyR4b/+WNH/ABDO/wDBbj/oyn/zJHhv/wCWNf1lUUe3mHIj+PD9o7/giP8A8FUv2TvA118S/jj+xt4isNBsYjLqGq6PfWWsRWcQGTJMdOnn8lB3d8KO5r5Wr+7d0SRDHIoZWGGUjIIr+Xn/AIOgv+CcXw4/YZ/bP0b4n/BDw9b6L4O+Lmm3WpwaFZxCO307VLaRFvY4EHCQsJ7eUIMBWmdVAVVA0p1eZ2ZMoWVz8zqKKK2ICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/wCDKD/m5f8A7kz/ANztfu5X4R/8GUH/ADcv/wByZ/7na/dyuOr/ABGbQ+EKKKKzKCiiigAr8I/+D1//AJto/wC5z/8AcFX7uV+Ef/B6/wD820f9zn/7gq0pfxETP4T8I6KKK7DEKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv7uK/hHr+7iuev0NKfUKKKK5zQKKKKACiiigD+EeiiivQOc/dz/gyg/wCbl/8AuTP/AHO1+7lfhH/wZQf83L/9yZ/7na/dyuOr/EZtD4QooorMoKKKKACvwj/4PX/+baP+5z/9wVfu5X4R/wDB6/8A820f9zn/AO4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/4MoP+bl/+5M/9ztfu5X4R/wDBlB/zcv8A9yZ/7na/dyuOr/EZtD4QooorMoKKKKACvwj/AOD1/wD5to/7nP8A9wVfu5X4R/8AB6//AM20f9zn/wC4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/4MoP+bl/+5M/9ztfu5X4R/8ABlB/zcv/ANyZ/wC52v3crjq/xGbQ+EKKKKzKCiiigAr8I/8Ag9f/AObaP+5z/wDcFX7uV+Ef/B6//wA20f8Ac5/+4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/wCDKD/m5f8A7kz/ANztfu5X4R/8GUH/ADcv/wByZ/7na/dyuOr/ABGbQ+EKKKKzKCiiigAr8I/+D1//AJto/wC5z/8AcFX7uV+Ef/B6/wD820f9zn/7gq0pfxETP4T8I6KKK7DEKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv7uK/hHr+7iuev0NKfUKKKK5zQKKKKACiiigD+EeiiivQOc/dz/gyg/wCbl/8AuTP/AHO1+7lfhH/wZQf83L/9yZ/7na/dyuOr/EZtD4QooorMoKKKKACvwj/4PX/+baP+5z/9wVfu5X4R/wDB6/8A820f9zn/AO4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/4MoP+bl/+5M/9ztfu5X4R/wDBlB/zcv8A9yZ/7na/dyuOr/EZtD4QooorMoKKKKACvwj/AOD1/wD5to/7nP8A9wVfu5X4R/8AB6//AM20f9zn/wC4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/4MoP+bl/+5M/9ztfu5X4R/8ABlB/zcv/ANyZ/wC52v3crjq/xGbQ+EKKKKzKCiiigAr8I/8Ag9f/AObaP+5z/wDcFX7uV+Ef/B6//wA20f8Ac5/+4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/sM/4I7/8ABSD4af8ABSb9jPw38TNB8R2reMtE0y2034i6B5w+0afqaRhXlKdRDOUaWJ+hViudyOFwrp2TNKZ9WUUUVzGgUUUUAFFFfNf/AAVg/wCCgHwz/wCCc/7GHiz41+MvEdtBr9zpVxYeA9GaUefquryRFYEjTqURmEkjDhI0Y9cAtJt2QH8bdFFFd5zn7uf8GUH/ADcv/wByZ/7na/dyv5eP+DXz/go78N/2Gf2zta+F/wAcPENtovg74uaba6ZNrt5KI7fTtUtpHayknc8JCwnuIi5wFaZGYhVYj+oZHSRBJG4ZWGVYHII9a5KyambQ+EWiiisigooooAK/CP8A4PX/APm2j/uc/wD3BV+7lfzH/wDB1Z/wUA+Gf7X/AO2f4d+CnwZ8R22t6B8INKvLC81mylEkFxq91LG14kTrw6Rrb28ZYceYkgGQATrRTcyZ/CflvRRRXWYhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV2vwD/aP+PX7LPxBg+Kv7Onxc17wZ4ht0Ma6poGovbyPGSCYpAp2yxkgZjcMpwMg1xVFAH3Va/8HLP/AAW0s7dLWL9tiQrGuFMvw98OOxHuzacST7k1J/xExf8ABbj/AKPW/wDMb+G//ldXwjRU8kOw7s+7v+ImL/gtx/0et/5jfw3/APK6j/iJi/4Lcf8AR63/AJjfw3/8rq+EaKOSHYLs+67j/g5b/wCC2t1A9vJ+2w4V1wTH8PPDiN+DLpwI+oNfKX7RP7Uv7Rf7W3jtviZ+0t8Z/EHjXW/L8uK917UXm+zx5z5cKH5IY887I1Vc84rgaKajFbILthRRRTEFfVP7OH/Bbf8A4Ko/sm+BrX4afA39snxFYaDYxCLT9K1ixstYhs4gMCOEahBP5KDsibVHYV8rUUmk9w2Pu7/iJi/4Lcf9Hrf+Y38N/wDyuo/4iYv+C3H/AEet/wCY38N//K6vhGilyQ7Duz7u/wCImL/gtx/0et/5jfw3/wDK6j/iJi/4Lcf9Hrf+Y38N/wDyur4Roo5Idguz6y+Pv/Bc/wD4KyftNeC7r4d/F39tTxHPo19EYr6x0KwsdGW5iIw0cjadbwNIhHBRiVIOCCK+TaKKaSWwrthRRRTAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9k=" alt="Sentinel" style={{ width: "32px", height: "32px", borderRadius: "6px", objectFit: "cover" }} />
        </div>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 600, color: C.text, letterSpacing: "0.04em" }}>SecuredSystems<span style={{ color: C.accentBright, fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>.in</span></span>
      </button>
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {[["home", "Awareness"], ["sentinel", "Sentinel"], ["blogs", "Blog"], ["about", "About"]].map(([p, label]) => (
          <button key={p} onClick={() => setPage(p)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: page === p ? C.accentBright : C.steel,
            borderBottom: page === p ? `1px solid ${C.accentBright}` : "1px solid transparent",
            paddingBottom: "2px", transition: "color 0.15s",
          }}>{label}</button>
        ))}
        <Btn small onClick={() => window.open('/admin', '_blank')}>Admin ↗</Btn>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ stats, cases, news, blogs, setPage, setActiveBlog }) {
  return (
    <div style={{ paddingTop: "60px" }}>
      {/* Hero */}
      <div style={{
        minHeight: "92vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "80px 48px 60px",
        position: "relative", overflow: "hidden",
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.accentGlow}, transparent)`,
      }}>
        <div style={{ marginBottom: "18px" }}>
          <Tag>// The Gig Worker Safety Crisis — India</Tag>
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(38px, 6.5vw, 78px)",
          fontWeight: 700, lineHeight: 1.08,
          color: C.text, maxWidth: "860px", marginBottom: "22px",
          letterSpacing: "-0.01em",
        }}>
          Millions Work.<br />
          <span style={{ color: C.accentBright }}>None Are Protected.</span>
        </h1>
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "17px", color: C.muted,
          maxWidth: "500px", lineHeight: 1.75, marginBottom: "40px",
        }}>
          India has 12 million gig workers. Platforms track their every move — but build zero safety infrastructure around them. We're here to fix that.
        </p>
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
          <Btn onClick={() => setPage("sentinel")}>See Sentinel →</Btn>
          <Btn variant="ghost" onClick={() => document.getElementById("awareness")?.scrollIntoView({ behavior: "smooth" })}>View the Crisis ↓</Btn>
        </div>

        {/* Stat strip */}
        <div style={{
          display: "flex", marginTop: "72px",
          border: `1px solid ${C.border}`, borderRadius: "8px",
          background: C.surface, overflow: "hidden", flexWrap: "wrap",
        }}>
          {stats.slice(0, 4).map((s, i) => (
            <div key={s.id} style={{
              padding: "18px 28px", textAlign: "center",
              borderRight: i < 3 ? `1px solid ${C.border}` : "none",
              minWidth: "140px",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 700, color: C.accentBright }}>{s.value}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, marginTop: "3px", letterSpacing: "0.05em" }}>{s.label.split("—")[0].trim()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Awareness Stats */}
      <section id="awareness" style={{ padding: "80px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// Data</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, color: C.text, marginBottom: "40px", lineHeight: 1.15 }}>
          The Numbers That<br /><span style={{ color: C.accentBright }}>Don't Lie</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
          {stats.map(s => (
            <div key={s.id} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "24px 22px",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "34px", fontWeight: 700, color: C.accentBright, marginBottom: "6px" }}>{s.value}</div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.text, marginBottom: "8px", lineHeight: 1.4 }}>{s.label}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, letterSpacing: "0.08em" }}>Source: {s.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cases */}
      <section style={{ padding: "0 48px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag color={C.danger}>// Documented Cases</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, color: C.text, marginBottom: "32px", lineHeight: 1.15 }}>
          Real Workers.<br /><span style={{ color: C.danger }}>Real Failures.</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {cases.map(c => (
            <div key={c.id} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${C.danger}`,
              borderRadius: "8px", padding: "22px 24px",
              display: "flex", gap: "20px", flexWrap: "wrap",
            }}>
              <div style={{ minWidth: "100px" }}>
                <Tag color={C.danger}>{c.tag}</Tag>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, marginTop: "8px" }}>{c.city} · {c.date}</div>
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 600, color: C.text, marginBottom: "6px" }}>{c.title}</div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.muted, lineHeight: 1.65 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section style={{ padding: "0 48px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag color={C.amber}>// Press & Coverage</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, color: C.text, marginBottom: "32px", lineHeight: 1.15 }}>
          The World Is<br /><span style={{ color: C.amber }}>Starting to Notice</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
          {news.map(n => (
            <div key={n.id} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "24px 22px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.amber + "66"}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <Tag color={C.amber}>{n.source}</Tag>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim }}>{n.date}</span>
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 600, color: C.text, marginBottom: "10px", lineHeight: 1.35 }}>{n.title}</div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: C.muted, lineHeight: 1.6 }}>{n.summary}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section style={{ padding: "0 48px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ marginBottom: "10px" }}><Tag>// Latest from the Blog</Tag></div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, color: C.text, lineHeight: 1.15 }}>Raising Awareness.<br /><span style={{ color: C.accentBright }}>One Story at a Time.</span></h2>
          </div>
          <Btn variant="ghost" small onClick={() => setPage("blogs")}>All Posts →</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
          {blogs.slice(0, 3).map(b => (
            <div key={b.id} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "26px 22px", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => { setActiveBlog(b); setPage("blog"); }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <Tag>{b.tag}</Tag>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim }}>{b.readTime}</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "19px", fontWeight: 600, color: C.text, lineHeight: 1.35, marginBottom: "10px" }}>{b.title}</h3>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim }}>{b.date} · {b.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section style={{ padding: "0 48px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// About Us</Tag></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          {/* Left — mission */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, color: C.text, lineHeight: 1.15, marginBottom: "20px" }}>
              Built by People Who<br /><span style={{ color: C.accentBright }}>Refuse to Look Away</span>
            </h2>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", color: C.muted, lineHeight: 1.8, marginBottom: "16px" }}>
              Secured Systems was founded in 2025 with one conviction: that the people powering India's gig economy deserve the same safety infrastructure as anyone else in the workforce.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", color: C.muted, lineHeight: 1.8, marginBottom: "28px" }}>
              We're not building another app for workers to manage. We're building the passive layer underneath — intelligent, invisible, always on. Starting with Sentinel, and expanding into hardware and direct-to-worker services.
            </p>
            <div style={{ display: "flex", gap: "32px" }}>
              {[["2025", "Founded"], ["4", "Pilot Cities"], ["₹0", "VC Dependency"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 700, color: C.accentBright }}>{v}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, letterSpacing: "0.08em", marginTop: "3px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — team + values */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Team cards */}
            {[
              { name: "Arav", role: "Co-Founder & CEO", bio: "BCA student, AI/ML practitioner, FMCG operator. Building at the intersection of technology and underserved markets." },
              { name: "Ashutosh Trivedi", role: "Co-Founder & CTO", bio: "Technology lead and strategy architect. Focused on turning Sentinel's passive intelligence layer into the definitive safety standard for India's gig platforms." },
            ].map((m) => (
              <div key={m.name} style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: "8px", padding: "20px 22px",
                display: "flex", gap: "16px", alignItems: "flex-start",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHi}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg, ${C.accent}55, #1D4ED855)`,
                  border: `1px solid ${C.accent}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 700, color: C.accentBright,
                }}>
                  {m.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: C.text }}>{m.name}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.accent, letterSpacing: "0.08em", marginBottom: "6px" }}>{m.role}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: C.muted, lineHeight: 1.6 }}>{m.bio}</div>
                </div>
              </div>
            ))}

            {/* Values strip */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "20px 22px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, letterSpacing: "0.12em", marginBottom: "14px" }}>WHAT WE STAND FOR</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  ["Passive First",    "Safety should require zero effort from the worker."],
                  ["Peer Before Platform", "Real people nearby beat a call centre every time."],
                  ["Tier-2 Honest",    "Real validation happens where it's hardest, not easiest."],
                ].map(([title, desc]) => (
                  <div key={title} style={{ display: "flex", gap: "10px" }}>
                    <span style={{ color: C.accentBright, fontSize: "13px", marginTop: "1px", flexShrink: 0 }}>▸</span>
                    <div>
                      <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: C.text }}>{title} — </span>
                      <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.muted }}>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 48px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: C.dim }}>© 2025 SecuredSystems.in — Secured Systems Pvt. Ltd.</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, letterSpacing: "0.1em" }}>SAFETY INTELLIGENCE · INDIA</span>
      </footer>
    </div>
  );
}

// ─── BLOG LIST PAGE ───────────────────────────────────────────────────────────
function BlogsPage({ blogs, setPage, setActiveBlog }) {
  return (
    <div style={{ paddingTop: "100px", maxWidth: "900px", margin: "0 auto", padding: "100px 48px 80px" }}>
      <div style={{ marginBottom: "12px" }}><Tag>// Blog</Tag></div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, color: C.text, marginBottom: "12px", lineHeight: 1.1 }}>
        Intelligence &<br /><span style={{ color: C.accentBright }}>Awareness</span>
      </h1>
      <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", color: C.muted, marginBottom: "48px", lineHeight: 1.7 }}>
        Research, field reports, and analysis on gig worker safety in India.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {blogs.map(b => (
          <div key={b.id} style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: "8px", padding: "26px 28px", cursor: "pointer",
            display: "flex", gap: "24px", alignItems: "flex-start",
            transition: "all 0.2s",
          }}
          onClick={() => { setActiveBlog(b); setPage("blog"); }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.background = C.surfaceAlt; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}>
            <div style={{ minWidth: "80px" }}>
              <Tag>{b.tag}</Tag>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, marginTop: "8px" }}>{b.date}</div>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 600, color: C.text, marginBottom: "6px", lineHeight: 1.3 }}>{b.title}</h3>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: C.muted }}>{b.readTime} · {b.author}</div>
            </div>
            <span style={{ color: C.accentBright, fontSize: "18px", marginTop: "2px" }}>→</span>
          </div>
        ))}
        {blogs.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: C.dim, fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>
            No blogs published yet. Use the admin panel to add content.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SINGLE BLOG PAGE ─────────────────────────────────────────────────────────
function BlogPage({ blog, setPage }) {
  const formatted = (blog.body || "").split("\n\n").map((para, i) => {
    if (para.startsWith("**") && para.endsWith("**")) {
      return <h3 key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 700, color: C.text, margin: "32px 0 14px" }}>{para.replace(/\*\*/g, "")}</h3>;
    }
    return <p key={i} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "16px", color: C.muted, lineHeight: 1.85, marginBottom: "18px" }}>{para}</p>;
  });
  return (
    <div style={{ paddingTop: "60px", maxWidth: "720px", margin: "0 auto", padding: "100px 48px 80px" }}>
      <button onClick={() => setPage("blogs")} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "32px", display: "flex", alignItems: "center", gap: "6px" }}>
        ← BACK TO BLOG
      </button>
      <div style={{ marginBottom: "14px" }}><Tag>{blog.tag}</Tag></div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 700, color: C.text, lineHeight: 1.12, marginBottom: "18px" }}>{blog.title}</h1>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: C.dim, marginBottom: "48px", paddingBottom: "28px", borderBottom: `1px solid ${C.border}` }}>
        {blog.date} · {blog.readTime} · {blog.author}
      </div>
      <div>{formatted}</div>
    </div>
  );
}

// ─── SENTINEL PAGE ────────────────────────────────────────────────────────────
function SentinelPage() {
  const roadmap = [
    { phase: "Phase 1 — Now", label: "Sentinel App", desc: "Passive safety intelligence for gig workers. No active input. Always on.", active: true },
    { phase: "Phase 2 — 2026", label: "Watch Interface", desc: "Hardware wearable layer with biometric alerts and direct peer pings.", active: false },
    { phase: "Phase 3 — 2027", label: "B2C Platform", desc: "Direct-to-worker safety subscription with insurance integration.", active: false },
  ];
  return (
    <div style={{ paddingTop: "60px" }}>
      <div style={{
        padding: "80px 48px 60px", textAlign: "center",
        background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${C.accentGlow}, transparent)`,
      }}>
        <div style={{ marginBottom: "16px" }}><Tag>// Sentinel by Secured Systems</Tag></div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 6vw, 68px)", fontWeight: 700, color: C.text, lineHeight: 1.1, marginBottom: "20px" }}>
          Passive Safety.<br /><span style={{ color: C.accentBright }}>Always On.</span>
        </h1>
        <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "16px", color: C.muted, maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.75 }}>
          No button to press. No check-in to remember. Sentinel watches quietly — and acts when it matters.
        </p>
        <Btn onClick={() => document.getElementById("pilot-modal").style.display = "flex"}>Join the Pilot →</Btn>
      </div>

      {/* Metrics */}
      <section style={{ padding: "60px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// Live Adoption Metrics</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: C.text, marginBottom: "28px" }}>Where We Are Today</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "12px" }}>
          {SENTINEL_METRICS.map((m, i) => (
            <div key={i} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "22px 18px", textAlign: "center",
            }}>
              <div style={{ fontSize: "22px", marginBottom: "8px", color: C.accentBright }}>{m.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 700, color: C.accentBright, marginBottom: "4px" }}>{m.value}</div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: C.muted }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cities */}
      <section style={{ padding: "0 48px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// Target Cities</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: C.text, marginBottom: "24px" }}>Pilot Coverage</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
          {CITY_DATA.map((c, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "20px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 700, color: C.text }}>{c.city}</span>
                <Tag color={C.green}>{c.status}</Tag>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: C.muted }}>{c.workers} addressable workers</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "0 48px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// How Sentinel Works</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: C.text, marginBottom: "28px" }}>Passive. Peer-Backed. Precise.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
          {[
            { n: "01", title: "Passive Monitoring", desc: "Sentinel runs silently in the background. Motion, location, and behavioral signals are analyzed continuously — no worker input needed." },
            { n: "02", title: "Anomaly Detection", desc: "When patterns deviate — unusual stillness, route deviation, location anomaly — the system flags it within the theoretical 10-minute window." },
            { n: "03", title: "Peer Mesh Alert", desc: "The nearest verified gig worker gets a peer ping. No call centre. No hold music. Real people, close by, who know the job." },
            { n: "04", title: "Incident Log", desc: "Every alert is logged, timestamped, and stored. Building India's first gig worker safety incident database from the ground up." },
          ].map((s, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "26px 22px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: C.accentBright, marginBottom: "12px", letterSpacing: "0.1em" }}>{s.n}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 700, color: C.text, marginBottom: "8px" }}>{s.title}</h3>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.muted, lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Roadmap */}
      <section style={{ padding: "0 48px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// Product Roadmap</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: C.text, marginBottom: "28px" }}>Sentinel Is Phase One</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {roadmap.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40px" }}>
                <div style={{
                  width: "14px", height: "14px", borderRadius: "50%",
                  background: r.active ? C.accentBright : C.border,
                  border: `2px solid ${r.active ? C.accentBright : C.dim}`,
                  boxShadow: r.active ? `0 0 12px ${C.accentBright}` : "none",
                  marginTop: "5px", flexShrink: 0,
                }} />
                {i < roadmap.length - 1 && <div style={{ width: "1px", height: "52px", background: C.border }} />}
              </div>
              <div style={{ paddingBottom: "28px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: r.active ? C.accentBright : C.dim, letterSpacing: "0.1em", marginBottom: "4px" }}>{r.phase}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 700, color: r.active ? C.text : C.steel, marginBottom: "4px" }}>{r.label}</div>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.muted, lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investor CTA */}
      <section style={{ padding: "0 48px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          background: `linear-gradient(135deg, #0C1830, #0A1420)`,
          border: `1px solid ${C.accent}44`,
          borderRadius: "10px", padding: "40px 44px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px",
        }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.accent, letterSpacing: "0.15em", marginBottom: "8px" }}>PRE-SEED OPEN</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 700, color: C.text, marginBottom: "6px" }}>Backing Sentinel?</div>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "14px", color: C.muted }}>₹25–30L pre-seed · 10–12% equity · Limited slots</div>
          </div>
          <a href="mailto:business@sentinelco.in" style={{
            background: `linear-gradient(135deg, ${C.accent}, #1D4ED8)`,
            borderRadius: "6px", padding: "12px 26px",
            fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px",
            color: C.white, fontWeight: 600, textDecoration: "none",
          }}>business@sentinelco.in →</a>
        </div>
      </section>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPage({ stats, setStats, cases, setCases, news, setNews, blogs, setBlogs }) {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState("blogs");
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Blog form
  const [bf, setBf] = useState({ tag: "SAFETY", title: "", date: "", readTime: "", author: "Secured Systems Editorial", body: "" });
  // Stat form
  const [sf, setSf] = useState({ value: "", label: "", source: "" });
  // Case form
  const [cf, setCf] = useState({ city: "", title: "", date: "", desc: "", tag: "INCIDENT" });
  // News form
  const [nf, setNf] = useState({ title: "", source: "", date: "", url: "", summary: "" });

  const checkPw = () => { if (pw === "arav@2134") setAuth(true); else alert("Wrong password."); };

  const addBlog = async () => {
    if (!bf.title || !bf.body) return;
    const slug = bf.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50);
    const updated = [...blogs, { ...bf, id: Date.now(), slug }];
    setBlogs(updated); await saveData("blogs", updated);
    setBf({ tag: "SAFETY", title: "", date: "", readTime: "", author: "Secured Systems Editorial", body: "" });
    setAiResult(null);
  };

  const addStat = async () => {
    if (!sf.value || !sf.label) return;
    const updated = [...stats, { ...sf, id: Date.now() }];
    setStats(updated); await saveData("stats", updated);
    setSf({ value: "", label: "", source: "" });
  };

  const addCase = async () => {
    if (!cf.title || !cf.desc) return;
    const updated = [...cases, { ...cf, id: Date.now() }];
    setCases(updated); await saveData("cases", updated);
    setCf({ city: "", title: "", date: "", desc: "", tag: "INCIDENT" });
  };

  const addNews = async () => {
    if (!nf.title || !nf.source) return;
    const updated = [...news, { ...nf, id: Date.now() }];
    setNews(updated); await saveData("news", updated);
    setNf({ title: "", source: "", date: "", url: "", summary: "" });
  };

  const deleteBlog = async (id) => {
    const updated = blogs.filter(b => b.id !== id);
    setBlogs(updated); await saveData("blogs", updated);
  };
  const deleteStat = async (id) => { const u = stats.filter(s => s.id !== id); setStats(u); await saveData("stats", u); };
  const deleteCase = async (id) => { const u = cases.filter(c => c.id !== id); setCases(u); await saveData("cases", u); };
  const deleteNews = async (id) => { const u = news.filter(n => n.id !== id); setNews(u); await saveData("news", u); };

  const runAI = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true); setAiResult(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a content strategist for SecuredSystems.in — a gig worker safety platform in India. Given a raw blog idea, return ONLY a valid JSON object:
{"refined_title":"...","hook":"...","awareness_angles":["...","...","..."],"related_ideas":["...","...","..."],"cta":"...","suggested_tag":"SAFETY or RESEARCH or POLICY or TECH"}
No markdown, no preamble, just the JSON.`,
          messages: [{ role: "user", content: aiInput }],
        }),
      });
      const data = await res.json();
      const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setAiResult(parsed);
      setBf(prev => ({ ...prev, title: parsed.refined_title, tag: parsed.suggested_tag || "SAFETY" }));
    } catch { setAiResult({ error: "AI unavailable. Fill form manually." }); }
    setAiLoading(false);
  };

  if (!auth) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "40px" }}>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "40px 48px", textAlign: "center", minWidth: "320px" }}>
        <div style={{ marginBottom: "8px" }}><Tag>// Admin Access</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", color: C.text, margin: "12px 0 24px" }}>SecuredSystems CMS</h2>
        <Input value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter admin password" label="Password" />
        <div style={{ marginTop: "16px" }}>
          <Btn onClick={checkPw} style={{ width: "100%" }}>Unlock Panel →</Btn>
        </div>
      </div>
    </div>
  );

  const TABS = [["blogs", "Blogs"], ["stats", "Stats"], ["cases", "Cases"], ["news", "News"]];

  return (
    <div style={{ paddingTop: "80px", maxWidth: "960px", margin: "0 auto", padding: "80px 48px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <Tag color={C.green}>// Admin Panel — Authenticated</Tag>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 700, color: C.text, marginTop: "10px" }}>Content Management</h1>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "32px", borderBottom: `1px solid ${C.border}`, paddingBottom: "0" }}>
        {TABS.map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: tab === key ? C.accentBright : C.muted,
            borderBottom: tab === key ? `2px solid ${C.accentBright}` : "2px solid transparent",
            padding: "8px 14px", marginBottom: "-1px", transition: "color 0.15s",
          }}>{label} ({key === "blogs" ? blogs.length : key === "stats" ? stats.length : key === "cases" ? cases.length : news.length})</button>
        ))}
      </div>

      {/* BLOGS TAB */}
      {tab === "blogs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* AI Suggester */}
          <div style={{ background: C.surface, border: `1px solid ${C.borderHi}`, borderRadius: "8px", padding: "28px" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.accentBright, letterSpacing: "0.12em", marginBottom: "12px" }}>⚡ AI CONTENT ENGINE</div>
            <Input value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder="Drop a raw idea, topic, or angle..." label="Raw Blog Idea" multiline rows={2} />
            <div style={{ marginTop: "12px" }}>
              <Btn small onClick={runAI} style={{ opacity: aiLoading ? 0.5 : 1 }}>{aiLoading ? "Analyzing..." : "Generate Strategy →"}</Btn>
            </div>
            {aiResult && !aiResult.error && (
              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ background: C.surfaceAlt, borderRadius: "6px", padding: "14px 16px" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.accent, marginBottom: "4px", letterSpacing: "0.1em" }}>TITLE ↳ auto-filled below</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: C.text }}>{aiResult.refined_title}</div>
                </div>
                <div style={{ background: C.surfaceAlt, borderRadius: "6px", padding: "14px 16px", borderLeft: `2px solid ${C.accentBright}` }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.accent, marginBottom: "4px", letterSpacing: "0.1em" }}>OPENING HOOK</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.steelHi, fontStyle: "italic", lineHeight: 1.6 }}>"{aiResult.hook}"</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ background: C.surfaceAlt, borderRadius: "6px", padding: "14px 16px" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.accent, letterSpacing: "0.1em", marginBottom: "8px" }}>AWARENESS ANGLES</div>
                    {aiResult.awareness_angles?.map((a, i) => <div key={i} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: C.muted, marginBottom: "5px" }}>▸ {a}</div>)}
                  </div>
                  <div style={{ background: C.surfaceAlt, borderRadius: "6px", padding: "14px 16px" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.accent, letterSpacing: "0.1em", marginBottom: "8px" }}>WRITE NEXT</div>
                    {aiResult.related_ideas?.map((a, i) => <div key={i} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: C.muted, marginBottom: "5px" }}>→ {a}</div>)}
                  </div>
                </div>
                <div style={{ background: `${C.accent}18`, border: `1px solid ${C.accent}33`, borderRadius: "6px", padding: "10px 14px" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.accent, letterSpacing: "0.08em" }}>CTA: </span>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.text, fontWeight: 500 }}>{aiResult.cta}</span>
                </div>
              </div>
            )}
            {aiResult?.error && <div style={{ marginTop: "12px", color: C.danger, fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace" }}>{aiResult.error}</div>}
          </div>

          {/* Blog Form */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "28px" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.muted, letterSpacing: "0.12em", marginBottom: "16px" }}>+ NEW BLOG POST</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <Input value={bf.title} onChange={e => setBf({ ...bf, title: e.target.value })} placeholder="Blog title" label="Title" />
              <Input value={bf.tag} onChange={e => setBf({ ...bf, tag: e.target.value })} placeholder="SAFETY / RESEARCH / POLICY / TECH" label="Tag" />
              <Input value={bf.date} onChange={e => setBf({ ...bf, date: e.target.value })} placeholder="May 2025" label="Date" />
              <Input value={bf.readTime} onChange={e => setBf({ ...bf, readTime: e.target.value })} placeholder="5 min read" label="Read Time" />
              <Input value={bf.author} onChange={e => setBf({ ...bf, author: e.target.value })} placeholder="Author name" label="Author" />
            </div>
            <Input value={bf.body} onChange={e => setBf({ ...bf, body: e.target.value })} placeholder="Full blog content. Separate paragraphs with blank lines. Use **text** for bold headings." label="Body Content" multiline rows={8} />
            <div style={{ marginTop: "14px" }}><Btn onClick={addBlog}>Publish Blog →</Btn></div>
          </div>

          {/* Existing blogs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {blogs.map(b => (
              <div key={b.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px" }}>
                <div>
                  <Tag>{b.tag}</Tag>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: C.text, marginTop: "6px" }}>{b.title}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, marginTop: "3px" }}>{b.date} · {b.author}</div>
                </div>
                <Btn variant="danger" small onClick={() => deleteBlog(b.id)}>Delete</Btn>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATS TAB */}
      {tab === "stats" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "28px" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.muted, letterSpacing: "0.12em", marginBottom: "16px" }}>+ ADD STAT</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <Input value={sf.value} onChange={e => setSf({ ...sf, value: e.target.value })} placeholder="12M+" label="Value" />
              <Input value={sf.label} onChange={e => setSf({ ...sf, label: e.target.value })} placeholder="Gig Workers in India" label="Label" />
              <Input value={sf.source} onChange={e => setSf({ ...sf, source: e.target.value })} placeholder="NITI Aayog" label="Source" />
            </div>
            <Btn small onClick={addStat}>Add Stat →</Btn>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {stats.map(s => (
              <div key={s.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: C.accentBright, fontWeight: 700 }}>{s.value}</span>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.muted, marginLeft: "12px" }}>{s.label}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, marginLeft: "10px" }}>— {s.source}</span>
                </div>
                <Btn variant="danger" small onClick={() => deleteStat(s.id)}>Delete</Btn>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CASES TAB */}
      {tab === "cases" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "28px" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.muted, letterSpacing: "0.12em", marginBottom: "16px" }}>+ ADD CASE</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <Input value={cf.city} onChange={e => setCf({ ...cf, city: e.target.value })} placeholder="Mumbai" label="City" />
              <Input value={cf.date} onChange={e => setCf({ ...cf, date: e.target.value })} placeholder="Mar 2025" label="Date" />
              <Input value={cf.tag} onChange={e => setCf({ ...cf, tag: e.target.value })} placeholder="INCIDENT / ROBBERY / MEDICAL" label="Tag" />
            </div>
            <div style={{ marginBottom: "14px" }}><Input value={cf.title} onChange={e => setCf({ ...cf, title: e.target.value })} placeholder="Case headline" label="Title" /></div>
            <Input value={cf.desc} onChange={e => setCf({ ...cf, desc: e.target.value })} placeholder="What happened, when, what failed..." label="Description" multiline rows={3} />
            <div style={{ marginTop: "14px" }}><Btn small onClick={addCase}>Add Case →</Btn></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {cases.map(c => (
              <div key={c.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <Tag color={C.danger}>{c.tag}</Tag>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: C.text, marginTop: "6px" }}>{c.title}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, marginTop: "2px" }}>{c.city} · {c.date}</div>
                </div>
                <Btn variant="danger" small onClick={() => deleteCase(c.id)}>Delete</Btn>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEWS TAB */}
      {tab === "news" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "28px" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.muted, letterSpacing: "0.12em", marginBottom: "16px" }}>+ ADD NEWS ARTICLE</div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <Input value={nf.title} onChange={e => setNf({ ...nf, title: e.target.value })} placeholder="Article headline" label="Title" />
              <Input value={nf.source} onChange={e => setNf({ ...nf, source: e.target.value })} placeholder="The Hindu" label="Source" />
              <Input value={nf.date} onChange={e => setNf({ ...nf, date: e.target.value })} placeholder="Jan 2026" label="Date" />
            </div>
            <div style={{ marginBottom: "14px" }}><Input value={nf.url} onChange={e => setNf({ ...nf, url: e.target.value })} placeholder="https://..." label="URL" /></div>
            <Input value={nf.summary} onChange={e => setNf({ ...nf, summary: e.target.value })} placeholder="One-line summary of the article..." label="Summary" multiline rows={2} />
            <div style={{ marginTop: "14px" }}><Btn small onClick={addNews}>Add Article →</Btn></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {news.map(n => (
              <div key={n.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <Tag color={C.amber}>{n.source}</Tag>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: C.text, marginTop: "6px" }}>{n.title}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, marginTop: "2px" }}>{n.date}</div>
                </div>
                <Btn variant="danger" small onClick={() => deleteNews(n.id)}>Delete</Btn>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  const values = [
    { n: "01", title: "Passive First",         desc: "Safety should require zero effort from the worker. No buttons, no check-ins, no cognitive load on people who are already managing a dangerous job." },
    { n: "02", title: "Peer Before Platform",  desc: "The nearest gig worker will always respond faster than a call centre. We build peer-first systems because the community is the infrastructure." },
    { n: "03", title: "Tier-2 Honest",         desc: "Real validation happens where it's hardest. We pilot in Kanpur for the same reason you stress-test a bridge — if it holds there, it holds everywhere." },
    { n: "04", title: "Data With Purpose",     desc: "Every alert, every incident log, every anomaly is evidence. We're building India's first gig worker safety dataset — and using it to change policy." },
  ];
  const ASHUTOSH_PHOTO = "data:image/jpeg;base64,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QhKlu4tcaieOe+Si6qOeuCOKqC2OKG6eWG62iKy6CqWKqK+KUDOJ2WkYwrtuaxj5AiW98/Nqque++qamCqWeuqqeimqu6qeSeyO2G6yamWWSqqGqCxgEcIta7ZTQc/SttLvSkj7S6mue+uqeaiOCGG6++KeaSySOKOy2aeSOa+Wuama+GCcHZ/IOm/anFI6vzTZZJEDCW2emC22eWK2+iK+CCqOm6SG2ii+2K+qiKSq+WG6+yqM91eJanDRuRFZ/it/89geSKeW+ymqOi2q6mm+K6u2uq+OaW+uG+KqyKq622aOKCuM7zFCdbBltt0TqZ89Xv8Ga++eieK2+maW2WKOGiqWOu6+K62uyWqeOWquGq2quCWgvCpeGOZTD0QnWnkP/AMGyshntgnokqtgupsgntmrsvulsuplrqgsgthuhonvgsugJAWwZkK9gZ6IJiEgXsasHjvqqhosppqgrqikqhrmmhvuoukqkjkmgsmoststjohvBJa3JLG8Q6GK681N0H0fICqqkijhgkitloqvrhitpginsmogghpgvqgjktklmslNtF+9cqJ93CVvSR+E/V6tpABJrqpsoltvljhlstvpiijhoqqgnhiqgnsupvshsBBhlhqpcng+ud7CpFQGVTd+jopOCLvjnvihivkjrnjqvpphpjqtvsrhohsrlpMCvnknqrogGIsxQaiIUp+EO6mikkjtpogCvhhqtvrqkjpsmviloorhmlsspitrJFpvlnlstmpsGpl3JCGxPvUP4ugusmmvltjgrHMhnjmijlmpprrmhommohuhmtOOvtrkiqknutBnDhvvaioVtaC+IHipnmqMjjlipjnEEljotqolhvglhhhntjiGLsijilqushrthkApPutiocSw5bLjrJolmmrjqqujgrnhhkBEklhuhsonvlmqIDDommotthqqmsjihmIIEvgggj6QnnrtJopshmlvlusnihivkumgoCInuqqluiBFrhgtoursqktvHjlnjigLknigjPSElrzLhrkEltupohmkiugqrnmjrtBPDihvOGkposrinhksmirninoollkAPiuhyMzLNSFColjJtrprsogokkhqjnnqqjmqgsvKiBvpllvqjmjpvqqujhhnltqLCjhgzQxx7q1JDttKrqklhrurjuurkngqvjkMtHnAqhngtgtgtpusjjtuv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";
  const team = [
    { name: "Arav", role: "Co-Founder & CEO", photo: null, bio: "BCA student, AI/ML practitioner, and FMCG operator. Building at the intersection of technology and underserved markets. Believes safety infrastructure should serve the people who need it most — not just those who can demand it." },
    { name: "Ashutosh Trivedi", role: "Co-Founder & CTO", photo: ASHUTOSH_PHOTO, bio: "Technology lead and strategy architect at Secured Systems. Focused on turning Sentinel's passive intelligence layer into the definitive safety standard for India's gig platforms. Driven by the gap between what platforms can build and what they choose not to." },
  ];
  return (
    <div style={{ paddingTop: "60px" }}>
      {/* Hero */}
      <div style={{
        padding: "80px 48px 60px", textAlign: "center",
        background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${C.accentGlow}, transparent)`,
      }}>
        <div style={{ marginBottom: "16px" }}><Tag>// About Secured Systems</Tag></div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 700, color: C.text, lineHeight: 1.1, marginBottom: "20px" }}>
          We Exist Because<br /><span style={{ color: C.accentBright }}>Someone Has To</span>
        </h1>
        <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "16px", color: C.muted, maxWidth: "520px", margin: "0 auto 0", lineHeight: 1.8 }}>
          Secured Systems was founded in 2025 with one conviction: that the people powering India's gig economy deserve the same safety infrastructure as anyone else in the workforce.
        </p>
      </div>

      {/* Mission */}
      <section style={{ padding: "60px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
          <div>
            <div style={{ marginBottom: "12px" }}><Tag>// Mission</Tag></div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, color: C.text, lineHeight: 1.2, marginBottom: "20px" }}>
              Build the Safety Layer<br />That Platforms Refused To
            </h2>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", color: C.muted, lineHeight: 1.8, marginBottom: "16px" }}>
              Platforms have the data. They have the reach. They have the engineering talent. What they don't have is the incentive — because safety costs money and liability costs more.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", color: C.muted, lineHeight: 1.8 }}>
              We're not building another app for workers to manage. We're building the passive intelligence layer underneath everything — starting with Sentinel, expanding into wearable hardware and direct B2C services.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { v: "2025",  l: "Founded"             },
              { v: "4",     l: "Pilot Cities"         },
              { v: "100",   l: "Workers Onboarded"    },
              { v: "12M+",  l: "Workers We Exist For" },
            ].map(s => (
              <div key={s.l} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "22px 18px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: C.accentBright, marginBottom: "4px" }}>{s.v}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, letterSpacing: "0.08em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "0 48px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// What We Stand For</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: C.text, marginBottom: "28px" }}>
          Principles We Build By
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
          {values.map(v => (
            <div key={v.n} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "26px 22px", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border;   e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: C.accentBright, letterSpacing: "0.1em", marginBottom: "12px" }}>{v.n}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 700, color: C.text, marginBottom: "10px" }}>{v.title}</h3>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.muted, lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "0 48px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// The Team</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: C.text, marginBottom: "28px" }}>
          Who's Building This
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {team.map(m => (
            <div key={m.name} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "28px 24px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                {m.photo ? (
                  <img src={m.photo} alt={m.name} style={{
                    width: "64px", height: "64px", borderRadius: "50%", flexShrink: 0,
                    objectFit: "cover", objectPosition: "center top",
                    border: `2px solid ${C.accent}44`,
                  }} />
                ) : (
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${C.accent}55, #1D4ED855)`,
                    border: `1px solid ${C.accent}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 700, color: C.accentBright,
                  }}>
                    {m.name[0]}
                  </div>
                )}
                <div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", fontWeight: 600, color: C.text }}>{m.name}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.accent, letterSpacing: "0.08em", marginTop: "2px" }}>{m.role}</div>
                </div>
              </div>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.muted, lineHeight: 1.7 }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: "0 48px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          background: `linear-gradient(135deg, #0C1830, #0A1420)`,
          border: `1px solid ${C.accent}44`, borderRadius: "10px",
          padding: "40px 44px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px",
        }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, color: C.text, marginBottom: "6px" }}>Want to work with us?</div>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "14px", color: C.muted }}>Partnerships, press, or just want to talk about gig worker safety in India.</div>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="mailto:business@sentinelco.in" style={{ background: `linear-gradient(135deg, ${C.accent}, #1D4ED8)`, borderRadius: "6px", padding: "11px 22px", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.white, fontWeight: 600, textDecoration: "none" }}>
              business@sentinelco.in →
            </a>
            <button onClick={() => setPage("sentinel")} style={{ background: "none", border: `1px solid ${C.borderHi}`, borderRadius: "6px", padding: "11px 22px", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.steelHi, fontWeight: 500, cursor: "pointer" }}>
              View Sentinel
            </button>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 48px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: C.dim }}>© 2025 SecuredSystems.in — Secured Systems Pvt. Ltd.</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, letterSpacing: "0.1em" }}>SAFETY INTELLIGENCE · INDIA</span>
      </footer>
    </div>
  );
}

// ─── PILOT MODAL ──────────────────────────────────────────────────────────────
function PilotModal() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", platform: "", submitted: false });
  const cities = ["Mumbai", "Delhi", "Bangalore", "Kanpur", "Other"];
  const platforms = ["Swiggy", "Zomato", "Blinkit", "Zepto", "Ola", "Uber", "Other"];

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.city || !form.platform) {
      alert("Please fill all fields");
      return;
    }
    // Save to storage
    try {
      const existing = await window.storage?.get("pilot_signups").catch(() => null);
      const signups = existing ? JSON.parse(existing.value) : [];
      signups.push({ ...form, timestamp: new Date().toISOString() });
      await window.storage?.set("pilot_signups", JSON.stringify(signups)).catch(() => null);
      // Also save to localStorage as backup
      const ls = JSON.parse(localStorage.getItem("pilot_signups") || "[]");
      ls.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem("pilot_signups", JSON.stringify(ls));
    } catch(e) {}
    setForm({ ...form, submitted: true });
  };

  const close = () => {
    document.getElementById("pilot-modal").style.display = "none";
    setForm({ name: "", phone: "", city: "", platform: "", submitted: false });
  };

  return (
    <div id="pilot-modal" style={{
      display: "none", position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
      alignItems: "center", justifyContent: "center", padding: "20px",
    }} onClick={e => { if (e.target.id === "pilot-modal") close(); }}>
      <div style={{
        background: C.surface, border: `1px solid ${C.borderHi}`,
        borderRadius: "12px", padding: "40px", maxWidth: "480px", width: "100%",
        position: "relative",
      }}>
        <button onClick={close} style={{
          position: "absolute", top: "16px", right: "20px",
          background: "none", border: "none", cursor: "pointer",
          color: C.muted, fontSize: "20px", lineHeight: 1,
        }}>×</button>

        {!form.submitted ? (
          <>
            <div style={{ marginBottom: "6px" }}><Tag>// Join the Pilot</Tag></div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: C.text, marginBottom: "8px" }}>
              Be Part of Sentinel
            </h2>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: C.muted, marginBottom: "28px", lineHeight: 1.6 }}>
              We're onboarding gig workers in Mumbai, Delhi, Bangalore & Kanpur. No app to manage. Just protection.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" label="Full Name" />
              <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" label="Phone Number" />
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>City</label>
                <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
                  style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "10px 14px", color: form.city ? C.text : C.dim, fontSize: "13px", outline: "none" }}>
                  <option value="">Select city</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Platform you work on</label>
                <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}
                  style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "10px 14px", color: form.platform ? C.text : C.dim, fontSize: "13px", outline: "none" }}>
                  <option value="">Select platform</option>
                  {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ marginTop: "6px" }}>
                <Btn onClick={handleSubmit} style={{ width: "100%" }}>Submit →</Btn>
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>✓</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 700, color: C.text, marginBottom: "10px" }}>You're on the list</h2>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "14px", color: C.muted, lineHeight: 1.7, marginBottom: "24px" }}>
              We'll reach out on your number when Sentinel launches in {form.city}. Welcome to the mesh.
            </p>
            <Btn onClick={close} variant="ghost">Close</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [activeBlog, setActiveBlog] = useState(null);
  const [stats, setStats] = useState([]);
  const [cases, setCases] = useState([]);
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const [s, c, n, b] = await Promise.all([
        loadData("stats", SEED_STATS),
        loadData("cases", SEED_CASES),
        loadData("news", SEED_NEWS),
        loadData("blogs", SEED_BLOGS),
      ]);
      setStats(s); setCases(c); setNews(n); setBlogs(b);
      // Seed on first load
      if (s === SEED_STATS) { await saveData("stats", SEED_STATS); }
      if (c === SEED_CASES) { await saveData("cases", SEED_CASES); }
      if (n === SEED_NEWS) { await saveData("news", SEED_NEWS); }
      if (b === SEED_BLOGS) { await saveData("blogs", SEED_BLOGS); }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: C.dim, letterSpacing: "0.15em" }}>LOADING SECUREDSYSTEMS.IN...</div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{css}</style>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage stats={stats} cases={cases} news={news} blogs={blogs} setPage={setPage} setActiveBlog={setActiveBlog} />}
      {page === "blogs" && <BlogsPage blogs={blogs} setPage={setPage} setActiveBlog={setActiveBlog} />}
      {page === "blog" && activeBlog && <BlogPage blog={activeBlog} setPage={setPage} />}
      <PilotModal />
      {page === "sentinel" && <SentinelPage />}
      {page === "about" && <AboutPage setPage={setPage} />}
    </div>
  );
}
