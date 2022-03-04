import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.parent}>
      <header>Header</header>
      <main>
        <Outlet />
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
