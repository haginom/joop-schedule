import { FaAlignLeft, FaUser, FaPlus, FaSearch } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Navbar";
import { useDashboardContext } from "../pages/Dashboard";
import LogoutContainer from "./Logout";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
