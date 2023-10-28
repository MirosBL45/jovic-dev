function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div>&copy;{currentYear} jovic-dev. All rights reserved.</div>
      <div></div>
    </div>
  );
}

export default Footer;
