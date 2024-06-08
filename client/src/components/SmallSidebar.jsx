import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/Dashboard";
import { NavLinks } from ".";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? `sidebar-container show-sidebar` : `sidebar-container`
        }
      >
        <div className="content">
          <button type="button" className="close-btn">
            <FaTimes onClick={toggleSidebar} />
          </button>
          <header></header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
