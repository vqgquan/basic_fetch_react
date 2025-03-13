import { useState, useEffect } from "react";

const FetchWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "http://api.weatherapi.com/v1/current.json?key=e69038f0aae34070936170834251303&q=Dalhousie&aqi=no"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow rounded">
        <img src="https://thenewzradar.com/wp-content/uploads/2025/01/17370228412705697465661530996979.jpg" alt="house in dalhousie" className="card-img-top"></img>
        <div className="card-body text-center">
          <h1 className="card-title display-4">
            Weather in {weather.location.name}
          </h1>
          <p className="lead">Temperature: <b>{weather.current.temp_c}°C</b></p>
          <p className="lead">Condition: <b>{weather.current.condition.text}</b></p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="img-fluid my-3"
          />
          <p className="mb-1">Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_kph} kph</p>
        </div>
      </div>
    </div>
  );
};

export default FetchWeather;
