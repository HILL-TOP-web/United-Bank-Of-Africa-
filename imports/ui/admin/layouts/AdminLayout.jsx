import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: 220 }}>
        <h3>Admin</h3>
        <nav>
          <Link to="/admin">Dashboard</Link><br />
          <Link to="/admin/payouts">Payouts</Link><br />
          <Link to="/admin/users">Users</Link>
        </nav>
      </aside>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
