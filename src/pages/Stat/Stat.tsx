// @ts-nocheck
import React, { useState, useMemo } from "react";
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

const MOCK_DATA = {
  personal: {
    finished: 40,
    pending: 400,
    categories: [
      { name: "Energy & daily symptoms", mean: 12, date: "06 / 02 / 2026" },
      { name: "Body composition & weight", mean: 12, date: "06 / 02 / 2026" },
    ],
    chart: [
      { name: "Jan", ds1: -85 },
      { name: "Feb", ds1: -45 },
      { name: "Mar", ds1: -38 },
      { name: "Apr", ds1: -35 },
      { name: "May", ds1: -55 },
      { name: "Jun", ds1: 65 },
      { name: "Jul", ds1: 75 },
    ],
    barData: [
      { name: "Jan", val: 400 },
      { name: "Feb", val: 300 },
      { name: "Mar", val: 600 },
      { name: "Apr", val: 800 },
      { name: "May", val: 500 },
      { name: "Jun", val: 900 },
      { name: "Jul", val: 700 },
      { name: "Aug", val: 600 },
      { name: "Sep", val: 850 },
      { name: "Oct", val: 450 },
      { name: "Nov", val: 700 },
      { name: "Dec", val: 950 },
    ],
  },
  mental: {
    finished: 25,
    pending: 150,
    categories: [
      { name: "Stress management", mean: 15, date: "05 / 02 / 2026" },
      { name: "Sleep quality", mean: 10, date: "05 / 02 / 2026" },
    ],
    chart: [
      { name: "Jan", ds1: 10 },
      { name: "Feb", ds1: 30 },
      { name: "Mar", ds1: 50 },
      { name: "Jul", ds1: 95 },
    ],
    barData: Array(12)
      .fill(0)
      .map((_, i) => ({
        name: [
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
        ][i],
        val: Math.floor(Math.random() * 500),
      })),
  },
  total: {
    finished: 65,
    pending: 550,
    active_users: 1200,
    completion_rate: 10,
    categories: [{ name: "Global Overview", mean: 14, date: "06 / 02 / 2026" }],
    chart: [
      { name: "Jan", ds1: 10 },
      { name: "Feb", ds1: 30 },
      { name: "Mar", ds1: 50 },
      { name: "Jul", ds1: 95 },
    ],
    barData: Array(12)
      .fill(0)
      .map((_, i) => ({
        name: [
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
        ][i],
        val: 1200,
      })),
  },
};

export default function Stat() {
  const [tab, setTab] = useState("personal");
  const data = MOCK_DATA[tab];

  // 🔥 Merge bar + trend data
  const mergedData = useMemo(() => {
    return data.barData.map((barItem) => {
      const lineItem = data.chart.find((c) => c.name === barItem.name);

      return {
        name: barItem.name,
        val: barItem.val,
        trend: lineItem ? lineItem.ds1 : null,
      };
    });
  }, [data]);

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
                  <span className="card-value">{data.finished}</span>
                  <span className="card-label">Total Test finis</span>
                </div>
                <div className="stat-card">
                  <span className="card-value">{data.pending}</span>
                  <span className="card-label">Total Test non finis</span>
                </div>
                <div className="stat-card highlight">
                  <span className="card-value">{data.active_users}</span>
                  <span className="card-label">Nombre de Join us</span>
                </div>
                <div className="stat-card highlight">
                  <span className="card-value">{data.completion_rate}%</span>
                  <span className="card-label">Formulaire B2C</span>
                </div>
              </>
            ) : (
              <>
                <div className="stat-card">
                  <span className="card-value">{data.finished}</span>
                  <span className="card-label">Test finis</span>
                </div>
                <div className="stat-card">
                  <span className="card-value">{data.pending}</span>
                  <span className="card-label">Test non finis</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* CATEGORY TABLE */}
        <section className="stats-section">
          <h3>Statistique par categorie</h3>
          <div className="table-wrapper">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Catégorie</th>
                  <th>Moyen général</th>
                  <th>Date du dernier test</th>
                </tr>
              </thead>
              <tbody>
                {data.categories.map((row, i) => (
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.mean} points</td>
                    <td>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 🔥 COMBINED CHART */}
        <section className="stats-section">
          <h3>Volume & Trend (12 mois)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={mergedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[-100, 100]}
                />
                <Tooltip />
                <Legend />

                {/* Bars */}
                <Bar
                  yAxisId="left"
                  dataKey="val"
                  fill="#36a2eb"
                  radius={[4, 4, 0, 0]}
                  name="Volume"
                />

                {/* Trend Line */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="trend"
                  stroke="#ff6384"
                  strokeWidth={4}
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
