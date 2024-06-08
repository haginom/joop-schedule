import Wrapper from "../assets/wrappers/BigSidebar";
import { NavLinks } from ".";
import { useDashboardContext } from "../pages/Dashboard";

const BigSidebar = () => {
  const { showSidebar, families } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          !showSidebar ? `sidebar-container show-sidebar` : `sidebar-container`
        }
      >
        <div className="content">
          <header></header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
