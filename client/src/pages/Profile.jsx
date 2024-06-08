import { useDashboardContext } from "./Dashboard";
import Wrapper from "../assets/wrappers/Profile";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const data = await customFetch.get("/users/current-user");
    return data.data;
  } catch (error) {
    console.log(error);
    // return redirect("/login");
  }
};

const Profile = () => {
  const { user } = useDashboardContext();

  return (
    <Wrapper>
      <h4>Account Info</h4>

      <div className="menu">
        <div className="user">
          {user?.name} {user?.lastName}
        </div>
        <div className="user">
          {user?.name} {user?.lastName}
        </div>

        <div>Add child account</div>
      </div>
    </Wrapper>
  );
};
export default Profile;

///if no account info, add account info
