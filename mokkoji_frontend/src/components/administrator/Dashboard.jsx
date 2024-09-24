import React from "react";

const Dashboard = () => {


  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Overview of the application statistics.</p>
      <div className="stats-grid">
        <div className="stat-box">
          <h3>Users</h3>
          <p>100</p>
        </div>
        <div className="stat-box">
          <h3>Orders</h3>
          <p>250</p>
        </div>
        <div className="stat-box">
          <h3>Revenue</h3>
          <p>$5000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
