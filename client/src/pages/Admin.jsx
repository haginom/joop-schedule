import { useLoaderData, Outlet } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { createContext, useContext } from "react";
import Wrapper from "../assets/wrappers/Admin";

export const loader = async () => {
  try {
    const data = await customFetch.get("/family/all-families");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const AdminContext = createContext();

const Admin = () => {
  const { families } = useLoaderData(loader);

  return (
    <AdminContext.Provider value={{ families }}>
      <Wrapper>
        <div>
          <Outlet context={{ families }} />
        </div>
      </Wrapper>
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
export default Admin;
