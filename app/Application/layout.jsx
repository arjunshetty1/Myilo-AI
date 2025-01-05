import Navbar from "../../components/App Components/Navbar";
import ActiveComponentContext from "../../context/app/ActiveComponentContext";

const layout = ({ children }) => {
  return (
    <div>
      <ActiveComponentContext>
        <Navbar />
        <main>{children}</main>
      </ActiveComponentContext>
    </div>
  );
};

export default layout;
