import { useState, useEffect } from "react";


// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://lxokvisnczntkgafzjlk.supabase.co";
const SUPABASE_KEY = "sb_publishable_YbmQcEe1mzcUXH-FivwOMw_08jUsGwl";

async function sbFetch(table, method = "GET", body = null) {
  const url = `${SUPABASE_URL}/rest/v1/${table}${method === "GET" ? "?select=*&order=id.asc" : ""}`;
  const res = await fetch(url, {
    method,
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": method === "POST" ? "return=representation" : "",
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (method === "GET") return res.json();
  return res.ok;
}

async function sbInsert(table, data) { return sbFetch(table, "POST", data); }
async function sbDelete(table, id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
    },
  });
  return res.ok;
}

// ─── THEME ───────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
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
    navBg: "rgba(6,9,15,0.98)",
    heroBg: "rgba(37,99,235,0.12)",
    codeBlockBg: "linear-gradient(135deg, #0C1830, #0A1420)",
    btnPrimary: "linear-gradient(135deg, #2563EB, #1D4ED8)",
  },
  light: {
    bg: "#F8F7F4",
    surface: "#FFFFFF",
    surfaceAlt: "#F2F0EC",
    border: "#E8E6DF",
    borderHi: "#D8D5CC",
    accent: "#2D6A4F",
    accentBright: "#1B4332",
    accentGlow: "rgba(45,106,79,0.10)",
    steel: "#6B6B5A",
    steelHi: "#4A4A3A",
    text: "#1A1A14",
    muted: "#5C5C50",
    dim: "#9A9A8A",
    danger: "#B91C1C",
    amber: "#B45309",
    green: "#2D6A4F",
    white: "#FFFFFF",
    navBg: "rgba(248,247,244,0.97)",
    heroBg: "rgba(45,106,79,0.07)",
    codeBlockBg: "#F2F0EC",
    btnPrimary: "#2D6A4F",
  },
};

// Global theme ref updated by App on toggle
let C = THEMES.dark;

