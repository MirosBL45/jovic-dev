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
  title: `Jović Miroslav's Blog | Frontend Developer`,
  description:
    'Blog of Jović Miroslav on the web. Read the latest interesting blogs about frontend development. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development',
  twitter: {
    title: `Jović Miroslav's Blog | Frontend Developer`,
    description:
      'Blog of Jović Miroslav on the web. Read the latest interesting blogs about frontend development. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development',
  },
  openGraph: {
    title: `Jović Miroslav's Blog | Frontend Developer`,
    description:
      'Blog of Jović Miroslav on the web. Read the latest interesting blogs about frontend development. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development',
  },
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
      {/* <ScrollButton /> */}
    </>
  );
}

export default Blog;
