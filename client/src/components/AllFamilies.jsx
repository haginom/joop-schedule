import Wrapper from "../assets/wrappers/Family";
import Family from "./Family";
import { useAdminContext } from "../pages/Admin";

const AllFamilies = () => {
  const { families } = useAdminContext();

  return (
    <Wrapper>
      <h3>All Families</h3>
      {families.map((family) => (
        <Family key={family._id} family={family} />
      ))}
    </Wrapper>
  );
};

export default AllFamilies;
