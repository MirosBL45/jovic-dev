'use client';

// react/next stuff
import useSWR from 'swr';

// style
import styles from './page.module.css';

// Static metadata
// export const metadata = {
//   title: 'Jovic-dev Dashboard',
//   description: 'Dashboard Jovic Miroslav on web',
// };

function Dashboard() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

  console.log(data);

  return <div>Dashboard</div>;
}

export default Dashboard;
