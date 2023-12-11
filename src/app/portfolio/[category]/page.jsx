// react/next stuff
import Image from 'next/image';

// components
import LinkButton from '@/components/Buttons/LinkButton';
import { notFound } from 'next/navigation';
import ScrollButton from '@/components/ScrollButton/ScrollButton';

// data
import { itemsPortfolio } from '@/utils/data';

// style
import styles from './page.module.css';

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
    <main>
      <header>
        <h2 className={styles.catTitle}>{params.category}</h2>
      </header>
      {data.map((item) => (
        <section key={item.id} className={styles.item}>
          <div className={styles.content}>
            <header>
              <h3 className={styles.title}>{item.title}</h3>
            </header>
            <p className={styles.description}>{item.desc}</p>
            <LinkButton
              title={'Click to see live project'}
              openInNewTab={true}
              text={'See More'}
              url={item.url}
            />
          </div>
          <div className={styles.imgContainer}>
            <Image
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={item.image}
              alt="jovic-dev"
            />
          </div>
        </section>
      ))}
      <ScrollButton />
    </main>
  );
}

export default Category;
