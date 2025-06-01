import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
 
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');
 
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
 
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
 
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
 
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
 
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
 
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
 
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getArchiveData() {
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
  return Object.entries(archiveData)
    .sort(([a], [b]) => {
      const dateA = new Date(a.replace(/年|月/g, '-'));
      const dateB = new Date(b.replace(/年|月/g, '-'));
      return dateB - dateA;
    })
    .reduce((sorted, [key, value]) => {
      sorted[key] = value;
      return sorted;
    }, {});
}