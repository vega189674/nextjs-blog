import { useState, useEffect } from 'react';
import styles from '../styles/Sidebar.module.css';
import Link from 'next/link';
import MenuButton from './MenuButton';

export default function Sidebar() {
  const [archiveData, setArchiveData] = useState({});
  const [expandedMonths, setExpandedMonths] = useState({});
  const [appsData, setAppsData] = useState([]);
  const [isHobbyExpanded, setIsHobbyExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // アーカイブデータの取得
    fetch('/api/archive')
      .then(response => response.json())
      .then(data => setArchiveData(data))
      .catch(error => console.error('アーカイブデータの取得に失敗しました:', error));

    // WEBアプリデータの取得
    fetch('/api/apps')
      .then(response => response.json())
      .then(data => setAppsData(data))
      .catch(error => console.error('アプリデータの取得に失敗しました:', error));
  }, []);

  const toggleMonth = (month) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <MenuButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
      {/* オーバーレイ */}
      <div 
        className={`${styles.overlay} ${isSidebarOpen ? styles.visible : ''}`}
        onClick={closeSidebar}
      />
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          <h3>プロフィール</h3>
          <p>ブログ作成者の紹介文をここに記載します。</p>
          
          <h3>カテゴリー</h3>
          <ul className={styles.categoryTree}>
            <li>技術記事</li>
            <li>日記</li>
            <li>
              <div 
                className={styles.categoryToggle}
                onClick={() => setIsHobbyExpanded(!isHobbyExpanded)}
              >
                <span className={styles.arrow}>
                  {isHobbyExpanded ? '▼' : '▶'}
                </span>
                趣味
              </div>
              {isHobbyExpanded && (
                <ul className={styles.appList}>
                  {appsData.map(app => (
                    <li key={app.id}>
                      <Link href={app.path}>
                        {app.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          <h3>アーカイブ</h3>
          <ul className={styles.archiveTree}>
            {Object.entries(archiveData).map(([month, data]) => (
              <li key={month}>
                <div 
                  className={styles.monthToggle}
                  onClick={() => toggleMonth(month)}
                >
                  <span className={styles.arrow}>
                    {expandedMonths[month] ? '▼' : '▶'}
                  </span>
                  {month}
                  <span className={styles.count}>
                    ({data.posts.length})
                  </span>
                </div>
                {expandedMonths[month] && (
                  <ul className={styles.postList}>
                    {data.posts.map(post => (
                      <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
} 