import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://b-lime.vercel.app/');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>IoT Dashboard</h1>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.temperature}</td>
                  <td>{item.humidity}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </header>
    </div>
  );
};

export default App;
