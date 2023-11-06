// react/next stuff
import Image from 'next/image';

// components
import Button from '@/components/Button/Button';
import { notFound } from 'next/navigation';

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
    <div>
      <h2 className={styles.catTitle}>{params.category}</h2>
      {data.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.content}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.desc}</p>
            <Button text={'See More'} url={'#'} />
          </div>
          <div className={styles.imgContainer}>
            <Image
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={item.image}
              alt="jovic-dev"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Category;
