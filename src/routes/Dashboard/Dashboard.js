import React from 'react';

const Dashboard = () => {
  return (
    <div className="block pt-24">
      <h2>Dashboard</h2>
      <h4>Environment: </h4>
      <p>{process.env.REACT_APP_AUTH_DOMAIN}</p>
    </div>
  );
};

export default Dashboard;
