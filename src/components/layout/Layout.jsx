import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileNav from './MobileNav';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-cyber-bg transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <main className="flex-1 p-4 md:p-6 pb-32 md:pb-6">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
};

export default Layout;
