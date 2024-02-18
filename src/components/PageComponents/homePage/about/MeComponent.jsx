// react/next stuff
import Image from 'next/image';

// style
import styles from './about.module.css';
import '@/app/globals.css';

function MeComponent({ element, mainHeadline, headlineText, image }) {
  const ElementTag = element;
  return (
    <header className={styles.imgText}>
      <div className={styles.justText}>
        <ElementTag>{mainHeadline}</ElementTag>
        <p>{headlineText}</p>
      </div>
      <Image src={image} alt="jovic-dev" width={0} height={0} sizes="100vw" />
    </header>
  );
}

export default MeComponent;
