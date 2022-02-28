import Rota from 'pages/Rota';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.parent}>
      <header>Header</header>
      <main>
        <Routes>
          <Route path="rota" element={<Rota />} />
        </Routes>
      </main>
      <footer>
        <ul>
          <li>视图</li>
          <li>搜索</li>
          <li>通知</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
