'use client';

// react/next stuff
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// components
import { TabTitle } from '@/utils/GeneralFunctions';

// style
import styles from './page.module.css';

function Dashboard() {
  useEffect(() => {
    TabTitle('Jovic-dev Dashboard');
  }, []);

  const session = useSession();
  const router = useRouter();

  if (session.status === 'loading') {
    return <p>Loading User...</p>;
  }

  if (session.status === 'unauthenticated') {
    router?.push('/dashboard/login');
  }

  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, error, isLoading } = useSWR(
  //   'https://jsonplaceholder.typicode.com/posts',
  //   fetcher
  // );

  // console.log(data);

  if (session.status === 'authenticated') {
    return <div>You are in Dashboard</div>;
  }
}

export default Dashboard;
