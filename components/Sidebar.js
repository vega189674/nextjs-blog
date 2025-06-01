import { useState, useEffect } from 'react';
import styles from '../styles/Sidebar.module.css';
import Link from 'next/link';

export default function Sidebar() {
  const [archiveData, setArchiveData] = useState({});
  const [expandedMonths, setExpandedMonths] = useState({});

  useEffect(() => {
    fetch('/api/archive')
      .then(response => response.json())
      .then(data => setArchiveData(data))
      .catch(error => console.error('アーカイブデータの取得に失敗しました:', error));
  }, []);

  const toggleMonth = (month) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <h3>プロフィール</h3>
        <p>ブログ作成者の紹介文をここに記載します。</p>
        
        <h3>カテゴリー</h3>
        <ul>
          <li>技術記事</li>
          <li>日記</li>
          <li>趣味</li>
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
  );
} 