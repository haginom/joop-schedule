import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import Wrapper from "../assets/wrappers/DashboardLayout";
import { createContext, useState, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const data = await customFetch.get("/users/current-user");
    if (data.data.user.role === "admin") {
      const families = await customFetch.get("/family/all-families");
      return { user: data.data.user, families: families.data.families };
    } else return data.data;
  } catch (error) {
    return redirect("/login");
  }
};

const DashboardContext = createContext();

const Dashboard = () => {
  const { user, families } = useLoaderData(loader);

  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const logoutUser = async () => {
    navigate("/login");
    await customFetch.get("/auth/logout");
    toast.success("Logout successful");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        families,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export default Dashboard;
