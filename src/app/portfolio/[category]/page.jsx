// components
import { notFound } from 'next/navigation';
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';
import ProjectsCard from '@/components/UIComponents/Cards/ProjectsCard';
import JustLinks from './JustLinks';

// data
import { itemsPortfolio } from '@/utils/allData/mainPortfolio';

// style
import styles from './page.module.css';

// Static metadata
export const metadata = {
  title: 'Portfolio of Jović Miroslav',
  description: 'Portfolio of Jović Miroslav on the web. Look at my works',
};

function getData(categoryObject) {
  const data = itemsPortfolio[categoryObject];

  if (data) {
    return data;
  }

  return notFound();
}

function Category({ params }) {
  const data = getData(params.category);

  return (
    <>
      <JustLinks />
      <header>
        <h2 className={styles.catTitle}>{params.category}</h2>
      </header>
      <ProjectsCard projects={data} />
      <ScrollButton />
    </>
  );
}

export default Category;
