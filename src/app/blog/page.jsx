// components
import BlogsCard from '@/components/UIComponents/Cards/BlogsCard';
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';
import { BASE_API_URL } from '@/utils/constants';

// function for catching data
async function getData() {
  const res = await fetch(`${BASE_API_URL}/api/posts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// Static metadata
export const metadata = {
  title: `Jović Miroslav's Blog`,
  description:
    'Blog of Jović Miroslav on the web. Read the latest interesting blogs',
};

async function Blog() {
  // check for url
  if (!BASE_API_URL) {
    return (
      <p style={{ marginTop: '150px', fontSize: '45px' }}>conection failed</p>
    );
  }

  const data = await getData();

  return (
    <>
      <BlogsCard data={data} />
      <ScrollButton />
    </>
  );
}

export default Blog;
