import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
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
        <ul>
          <li>2024年3月</li>
          <li>2024年2月</li>
          <li>2024年1月</li>
        </ul>
      </div>
    </div>
  );
} 