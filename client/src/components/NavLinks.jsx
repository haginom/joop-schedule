import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../pages/Dashboard";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const NavLinks = ({ isBigSidebar }) => {
  const [showAdminSublinks, setShowAdminSublinks] = useState(false);
  const { toggleSidebar, user, showSidebar, families } = useDashboardContext();
  const extraLinks = families.map((family) => {
    return {
      id: family._id,
      name: family.childName,
      path: `/dashboard/admin/family/${family._id}`,
      icon: "fas fa-users",
    };
  });

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === "admin" && role === "admin") {
          return (
            <div key={text}>
              <NavLink to={path} className="nav-link nav-link-sub" end>
                <span className="icon">{icon}</span>
                <div className="dropdown">
                  {text}
                  <button
                    className={`toggle-sublinks ${
                      showAdminSublinks ? "active" : ""
                    }`}
                    onClick={() => setShowAdminSublinks(!showAdminSublinks)}
                  >
                    <IoIosArrowDown
                      className={`rotate ${!showAdminSublinks ? "active" : ""}`}
                    />
                  </button>
                </div>
              </NavLink>

              {showAdminSublinks && (
                <div className="sublinks">
                  {extraLinks.map((sublink) => (
                    <NavLink
                      to={sublink.path}
                      key={`${text}-${sublink.id}`}
                      className="nav-link"
                    >
                      {sublink.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? null : toggleSidebar}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
