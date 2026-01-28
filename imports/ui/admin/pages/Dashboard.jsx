import React from 'react';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  return (
    <>
      <h1>System Overview</h1>
      <div style={{ display: 'flex', gap: 16 }}>
        <StatCard title="Total Users" value="—" />
        <StatCard title="Pending Payouts" value="—" />
        <StatCard title="System Status" value="LIVE" />
      </div>
    </>
  );
}
