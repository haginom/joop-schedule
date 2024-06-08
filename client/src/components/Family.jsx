import Wrapper from "../assets/wrappers/FamilyIndividual";

const Family = ({ family }) => {
  return (
    <Wrapper>
      <a href={`/dashboard/admin/family/${family._id}`}>
        Family {family.childName}{" "}
      </a>
    </Wrapper>
  );
};
export default Family;
