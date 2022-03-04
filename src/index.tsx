import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReportHandler } from 'web-vitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Rota from 'pages/Rota';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="schedule">
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="rota" element={<Rota />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
function sendToAnalytics(metric?: ReportHandler) {
  const body = JSON.stringify(metric);
  const url = 'https://example.com/analytics';

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}

reportWebVitals(
  process.env.NODE_ENV === 'production'
    ? sendToAnalytics
    : process.env.NODE_ENV === 'development'
    ? console.log
    : undefined
);