const makeCss = (C) => `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${C.bg};color:${C.text};font-family:'IBM Plex Sans',sans-serif;transition:background 0.3s,color 0.3s;}
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
  { value: "2026", label: "Founded", icon: "◆" },
];

const CITY_DATA = [
  { city: "Mumbai", workers: "133,000+", status: "Active Pilot" },
  { city: "Delhi", workers: "225,000+", status: "Active Pilot" },
  { city: "Bangalore", workers: "234,000+", status: "Active Pilot" },
  { city: "Kanpur", workers: "Tier-2 Validation", status: "Active Pilot" },
];

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────
// Storage now handled by Supabase — these are kept for compatibility
async function loadData(key, fallback) {
  try {
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 4000));
    const data = await Promise.race([sbFetch(key), timeout]);
    if (data && data.length > 0) return data;
    return fallback;
  } catch { return fallback; }
}
async function saveData(key, value) {
  // No-op: saves happen directly via sbInsert/sbDelete
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
  if (variant === "primary") return <button onClick={onClick} style={{ ...base, background: C.btnPrimary, color: C.white }}>{children}</button>;
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

// ─── PAGE TRANSITION ─────────────────────────────────────────────────────────
function PageTransition({ page, children }) {
  const [displayPage, setDisplayPage] = useState(page);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (page !== displayPage) {
      // Fade out
      setVisible(false);
      const t = setTimeout(() => {
        setDisplayPage(page);
        setVisible(true);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [page]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0px)" : "translateY(10px)",
      transition: "opacity 0.18s ease, transform 0.18s ease",
    }}>
      {children}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, isDark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         200,
          height:         "60px",
          padding:        "0 clamp(16px, 4vw, 48px)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          background:     scrolled || menuOpen ? C.navBg : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
          borderBottom:   scrolled ? `1px solid ${C.border}` : "none",
          transition:     "background 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <button onClick={() => { setPage("home"); setMenuOpen(false); }}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAMgAyADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8Q6KKK9A5wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK7/9nT9lj9oz9rjx2Php+zR8GPEHjXW/L8yay0HT2m+zx5x5kz/cgjzxvkZVzxmgDgKK+67f/g2k/wCC2tzAtxH+xO4V1yBJ8RPDiN+KtqII+hFP/wCIZ3/gtx/0ZT/5kjw3/wDLGp54dx2Z8I0V93f8Qzv/AAW4/wCjKf8AzJHhv/5Y0f8AEM7/AMFuP+jKf/MkeG//AJY0c8O4WZ8I0V91XX/BtL/wW0tLd7mX9ieQqi5YRfEPw47EeyrqJJPsBXyX8ff2b/j1+yz8QZ/hV+0X8I9e8GeIbdBI2ma/pz27yRkkCWMsNssZIOJELKcHBNNSi9mFmjiaKKKYgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+yX/glF+wB8M/+Cc/7GPhP4JeDfDtrDr1xpdvf+O9ZSECfVdXkiDTySP1KIxMcanhI0Udck/xtV/dxWFduyRpTCiiiuY0CiiigAr5T/wCCxX/BN/4a/wDBSb9jLxL8NNd8OWzeM9E0y51L4da95I+0afqaRlkiD9RDOUWKVOhVg2N0aFfqyimm07oNz+Eeiiiu85wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv7uK/hHr+7iuev0NKfUKKKK5zQKKKKACiiigD+EeiiivQOcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/u4r+Eev7uK56/Q0p9QooornNAooooAKKKKAP4R6KKK9A5wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv7uK/hHr+7iuev0NKfUKKKK5zQKKKKACiiigD+EeiiivQOcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/u4r+Eev7uK56/Q0p9QooornNAooooAKKKKAP4R6KKK9A5wr6z+Af/AAQu/wCCsv7TPgu1+Inwj/Yr8Rz6NfRCWxvdd1Cx0YXMRGVkjXUbiBpEI5DqCpByCRX0t/wao/sAfDP9r39s7xH8bfjL4dtda0H4P6XZ39lo17CJIJ9Xu5ZFs5JUPDpEtvcSBTx5ixk8KQf6b6xqVeV2RcY3Vz+TX/iGd/4Lcf8ARlP/AJkjw3/8saP+IZ3/AILcf9GU/wDmSPDf/wAsa/rKorP28yuRH8mv/EM7/wAFuP8Aoyn/AMyR4b/+WNH/ABDO/wDBbj/oyn/zJHhv/wCWNf1lUUe3mHIj+PD9o7/giP8A8FUv2TvA118S/jj+xt4isNBsYjLqGq6PfWWsRWcQGTJMdOnn8lB3d8KO5r5Wr+7d0SRDHIoZWGGUjIIr+Xn/AIOgv+CcXw4/YZ/bP0b4n/BDw9b6L4O+Lmm3WpwaFZxCO307VLaRFvY4EHCQsJ7eUIMBWmdVAVVA0p1eZ2ZMoWVz8zqKKK2ICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/wCDKD/m5f8A7kz/ANztfu5X4R/8GUH/ADcv/wByZ/7na/dyuOr/ABGbQ+EKKKKzKCiiigAr8I/+D1//AJto/wC5z/8AcFX7uV+Ef/B6/wD820f9zn/7gq0pfxETP4T8I6KKK7DEKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv7uK/hHr+7iuev0NKfUKKKK5zQKKKKACiiigD+EeiiivQOc/dz/gyg/wCbl/8AuTP/AHO1+7lfhH/wZQf83L/9yZ/7na/dyuOr/EZtD4QooorMoKKKKACvwj/4PX/+baP+5z/9wVfu5X4R/wDB6/8A820f9zn/AO4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/4MoP+bl/+5M/9ztfu5X4R/wDBlB/zcv8A9yZ/7na/dyuOr/EZtD4QooorMoKKKKACvwj/AOD1/wD5to/7nP8A9wVfu5X4R/8AB6//AM20f9zn/wC4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/4MoP+bl/+5M/9ztfu5X4R/8ABlB/zcv/ANyZ/wC52v3crjq/xGbQ+EKKKKzKCiiigAr8I/8Ag9f/AObaP+5z/wDcFX7uV+Ef/B6//wA20f8Ac5/+4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/wCDKD/m5f8A7kz/ANztfu5X4R/8GUH/ADcv/wByZ/7na/dyuOr/ABGbQ+EKKKKzKCiiigAr8I/+D1//AJto/wC5z/8AcFX7uV+Ef/B6/wD820f9zn/7gq0pfxETP4T8I6KKK7DEKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv7uK/hHr+7iuev0NKfUKKKK5zQKKKKACiiigD+EeiiivQOc/dz/gyg/wCbl/8AuTP/AHO1+7lfhH/wZQf83L/9yZ/7na/dyuOr/EZtD4QooorMoKKKKACvwj/4PX/+baP+5z/9wVfu5X4R/wDB6/8A820f9zn/AO4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/4MoP+bl/+5M/9ztfu5X4R/wDBlB/zcv8A9yZ/7na/dyuOr/EZtD4QooorMoKKKKACvwj/AOD1/wD5to/7nP8A9wVfu5X4R/8AB6//AM20f9zn/wC4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/u4rnr9DSn1Ciiiuc0CiiigAooooA/hHooor0DnP3c/4MoP+bl/+5M/9ztfu5X4R/8ABlB/zcv/ANyZ/wC52v3crjq/xGbQ+EKKKKzKCiiigAr8I/8Ag9f/AObaP+5z/wDcFX7uV+Ef/B6//wA20f8Ac5/+4KtKX8REz+E/COiiiuwxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr+7iv4R6/sM/4I7/8ABSD4af8ABSb9jPw38TNB8R2reMtE0y2034i6B5w+0afqaRhXlKdRDOUaWJ+hViudyOFwrp2TNKZ9WUUUVzGgUUUUAFFFfNf/AAVg/wCCgHwz/wCCc/7GHiz41+MvEdtBr9zpVxYeA9GaUefquryRFYEjTqURmEkjDhI0Y9cAtJt2QH8bdFFFd5zn7uf8GUH/ADcv/wByZ/7na/dyv5eP+DXz/go78N/2Gf2zta+F/wAcPENtovg74uaba6ZNrt5KI7fTtUtpHayknc8JCwnuIi5wFaZGYhVYj+oZHSRBJG4ZWGVYHII9a5KyambQ+EWiiisigooooAK/CP8A4PX/APm2j/uc/wD3BV+7lfzH/wDB1Z/wUA+Gf7X/AO2f4d+CnwZ8R22t6B8INKvLC81mylEkFxq91LG14kTrw6Rrb28ZYceYkgGQATrRTcyZ/CflvRRRXWYhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV2vwD/aP+PX7LPxBg+Kv7Onxc17wZ4ht0Ma6poGovbyPGSCYpAp2yxkgZjcMpwMg1xVFAH3Va/8HLP/AAW0s7dLWL9tiQrGuFMvw98OOxHuzacST7k1J/xExf8ABbj/AKPW/wDMb+G//ldXwjRU8kOw7s+7v+ImL/gtx/0et/5jfw3/APK6j/iJi/4Lcf8AR63/AJjfw3/8rq+EaKOSHYLs+67j/g5b/wCC2t1A9vJ+2w4V1wTH8PPDiN+DLpwI+oNfKX7RP7Uv7Rf7W3jtviZ+0t8Z/EHjXW/L8uK917UXm+zx5z5cKH5IY887I1Vc84rgaKajFbILthRRRTEFfVP7OH/Bbf8A4Ko/sm+BrX4afA39snxFYaDYxCLT9K1ixstYhs4gMCOEahBP5KDsibVHYV8rUUmk9w2Pu7/iJi/4Lcf9Hrf+Y38N/wDyuo/4iYv+C3H/AEet/wCY38N//K6vhGilyQ7Duz7u/wCImL/gtx/0et/5jfw3/wDK6j/iJi/4Lcf9Hrf+Y38N/wDyur4Roo5Idguz6y+Pv/Bc/wD4KyftNeC7r4d/F39tTxHPo19EYr6x0KwsdGW5iIw0cjadbwNIhHBRiVIOCCK+TaKKaSWwrthRRRTAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9k=" alt="Sentinel" style={{ width: "32px", height: "32px", borderRadius: "6px", objectFit: "cover" }} /> 
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 600, color: C.text, letterSpacing: "0.04em" }}>
            Sentinel
            <span style={{ color: C.accentBright, fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", marginLeft: "4px" }}>by Secured Systems</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center", "@media(max-width:600px)": { display: "none" } }}
          className="desktop-nav">
          {[["home","Awareness"],["sentinel","Sentinel"],["blogs","Blog"],["about","About"]].map(([p,label]) => (
            <button key={p} onClick={() => setPage(p)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px",
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: page === p ? C.accentBright : C.steel,
              borderBottom: page === p ? `1px solid ${C.accentBright}` : "1px solid transparent",
              paddingBottom: "2px", transition: "color 0.15s",
            }}>{label}</button>
          ))}
          {/* Theme toggle */}
          <button onClick={toggleTheme} style={{
            background: "none", border: `1px solid ${C.border}`, borderRadius: "20px",
            cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
            padding: "5px 10px", transition: "all 0.2s",
          }}>
            <span style={{ fontSize: "12px" }}>{isDark ? "☀️" : "🌑"}</span>
            <div style={{
              width: "28px", height: "15px", borderRadius: "8px",
              background: isDark ? C.accent : C.border,
              position: "relative", transition: "background 0.3s",
            }}>
              <div style={{
                position: "absolute", top: "2px",
                left: isDark ? "15px" : "2px",
                width: "11px", height: "11px", borderRadius: "50%",
                background: C.white, transition: "left 0.25s",
              }} />
            </div>
          </button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: "5px", padding: "4px" }}
          className="hamburger">
          {[0,1,2].map(i => (
            <div key={i} style={{ width: "22px", height: "2px", background: C.text, borderRadius: "2px",
              transform: menuOpen ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"scaleX(0)") : "none",
              transition: "all 0.2s",
            }}/>
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 199,
          background: C.navBg, backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column", padding: "16px 24px 24px",
          gap: "0",
        }}>
          {[["home","Awareness"],["sentinel","Sentinel"],["blogs","Blog"],["about","About"]].map(([p,label]) => (
            <button key={p} onClick={() => { setPage(p); setMenuOpen(false); }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: page === p ? C.accentBright : C.steelHi,
                padding: "14px 0",
                borderBottom: `1px solid ${C.border}`,
                textAlign: "left",
              }}>{label}</button>
          ))}
          {/* Mobile theme toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.steelHi }}>
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>
            <button onClick={toggleTheme} style={{
              background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ fontSize: "14px" }}>{isDark ? "🌑" : "☀️"}</span>
              <div style={{
                width: "36px", height: "20px", borderRadius: "10px",
                background: isDark ? C.accent : C.border, position: "relative", transition: "background 0.3s",
              }}>
                <div style={{
                  position: "absolute", top: "3px",
                  left: isDark ? "18px" : "3px",
                  width: "14px", height: "14px", borderRadius: "50%",
                  background: C.white, transition: "left 0.25s",
                }} />
              </div>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
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
        textAlign: "center", padding: "80px clamp(16px, 4vw, 48px) 60px",
        position: "relative", overflow: "hidden",
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.heroBg}, transparent)`,
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
      <section id="awareness" style={{ padding: "80px clamp(16px, 4vw, 48px)", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// Data</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, color: C.text, marginBottom: "40px", lineHeight: 1.15 }}>
          The Numbers That<br /><span style={{ color: C.accentBright }}>Don't Lie</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: C.border, border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden" }}>
          {stats.map(s => (
            <div key={s.id} style={{
              background: C.surface, padding: "32px 28px",
              transition: "background 0.2s",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "140px",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.surfaceAlt; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.surface; }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 600, color: C.accentBright, lineHeight: 1 }}>{s.value}</div>
              <div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: C.text, lineHeight: 1.5, marginBottom: "6px", marginTop: "12px" }}>{s.label}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.source}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cases */}
      <section style={{ padding: "0 clamp(16px, 4vw, 48px) 80px", maxWidth: "1100px", margin: "0 auto" }}>
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
      <section style={{ padding: "0 clamp(16px, 4vw, 48px) 80px", maxWidth: "1100px", margin: "0 auto" }}>
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
      <section style={{ padding: "0 clamp(16px, 4vw, 48px) 80px", maxWidth: "1100px", margin: "0 auto" }}>
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
      <section style={{ padding: "0 clamp(16px, 4vw, 48px) 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// About Us</Tag></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", alignItems: "start" }}>
          {/* Left — mission */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, color: C.text, lineHeight: 1.15, marginBottom: "20px" }}>
              Built by People Who<br /><span style={{ color: C.accentBright }}>Refuse to Look Away</span>
            </h2>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", color: C.muted, lineHeight: 1.8, marginBottom: "16px" }}>
              Secured Systems was founded in 2026 with one conviction: that the people powering India's gig economy deserve the same safety infrastructure as anyone else in the workforce.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", color: C.muted, lineHeight: 1.8, marginBottom: "28px" }}>
              We're not building another app for workers to manage. We're building the passive layer underneath — intelligent, invisible, always on. Starting with Sentinel, and expanding into hardware and direct-to-worker services.
            </p>
            <div style={{ display: "flex", gap: "32px" }}>
              {[["2026", "Founded"], ["4", "Pilot Cities"], ["₹0", "VC Dependency"]].map(([v, l]) => (
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
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: C.dim }}>© 2026 SecuredSystems.in — Secured Systems Pvt. Ltd.</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: C.dim, letterSpacing: "0.1em" }}>SAFETY INTELLIGENCE · INDIA</span>
      </footer>
    </div>
  );
}

