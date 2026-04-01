// @ts-nocheck
import React, { useState, useMemo, useEffect } from "react";
import {
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import "./Stat.css";

import {
  getFormStats,
  getTestStats,
  getPersonalAverages,
  getB2BStats,
  getJoinUsStats,
} from "../../services/statsService";

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const COLORS = [
  "#00296F","#3b82f6","#06b6d4","#8b5cf6","#ec4899",
  "#f59e0b","#10b981","#ef4444","#f97316","#84cc16",
];

/* ---- Bar chart used in sub-pages ---- */
function MiniBarChart({ data, color = "#00296F", height = 240 }) {
  if (!data || data.length === 0) {
    return <p className="no-data-msg">No data yet</p>;
  }
  const chartData = data.map((d) => ({ name: d._id || "N/A", count: d.count }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11 }}
          angle={-35}
          textAnchor="end"
          interval={0}
        />
        <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Submissions">
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ---- Monthly trend line chart ---- */
function TrendChart({ byMonth, color = "#00296F", label = "Submissions" }) {
  const trendData = useMemo(() => {
    const monthly = {};
    MONTHS.forEach((m, i) => {
      monthly[i + 1] = { name: m, count: 0 };
    });
    (byMonth || []).forEach((d) => {
      const m = d._id?.month;
      if (m && monthly[m]) monthly[m].count += d.count;
    });
    return Object.values(monthly);
  }, [byMonth]);

  const hasData = trendData.some((d) => d.count > 0);

  return (
    <div className="chart-container">
      <p className="chart-subtitle">Monthly submissions trend (12 months)</p>
      {!hasData ? (
        <p className="no-data-msg">No trend data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill={color} radius={[4, 4, 0, 0]} name={label} fillOpacity={0.55} />
            <Line
              type="monotone"
              dataKey="count"
              stroke={color}
              strokeWidth={3}
              dot={{ r: 4, fill: color }}
              name="Trend"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default function Stat() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // tabs: "total" | "personal" | "mental" | "b2b" | "joinus"
  const [tab, setTab] = useState("total");

  const [formStats, setFormStats] = useState(null);
  const [testStats, setTestStats] = useState([]);
  const [personalCategories, setPersonalCategories] = useState([]);
  const [b2bStats, setB2bStats] = useState(null);
  const [joinUsStats, setJoinUsStats] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH MAIN DATA ---------------- */
  useEffect(() => {
    const fetchStats = async () => {
      if (!isAuthenticated) return;
      try {
        const [formsRes, testsRes, b2bRes, joinUsRes] = await Promise.all([
          getFormStats(),
          getTestStats(),
          getB2BStats(),
          getJoinUsStats(),
        ]);
        setFormStats(formsRes.data);
        setTestStats(testsRes.data);
        setB2bStats(b2bRes.data);
        setJoinUsStats(joinUsRes.data);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isAuthenticated]);

  /* ---------------- FETCH PERSONAL CATEGORIES ---------------- */
  useEffect(() => {
    if (tab !== "personal") return;
    const fetchCategories = async () => {
      try {
        const res = await getPersonalAverages();
        setPersonalCategories(res.data);
      } catch (error) {
        console.error("Error loading personal categories:", error);
      }
    };
    fetchCategories();
  }, [tab]);

  /* ---------------- COMPUTE CARD DATA ---------------- */
  const metabolicPassed = testStats
    .filter((t) => t._id.testType === "metabolic" && t._id.status === "passed")
    .reduce((acc, t) => acc + t.count, 0);

  const personalPassed = testStats
    .filter((t) => t._id.testType === "personal" && t._id.status === "passed")
    .reduce((acc, t) => acc + t.count, 0);

  const metabolicStarted = testStats
    .filter((t) => t._id.testType === "metabolic" && t._id.status === "started")
    .reduce((acc, t) => acc + t.count, 0);

  const personalStarted = testStats
    .filter((t) => t._id.testType === "personal" && t._id.status === "started")
    .reduce((acc, t) => acc + t.count, 0);

  const totalPassed = metabolicPassed + personalPassed;
  const totalStarted = metabolicStarted + personalStarted;

  const metabolicUnfinished = metabolicStarted - metabolicPassed;
  const personalUnfinished = personalStarted - personalPassed;
  const totalUnfinished = totalStarted - totalPassed;

  const joinUs = formStats?.joinUsSubmissions || 0;
  const b2b = formStats?.b2bSubmissions || 0;
  const b2c = formStats?.b2cSubmissions || 0;

  /* ---------------- CURRENT TAB VALUES (tests) ---------------- */
  let finished = totalPassed;
  let unfinished = totalUnfinished;
  if (tab === "personal") { finished = personalPassed; unfinished = personalUnfinished; }
  if (tab === "mental")   { finished = metabolicPassed; unfinished = metabolicUnfinished; }

  /* ---------------- CHART DATA (main trend) ---------------- */
  const mergedData = useMemo(() => {
    const monthly = {};
    MONTHS.forEach((m, i) => {
      monthly[i + 1] = { name: m, finished: 0, abandoned: 0 };
    });
    testStats.forEach((t) => {
      const { month, testType, status } = t._id;
      if (!month) return;
      if (tab === "personal" && testType !== "personal") return;
      if (tab === "mental"   && testType !== "metabolic") return;
      if (status === "passed")  monthly[month].finished  += t.count;
      if (status === "started") monthly[month].abandoned += t.count;
    });
    Object.values(monthly).forEach((m) => {
      m.abandoned = Math.max(m.abandoned - m.finished, 0);
    });
    return Object.values(monthly);
  }, [testStats, tab]);

  /* ---------------- CATEGORY CHART DATA (personal tab) ---------------- */
  const categoryChartData = useMemo(() =>
    personalCategories.map((row) => ({
      name: row._id,
      avg: parseFloat(row.averageScore?.toFixed(1)) || 0,
    })),
  [personalCategories]);

  /* ---------------- LOGIN ---------------- */
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "#Blu@2026") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f3f4f6", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: "white", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)", width: "100%", maxWidth: "380px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#111827", fontSize: "1.5rem", fontWeight: "600" }}>Admin Login</h2>

          {loginError && (
            <div style={{ color: "#b91c1c", backgroundColor: "#fee2e2", padding: "0.75rem", borderRadius: "6px", marginBottom: "1.5rem", textAlign: "center", fontSize: "0.875rem", border: "1px solid #f87171" }}>
              {loginError}
            </div>
          )}

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontSize: "0.875rem", fontWeight: "500" }}>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", fontSize: "1rem" }} />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontSize: "0.875rem", fontWeight: "500" }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", fontSize: "1rem" }} />
          </div>

          <button type="submit" style={{ width: "100%", padding: "0.75rem", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "6px", fontWeight: "600", fontSize: "1rem", cursor: "pointer" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="stats-page"><div className="stats-container">Loading stats...</div></div>;
  }

  /* ======================== B2B PAGE ======================== */
  if (tab === "b2b") {
    const total = b2bStats?.byIndustry?.reduce((s, d) => s + d.count, 0) ?? b2b;
    return (
      <div className="stats-page">
        <div className="stats-container">
          <div className="stats-header-main">
            <h2>Stats</h2>
            <TabBar tab={tab} setTab={setTab} />
          </div>

          {/* Top cards */}
          <section className="stats-section">
            <h3>Formulaire B2B</h3>
            <div className="general-cards">
              <div className="stat-card highlight">
                <span className="card-value">{total}</span>
                <span className="card-label">Total soumissions B2B</span>
              </div>
              <div className="stat-card">
                <span className="card-value">{b2bStats?.byIndustry?.length ?? 0}</span>
                <span className="card-label">Industries représentées</span>
              </div>
              <div className="stat-card">
                <span className="card-value">{b2bStats?.byService?.length ?? 0}</span>
                <span className="card-label">Services demandés</span>
              </div>
            </div>
          </section>

          {/* Trend graph */}
          <section className="stats-section">
            <h3>Tendance mensuelle</h3>
            <TrendChart byMonth={b2bStats?.byMonth} color="#00296F" label="Soumissions B2B" />
          </section>

          {/* Bar charts */}
          <section className="stats-section">
            <h3>Statistiques détaillées</h3>
            <div className="detail-charts-grid">
              <div className="chart-container">
                <p className="chart-subtitle">Par industrie</p>
                <MiniBarChart data={b2bStats?.byIndustry} color="#00296F" height={260} />
              </div>
              <div className="chart-container">
                <p className="chart-subtitle">Par taille d'entreprise</p>
                <MiniBarChart data={b2bStats?.bySize} color="#06b6d4" height={260} />
              </div>
              <div className="chart-container detail-chart-full">
                <p className="chart-subtitle">Par service d'intérêt</p>
                <MiniBarChart data={b2bStats?.byService} color="#8b5cf6" height={260} />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* ======================== JOIN US PAGE ======================== */
  if (tab === "joinus") {
    const total = joinUsStats?.byProfession?.reduce((s, d) => s + d.count, 0) ?? joinUs;
    return (
      <div className="stats-page">
        <div className="stats-container">
          <div className="stats-header-main">
            <h2>Stats</h2>
            <TabBar tab={tab} setTab={setTab} />
          </div>

          {/* Top cards */}
          <section className="stats-section">
            <h3>Formulaire Join Us</h3>
            <div className="general-cards">
              <div className="stat-card highlight">
                <span className="card-value">{total}</span>
                <span className="card-label">Total soumissions Join Us</span>
              </div>
              <div className="stat-card">
                <span className="card-value">{joinUsStats?.byProfession?.length ?? 0}</span>
                <span className="card-label">Professions représentées</span>
              </div>
              <div className="stat-card">
                <span className="card-value">{joinUsStats?.byCredential?.length ?? 0}</span>
                <span className="card-label">Types de credentials</span>
              </div>
            </div>
          </section>

          {/* Trend graph */}
          <section className="stats-section">
            <h3>Tendance mensuelle</h3>
            <TrendChart byMonth={joinUsStats?.byMonth} color="#10b981" label="Soumissions Join Us" />
          </section>

          {/* Bar charts */}
          <section className="stats-section">
            <h3>Statistiques détaillées</h3>
            <div className="detail-charts-grid">
              <div className="chart-container">
                <p className="chart-subtitle">Par profession</p>
                <MiniBarChart data={joinUsStats?.byProfession} color="#10b981" height={260} />
              </div>
              <div className="chart-container">
                <p className="chart-subtitle">Par années de pratique</p>
                <MiniBarChart data={joinUsStats?.byYears} color="#f59e0b" height={260} />
              </div>
              <div className="chart-container detail-chart-full">
                <p className="chart-subtitle">Par credentials / statut</p>
                <MiniBarChart data={joinUsStats?.byCredential} color="#8b5cf6" height={260} />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* ======================== TESTS PAGES (total / personal / mental) ======================== */
  return (
    <div className="stats-page">
      <div className="stats-container">
        {/* HEADER */}
        <div className="stats-header-main">
          <h2>Stats</h2>
          <TabBar tab={tab} setTab={setTab} />
        </div>

        {/* GENERAL STATS */}
        <section className="stats-section">
          <h3>Statistique général</h3>

          <div className="general-cards">
            {tab === "total" ? (
              <>
                <div className="stat-card">
                  <span className="card-value">{totalPassed}</span>
                  <span className="card-label">Total Test finis</span>
                </div>
                <div className="stat-card">
                  <span className="card-value">{totalUnfinished}</span>
                  <span className="card-label">Total Test non finis</span>
                </div>
                <div className="stat-card highlight">
                  <span className="card-value">{joinUs}</span>
                  <span className="card-label">Nombre de Join us</span>
                </div>
                <div className="stat-card highlight">
                  <span className="card-value">{b2c}</span>
                  <span className="card-label">Formulaire B2C</span>
                </div>
                <div className="stat-card highlight">
                  <span className="card-value">{b2b}</span>
                  <span className="card-label">Formulaire B2B</span>
                </div>
              </>
            ) : (
              <>
                <div className="stat-card">
                  <span className="card-value">{finished}</span>
                  <span className="card-label">Test finis</span>
                </div>
                <div className="stat-card">
                  <span className="card-value">{unfinished}</span>
                  <span className="card-label">Test non finis</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* CATEGORY TABLE + CHART (personal tab) */}
        {tab === "personal" && (
          <section className="stats-section">
            <h3>Statistique par categorie</h3>

            <div className="table-wrapper">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Catégorie</th>
                    <th>Moyen général</th>
                  </tr>
                </thead>
                <tbody>
                  {personalCategories.length === 0 ? (
                    <tr><td colSpan={2}>No data available</td></tr>
                  ) : (
                    personalCategories.map((row, i) => (
                      <tr key={i}>
                        <td>{row._id}</td>
                        <td>{row.averageScore?.toFixed(1)} points</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {categoryChartData.length > 0 && (
              <div className="chart-container" style={{ marginTop: "30px" }}>
                <p className="chart-subtitle">Average score per category</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={categoryChartData} margin={{ top: 5, right: 10, left: -10, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-35} textAnchor="end" interval={0} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => [`${v} pts`, "Average"]} />
                    <Bar dataKey="avg" name="Avg Score" radius={[4, 4, 0, 0]}>
                      {categoryChartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        )}

        {/* MAIN TREND CHART */}
        <section className="stats-section">
          <h3>Test Activity Trend (12 Months)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={mergedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="finished"  fill="#36a2eb" radius={[4, 4, 0, 0]} name="Tests Finished" />
                <Bar dataKey="abandoned" fill="#ff9f40" radius={[4, 4, 0, 0]} name="Tests Abandoned" />
                <Line type="monotone" dataKey="finished" stroke="#ff6384" strokeWidth={3} dot={false} name="Trend" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---- Tab bar extracted as reusable component ---- */
function TabBar({ tab, setTab }) {
  const tabs = [
    { key: "total",    label: "Total" },
    { key: "personal", label: "Personal capacity" },
    { key: "mental",   label: "Metabolic health" },
    { key: "b2b",      label: "B2B Form" },
    { key: "joinus",   label: "Join Us" },
  ];
  return (
    <div className="tab-switch">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={tab === t.key ? "active" : ""}
          onClick={() => setTab(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
