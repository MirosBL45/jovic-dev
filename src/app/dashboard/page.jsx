'use client';

// react/next stuff
import useSWR from 'swr';

// components
import { TabTitle } from '@/utils/GeneralFunctions';

// style
import styles from './page.module.css';

function Dashboard() {
  TabTitle('Jovic-dev Dashboard');
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, error, isLoading } = useSWR(
  //   'https://jsonplaceholder.typicode.com/posts',
  //   fetcher
  // );

  // console.log(data);

  return <div>Dashboard</div>;
}

export default Dashboard;
