import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/FamilyLayout";
import { createContext, useState, useContext } from "react";
import dayjs from "dayjs";
import { calculateDoB } from "../utils/calendarHelpers";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/family/families/${params.id}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const FamilyContext = createContext();

const Family = () => {
  const { family } = useLoaderData(loader);

  const [showPopup, setShowPopup] = useState(false);

  return (
    <FamilyContext.Provider value={{ family }}>
      <Wrapper>
        <div className="account-info">
          <img src={family?.childImage} alt="child" />
          <div className="account-info-details">
            <h3>
              {family?.childName} {family?.childLastName}
            </h3>
            <p>
              {dayjs(family?.childDoB).format("DD-MM-YYYY")}{" "}
              <span>({calculateDoB(family?.childDoB)} yrs) </span>
            </p>
          </div>
        </div>
        <nav>
          <a href={`/dashboard/admin/family/${family._id}`}>Overview</a>
          <a href={`/dashboard/admin/family/${family._id}/members`}>Members</a>
        </nav>

        <div>
          <Outlet context={{ family }} />
        </div>
      </Wrapper>
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => {
  return useContext(FamilyContext);
};

export default Family;
