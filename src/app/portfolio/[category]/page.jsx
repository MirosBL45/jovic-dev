// react/next stuff
import Image from 'next/image';

// components
import Button from '@/components/Button/Button';

// style
import styles from './page.module.css';

function Category({ params }) {
  return (
    <div>
      <h2 className={styles.catTitle}>{params.category}</h2>
      <div className={styles.item}>
        <div className={styles.content}>
          <h3 className={styles.title}>Test</h3>
          <p className={styles.description}>
            Desc Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Debitis voluptatibus animi eum earum saepe deleniti pariatur et,
            perferendis natus ex ullam necessitatibus? Reiciendis?
          </p>
          <Button text={'See More'} url={'#'} />
        </div>
        <div className={styles.imgContainer}>
          <Image
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={'/people-working2.jpg'}
            alt="jovic-dev"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.content}>
          <h3 className={styles.title}>Test</h3>
          <p className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur, fugiat. Architecto officia ducimus quaerat doloribus?
          </p>
          <Button text={'See More'} url={'#'} />
        </div>
        <div className={styles.imgContainer}>
          <Image
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={'/people-working2.jpg'}
            alt="jovic-dev"
          />
        </div>
      </div>
    </div>
  );
}

export default Category;
