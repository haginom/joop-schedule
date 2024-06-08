import { Form } from "react-router-dom";
import { FormRow } from "../components";
import dayjs from "dayjs";
import { useFamilyContext } from "./FamilyLayout";

const FamilyOverview = ({}) => {
  const { family } = useFamilyContext();

  return (
    <div>
      <section className="basic-info">
        <h4>Child info</h4>
        <div>
          <a href="#">view more</a>
          <Form className="form">
            <FormRow
              type="text"
              name="childName"
              labelText="Child Name"
              defaultValue={family?.childName}
              disabled
            />
            <FormRow
              type="text"
              name="childLastName"
              labelText="Child Last Name"
              defaultValue={family?.childLastName}
              disabled
            />
            <FormRow
              type="date"
              name="dob"
              labelText="Date of Birth"
              defaultValue={dayjs(family?.childDoB).format("YYYY-MM-DD")}
              disabled
            />
          </Form>
        </div>
      </section>
    </div>
  );
};
export default FamilyOverview;
