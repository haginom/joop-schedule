import Wrapper from "../assets/wrappers/Admin";
import FormRow from "./FormRow";
import { Form } from "react-router-dom";

const addStaouderPopup = () => {
  return (
    <Wrapper>
      <div>
        <p>Invite Sta-ouders</p>
      </div>
      <div>
        <Form method="POST" className="form">
          <FormRow type="email" name="email" labelText="Email" />
          <label htmlFor="role">Role</label>
          <select name="role" id="role">
            <option value="parentOne">Administrator</option>
            <option value="parentTwo">User</option>
          </select>
          <button className="btn">Send invites</button>
        </Form>
      </div>
    </Wrapper>
  );
};
export default addStaouderPopup;
