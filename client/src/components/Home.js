import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to My App!</h1>
      <p>This is the homepage of our application.</p>
      <p>Feel free to explore and navigate to other pages using the navigation menu.</p>
      
      {/* Navigation buttons */}
      <div>
        <Link to="/data"><button>Data</button></Link>
        <Link to="/dtc"><button>DTC</button></Link>
        {/* Add more buttons for other pages/components */}
      </div>
    </div>
  );
};

export default Home;