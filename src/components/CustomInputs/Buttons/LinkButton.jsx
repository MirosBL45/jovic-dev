// react/next stuff
import Link from 'next/link';

function LinkButton({ text, url, openInNewTab, title, buttonStyle }) {
  const linkProps = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  // by default it has button class if nothing declared
  const combinedStyles = `${buttonStyle || 'button'}`;

  return (
    <Link title={title} href={url} {...linkProps} className={combinedStyles}>
      {text}
    </Link>
  );
}

export default LinkButton;
