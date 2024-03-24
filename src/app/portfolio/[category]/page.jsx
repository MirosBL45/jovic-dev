// react/next stuff
import Image from 'next/image';

// components
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';
import { notFound } from 'next/navigation';
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';
import SinglePortfolioCard from '@/components/UIComponents/Cards/SinglePortfolioCard';

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
      <header>
        <h2 className={styles.catTitle}>{params.category}</h2>
      </header>
      <SinglePortfolioCard data={data} />
      {/* <main className={styles.allSections}>
        {data.map((item) => (
          <section key={item.id} className={styles.item}>
            <div className={styles.content}>
              <header>
                <h3>{item.title}</h3>
              </header>
              {item.desc.split('||').map((paragraph, index) => (
                <p key={index} className={styles.description}>
                  {paragraph}
                </p>
              ))}
              <LinkButton
                title={'Click to see live project'}
                openInNewTab={true}
                text={'See Live'}
                url={item.url}
              />
            </div>
            <div className={styles.imgContainer}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={item.image}
                alt="Miroslav Jovic - Frontend Developer"
              />
            </div>
          </section>
        ))}
      </main> */}
      <ScrollButton />
    </>
  );
}

export default Category;
