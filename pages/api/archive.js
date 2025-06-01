import { getSortedPostsData } from '../../lib/posts';

export default function handler(req, res) {
  const allPosts = getSortedPostsData();
  const archiveData = {};

  allPosts.forEach((post) => {
    const date = new Date(post.date);
    const yearMonth = `${date.getFullYear()}年${date.getMonth() + 1}月`;
    
    if (!archiveData[yearMonth]) {
      archiveData[yearMonth] = {
        expanded: false,
        posts: []
      };
    }
    
    archiveData[yearMonth].posts.push({
      id: post.id,
      title: post.title,
      date: post.date
    });
  });

  // 年月でソート（降順）
  const sortedArchive = Object.entries(archiveData)
    .sort(([a], [b]) => {
      const dateA = new Date(a.replace(/年|月/g, '-'));
      const dateB = new Date(b.replace(/年|月/g, '-'));
      return dateB - dateA;
    })
    .reduce((sorted, [key, value]) => {
      sorted[key] = value;
      return sorted;
    }, {});

  res.status(200).json(sortedArchive);
} 