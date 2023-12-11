// style
import '@/app/globals.css';

function Layout({ children }) {
  return (
    <div className="layoutContainerAll">
      <header>
        <h1>My Work</h1>
      </header>
      {children}
    </div>
  );
}

export default Layout;
