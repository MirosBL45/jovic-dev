// react/next stuff
import Image from 'next/image';

// style
import styles from './cards.module.css';

function ImageCard({ src, alt, additionalClass }) {
  return (
    <div className={`${styles.imageContainer} ${additionalClass}`}>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={src}
        alt={`${alt} | Miroslav Jovic Frontend Developer`}
        title={`${alt} | Miroslav Jovic Frontend Developer`}
      />
    </div>
  );
}

export default ImageCard;
