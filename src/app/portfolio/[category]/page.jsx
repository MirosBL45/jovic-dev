// components
import { notFound } from 'next/navigation';
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';
import ProjectsCard from '@/components/UIComponents/Cards/ProjectsCard';

// data
import { itemsPortfolio } from '@/utils/allData/mainPortfolio';
import { portfolioData } from '@/utils/allData/mainPortfolio';

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
      <section className={styles.links}>
        {portfolioData.map(({ id, title, url }) => (
          <LinkButton
            key={id}
            url={url}
            text={title}
            title={`Click to see ${title}`}
            buttonStyle={'flat'}
          />
        ))}
      </section>
      <header>
        <h2 className={styles.catTitle}>{params.category}</h2>
      </header>
      <ProjectsCard projects={data} />
      <ScrollButton />
    </>
  );
}

export default Category;
