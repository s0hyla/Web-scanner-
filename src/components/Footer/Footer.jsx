import "./Footer.css";
function Footer() {
  const currentDate = new Date();
  return (
    <footer>
      <p>
        &copy; {currentDate.getFullYear()}. CMS Scanner. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
