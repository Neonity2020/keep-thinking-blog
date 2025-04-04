import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: string;
  tags: string[];
  content: string;
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    // 尝试直接使用ID作为文件名
    let fullPath = path.join(postsDirectory, `${id}.md`);
    
    // 如果文件不存在，尝试在目录中查找匹配的文件
    if (!fs.existsSync(fullPath)) {
      const fileNames = fs.readdirSync(postsDirectory);
      const matchingFile = fileNames.find(fileName => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        return data.id === id;
      });
      
      if (matchingFile) {
        fullPath = path.join(postsDirectory, matchingFile);
      } else {
        return null;
      }
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: data.id,
      title: data.title,
      date: data.date,
      author: data.author,
      readTime: data.readTime,
      tags: data.tags,
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        try {
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // 确保所有必需的字段都存在
          if (!data.id || !data.title || !data.date || !data.author || !data.readTime || !data.tags) {
            console.warn(`跳过文件 ${fileName}：缺少必需的元数据字段`);
            return null;
          }

          return {
            id: data.id,
            title: data.title,
            date: data.date,
            author: data.author,
            readTime: data.readTime,
            tags: data.tags,
            content,
          };
        } catch (error) {
          console.error(`处理文件 ${fileName} 时出错：`, error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null);

    return allPostsData.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  } catch (error) {
    console.error('获取博客文章时出错：', error);
    return [];
  }
} 