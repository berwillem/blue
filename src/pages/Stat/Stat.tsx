// @ts-nocheck
import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import './Stat.css';

const MOCK_DATA = {
  personal: {
    finished: 40,
    pending: 400,
    categories: [
      { name: "Energy & daily symptoms", mean: 12, date: "06 / 02 / 2026" },
      { name: "Body composition & weight", mean: 12, date: "06 / 02 / 2026" },
    ],
    chart: [
      { name: 'Jan', ds1: -85, ds2: -90 }, { name: 'Feb', ds1: -45, ds2: 30 },
      { name: 'Mar', ds1: -38, ds2: 70 }, { name: 'Apr', ds1: -35, ds2: -45 },
      { name: 'May', ds1: -55, ds2: -25 }, { name: 'Jun', ds1: 65, ds2: 60 },
      { name: 'Jul', ds1: 75, ds2: -55 },
    ],
    barData: [
      { name: 'Jan', val: 400 }, { name: 'Feb', val: 300 }, { name: 'Mar', val: 600 },
      { name: 'Apr', val: 800 }, { name: 'May', val: 500 }, { name: 'Jun', val: 900 },
      { name: 'Jul', val: 700 }, { name: 'Aug', val: 600 }, { name: 'Sep', val: 850 },
      { name: 'Oct', val: 450 }, { name: 'Nov', val: 700 }, { name: 'Dec', val: 950 },
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
      { name: 'Jan', ds1: 10, ds2: 20 }, { name: 'Feb', ds1: 30, ds2: 40 },
      { name: 'Mar', ds1: 50, ds2: 60 }, { name: 'Jul', ds1: 95, ds2: 85 },
    ],
    barData: Array(12).fill(0).map((_, i) => ({ name: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i], val: Math.floor(Math.random() * 500) }))
  },
  total: {
    finished: 65,
    pending: 550,
    active_users: 1200,
    completion_rate: "75%",
    categories: [{ name: "Global Overview", mean: 14, date: "06 / 02 / 2026" }],
    chart: [
      { name: 'Jan', ds1: 10, ds2: 20 }, { name: 'Feb', ds1: 30, ds2: 40 },
      { name: 'Mar', ds1: 50, ds2: 60 }, { name: 'Jul', ds1: 95, ds2: 85 },
    ], // On peut combiner ou laisser vide
    barData: Array(12).fill(0).map((_, i) => ({ name: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i], val: 1200 }))
  }
};

export default function Stat() {
  const [tab, setTab] = useState<'personal' | 'mental' | 'total'>('personal');
  const data = MOCK_DATA[tab];

  return (
    <div className="stats-page">
      <div className="stats-container">
        {/* TOP NAVIGATION */}
        <div className="stats-header-main">
          <h2>Stats</h2>
          <div className="tab-switch">
             <button className={tab === 'total' ? 'active' : ''} onClick={() => setTab('total')}>Total</button>
            <button className={tab === 'personal' ? 'active' : ''} onClick={() => setTab('personal')}>Personal capacity</button>
            <button className={tab === 'mental' ? 'active' : ''} onClick={() => setTab('mental')}>Mental health</button>
           
          </div>
        </div>

        {/* GENERAL STATS CARDS */}
        <section className="stats-section">
          <h3>Statistique général</h3>
          <div className="general-cards">
            {tab === 'total' ? (
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
                  <span className="card-label">Utilisateurs Actifs</span>
                </div>
                <div className="stat-card highlight">
                  <span className="card-value">{data.completion_rate}</span>
                  <span className="card-label">Taux de complétion</span>
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
        {/* BAR CHART SECTION (12 MONTHS) */}
        <section className="stats-section">
          <h3>Volume d'activité (12 mois)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="val" fill="#36a2eb" radius={[4, 4, 0, 0]} name="Volume" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        {/* LINE CHART SECTION (Evolution) */}
       
          <section className="stats-section">
            <h3>Graphe d'évolution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.chart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" domain={[-100, 100]} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={50} />
                  <Line yAxisId="left" type="monotone" dataKey="ds1" stroke="#ff6384" strokeWidth={2} dot={{ r: 4 }} />
                  <Line yAxisId="left" type="monotone" dataKey="ds2" stroke="#36a2eb" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        
      </div>
    </div>
  );
}