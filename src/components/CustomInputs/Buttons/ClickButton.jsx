'use client';

function ClickButton({ children, onClick, title, buttonStyle, disabled }) {
  // by default it has button class if nothing declared
  const combinedStyles = `${buttonStyle || 'button'} ${
    disabled ? 'disabledButton' : ''
  }`;

  return (
    <button
      title={title}
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ClickButton;
