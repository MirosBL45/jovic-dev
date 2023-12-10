// style
import '@/app/globals.css';

function Layout({ children }) {
  return (
    <div className="layoutContainerAll">
      <h1>My Work</h1>
      {children}
    </div>
  );
}

export default Layout;
