// @ts-nocheck
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import './Stat.css';

const MOCK_DATA = {
  personal: {
    finished: 40,
    pending: 400,
    categories: [
      { name: "Energy & daily symtoms", mean: 12, date: "06 / 02 / 2026" },
      { name: "Body composistion & weight", mean: 12, date: "06 / 02 / 2026" },
      { name: "Cardiometabolic indicators", mean: 12, date: "06 / 02 / 2026" },
      { name: "Lifestyle & activity", mean: 12, date: "06 / 02 / 2026" },
      { name: "Inflammation & other signs", mean: 12, date: "06 / 02 / 2026" },
      { name: "Female-specify", mean: 12, date: "06 / 02 / 2026" },
    ],
    chart: [
      { name: 'January', ds1: -85, ds2: -90 },
      { name: 'February', ds1: -45, ds2: 30 },
      { name: 'March', ds1: -38, ds2: 70 },
      { name: 'April', ds1: -35, ds2: -45 },
      { name: 'May', ds1: -55, ds2: -25 },
      { name: 'June', ds1: 65, ds2: 60 },
      { name: 'July', ds1: 75, ds2: -55 },
    ]
  },
  mental: {
    finished: 25,
    pending: 150,
    categories: [
      { name: "Stress management", mean: 15, date: "05 / 02 / 2026" },
      { name: "Sleep quality", mean: 10, date: "05 / 02 / 2026" },
    ],
    chart: [
      { name: 'January', ds1: 10, ds2: 20 },
      { name: 'February', ds1: 30, ds2: 40 },
      { name: 'March', ds1: 50, ds2: 60 },
      { name: 'April', ds1: 40, ds2: 30 },
      { name: 'May', ds1: 60, ds2: 70 },
      { name: 'June', ds1: 80, ds2: 90 },
      { name: 'July', ds1: 95, ds2: 85 },
    ]
  }
};

export default function Stat() {
  const [tab, setTab] = useState<'personal' | 'mental'>('personal');
  const data = MOCK_DATA[tab];

  return (
    <div className="stats-page">
      <div className="stats-container">
        {/* TOP NAVIGATION */}
        <div className="stats-header-main">
          <h2>Stats</h2>
          <div className="tab-switch">
            <button 
              className={tab === 'personal' ? 'active' : ''} 
              onClick={() => setTab('personal')}
            >
              Personal capacity
            </button>
            <button 
              className={tab === 'mental' ? 'active' : ''} 
              onClick={() => setTab('mental')}
            >
              Mental health
            </button>
          </div>
        </div>

        {/* GENERAL STATS */}
        <section className="stats-section">
          <h3>Statistique général</h3>
          <div className="general-cards">
            <div className="stat-card">
              <span className="card-value">{data.finished}</span>
              <span className="card-label">Test finis</span>
            </div>
            <div className="stat-card">
              <span className="card-value">{data.pending}</span>
              <span className="card-label">Test non finis</span>
            </div>
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

        {/* CHART SECTION */}
        <section className="stats-section">
          <h3>Graphe de Statistique</h3>
          <div className="chart-container">
            <p className="chart-subtitle">Chart.js Line Chart - Multi Axis</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.chart} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#eee" />
                <XAxis 
                  dataKey="name" 
                  axisLine={true} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis yAxisId="left" orientation="left" domain={[-100, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[-100, 100]} />
                <Tooltip />
                <Legend verticalAlign="top" align="center" iconType="rect" height={50} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="ds1"
                  name="Dataset 1"
                  stroke="#ff6384"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#ff6384' }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="ds2"
                  name="Dataset 2"
                  stroke="#36a2eb"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#36a2eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}