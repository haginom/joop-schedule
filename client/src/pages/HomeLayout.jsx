import { Outlet } from "react-router-dom";

//everything in HomeLayout but not in the Outlet will be rendered in every page
//everything in the Outlet will be rendered in the page that is being accessed

const HomeLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default HomeLayout;
