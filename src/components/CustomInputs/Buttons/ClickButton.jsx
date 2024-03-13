'use client';

function ClickButton({ children, onClick, title, buttonStyle }) {
  // by default it has button class if nothing declared
  const combinedStyles = `${buttonStyle || 'button'}`;

  return (
    <button title={title} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}

export default ClickButton;