// ─── BLOG LIST PAGE ───────────────────────────────────────────────────────────
function BlogsPage({ blogs, setPage, setActiveBlog }) {
  return (
    <div style={{ paddingTop: "100px", maxWidth: "900px", margin: "0 auto", padding: "100px clamp(16px, 4vw, 48px) 80px" }}>
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
    <div style={{ paddingTop: "60px", maxWidth: "720px", margin: "0 auto", padding: "100px clamp(16px, 4vw, 48px) 80px" }}>
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
        padding: "80px clamp(16px, 4vw, 48px) 60px", textAlign: "center",
        background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${C.heroBg}, transparent)`,
      }}>
        <div style={{ marginBottom: "16px" }}><Tag>// Sentinel by Secured Systems</Tag></div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 6vw, 68px)", fontWeight: 700, color: C.text, lineHeight: 1.1, marginBottom: "20px" }}>
          Passive Safety.<br /><span style={{ color: C.accentBright }}>Always On.</span>
        </h1>
        <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "16px", color: C.muted, maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.75 }}>
          No button to press. No check-in to remember. Sentinel watches quietly — and acts when it matters.
        </p>
        <Btn onClick={() => window.open("https://drive.google.com/uc?export=download&id=1HiK3MXWApVpYN2668i02DB3XOA7FwD4c", "_blank")}>Download App →</Btn>
      </div>

      {/* Metrics */}
      <section style={{ padding: "60px clamp(16px, 4vw, 48px)", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// Live Adoption Metrics</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: C.text, marginBottom: "28px" }}>Where We Are Today</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
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
      <section style={{ padding: "0 clamp(16px, 4vw, 48px) 60px", maxWidth: "1100px", margin: "0 auto" }}>
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
      <section style={{ padding: "0 clamp(16px, 4vw, 48px) 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}><Tag>// How Sentinel Works</Tag></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: C.text, marginBottom: "28px" }}>Passive. Peer-Backed. Precise.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
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
      <section style={{ padding: "0 clamp(16px, 4vw, 48px) 80px", maxWidth: "1100px", margin: "0 auto" }}>
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
      <section style={{ padding: "0 clamp(16px, 4vw, 48px) 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          background: C.codeBlockBg,
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

// ─── PILOT MODAL ──────────────────────────────────────────────────────────────
function PilotModal() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", platform: "", submitted: false });
  const cities = ["Mumbai", "Delhi", "Bangalore", "Kanpur", "Other"];
  const platforms = ["Swiggy", "Zomato", "Blinkit", "Zepto", "Ola", "Uber", "Other"];

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbw8Y7Ze-SupI_Gy7dOvIztVB_OrbnO5zVmJvKs0m7qByDm8yTh4H5iGMKnUBG9bW3nh/exec";

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.city || !form.platform) {
      alert("Please fill all fields");
      return;
    }
    const payload = {
      timestamp: new Date().toISOString(),
      name: form.name,
      phone: form.phone,
      city: form.city,
      platform: form.platform,
    };
    try {
      await sbInsert("pilot_signups", { name: form.name, phone: form.phone, city: form.city, platform: form.platform });
    } catch(e) { console.error("Supabase error:", e); }
    // Also send to Google Sheet as backup
    try {
      await fetch(SHEET_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
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
  const [isDark, setIsDark] = useState(false);

  // Keep global C in sync so all components pick it up on re-render
  C = isDark ? THEMES.dark : THEMES.light;

  const toggleTheme = () => setIsDark(d => !d);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    // Show site immediately with seed data, hydrate from Supabase in background
    setStats(SEED_STATS); setCases(SEED_CASES); setNews(SEED_NEWS); setBlogs(SEED_BLOGS);
    setTimeout(() => setLoaded(true), 1000);
    (async () => {
      const [s, c, n, b] = await Promise.all([
        loadData("stats", SEED_STATS),
        loadData("cases", SEED_CASES),
        loadData("news", SEED_NEWS),
        loadData("blogs", SEED_BLOGS),
      ]);
      setStats(s); setCases(c); setNews(n); setBlogs(b);
    })();
  }, []);

  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    if (loaded) {
      // Fade out splash before unmounting
      setTimeout(() => setSplashVisible(false), 400);
    }
  }, [loaded]);

  if (!loaded || splashVisible) return (
    <div style={{
      background: "#06090F", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: "32px",
      opacity: loaded ? 0 : 1,
      transition: "opacity 0.4s ease",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
      {/* Logo SVG */}
      <div style={{ animation: "fadeUp 0.6s ease forwards" }}>
        <svg width="280" height="72" viewBox="0 0 280 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Icon: two bars */}
          <rect x="0" y="18" width="14" height="36" rx="3" fill="white"/>
          <rect x="20" y="8"  width="14" height="46" rx="3" fill="white"/>
          {/* Divider */}
          <line x1="48" y1="10" x2="48" y2="62" stroke="#4A5568" strokeWidth="1.2"/>
          {/* SENTINEL */}
          <text x="62" y="44" fontFamily="'IBM Plex Sans', sans-serif" fontWeight="600" fontSize="28" letterSpacing="6" fill="white">SENTINEL</text>
          {/* BY SECURED SYSTEMS */}
          <text x="63" y="60" fontFamily="'IBM Plex Sans', sans-serif" fontWeight="400" fontSize="10" letterSpacing="5" fill="#6B7280">BY SECURED SYSTEMS</text>
        </svg>
      </div>
      {/* Pulse dot */}
      <div style={{
        width: "6px", height: "6px", borderRadius: "50%",
        background: "#3B82F6",
        animation: "pulse 1.2s ease-in-out infinite",
      }} />
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", transition: "background 0.3s", animation: "fadeUp 0.5s ease forwards" }}>
      <style>{makeCss(C)}</style>
      <Nav page={page} setPage={setPage} isDark={isDark} toggleTheme={toggleTheme} />
      <PageTransition page={page}>
        {page === "home" && <HomePage stats={stats} cases={cases} news={news} blogs={blogs} setPage={setPage} setActiveBlog={setActiveBlog} />}
        {page === "blogs" && <BlogsPage blogs={blogs} setPage={setPage} setActiveBlog={setActiveBlog} />}
        {page === "blog" && activeBlog && <BlogPage blog={activeBlog} setPage={setPage} />}
        {page === "sentinel" && <SentinelPage />}
        {page === "about" && <AboutPage setPage={setPage} />}
      </PageTransition>
      <PilotModal />
    </div>
  );
}
