import Footer from './Footer';
import Navbar from './Navbar';
interface props {
  children: JSX.Element;
}
const Layout: React.FC<props> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
