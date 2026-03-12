// @ts-nocheck
import React, { useState, useMemo, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./Stat.css";

import {
  getFormStats,
  getTestStats,
  getPersonalAverages,
} from "../../services/statsService";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Stat() {
  const [tab, setTab] = useState("total");

  const [formStats, setFormStats] = useState(null);
  const [testStats, setTestStats] = useState([]);
  const [personalCategories, setPersonalCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH MAIN DATA ---------------- */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [formsRes, testsRes] = await Promise.all([
          getFormStats(),
          getTestStats(),
        ]);

        setFormStats(formsRes.data);
        setTestStats(testsRes.data);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  /* ---------------- FETCH PERSONAL CATEGORIES ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      if (tab !== "personal") return;

      try {
        const res = await getPersonalAverages();
        setPersonalCategories(res.data);
      } catch (error) {
        console.error("Error loading personal categories:", error);
      }
    };

    fetchCategories();
  }, [tab]);
  console.log("Test stats:", testStats);
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

  /* ---------------- CURRENT TAB VALUES ---------------- */
  let finished = totalPassed;
  let unfinished = totalUnfinished;

  if (tab === "personal") {
    finished = personalPassed;
    unfinished = personalUnfinished;
  }

  if (tab === "mental") {
    finished = metabolicPassed;
    unfinished = metabolicUnfinished;
  }

  /* ---------------- CHART DATA ---------------- */
  const mergedData = useMemo(() => {
    const monthly = {};

    MONTHS.forEach((m, i) => {
      monthly[i + 1] = {
        name: m,
        finished: 0,
        abandoned: 0,
      };
    });

    testStats.forEach((t) => {
      const { month, testType, status } = t._id;

      if (!month) return;

      if (tab === "personal" && testType !== "personal") return;
      if (tab === "mental" && testType !== "metabolic") return;

      if (status === "passed") {
        monthly[month].finished += t.count;
      }

      if (status === "started") {
        monthly[month].abandoned += t.count;
      }
    });

    // convert started -> abandoned
    Object.values(monthly).forEach((m) => {
      m.abandoned = Math.max(m.abandoned - m.finished, 0);
    });

    return Object.values(monthly);
  }, [testStats, tab]);

  if (loading) {
    return <div className="stats-page">Loading stats...</div>;
  }

  return (
    <div className="stats-page">
      <div className="stats-container">
        {/* HEADER */}
        <div className="stats-header-main">
          <h2>Stats</h2>

          <div className="tab-switch">
            <button
              className={tab === "total" ? "active" : ""}
              onClick={() => setTab("total")}
            >
              Total
            </button>

            <button
              className={tab === "personal" ? "active" : ""}
              onClick={() => setTab("personal")}
            >
              Personal capacity
            </button>

            <button
              className={tab === "mental" ? "active" : ""}
              onClick={() => setTab("mental")}
            >
              Mental health
            </button>
          </div>
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

        {/* CATEGORY TABLE */}
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
                    <tr>
                      <td colSpan="2">No data available</td>
                    </tr>
                  ) : (
                    personalCategories.map((row, i) => (
                      <tr key={i}>
                        <td>{row._id}</td>
                        <td>{row.averageScore} points</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* CHART */}
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

                <Bar
                  dataKey="finished"
                  fill="#36a2eb"
                  radius={[4, 4, 0, 0]}
                  name="Tests Finished"
                />

                <Bar
                  dataKey="abandoned"
                  fill="#ff9f40"
                  radius={[4, 4, 0, 0]}
                  name="Tests Abandoned"
                />

                <Line
                  type="monotone"
                  dataKey="finished"
                  stroke="#ff6384"
                  strokeWidth={3}
                  dot={false}
                  name="Trend"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
