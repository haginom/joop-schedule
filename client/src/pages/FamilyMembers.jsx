import { Form } from "react-router-dom";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useFamilyContext } from "./FamilyLayout";
import Wrapper from "../assets/wrappers/FamiyMembers";
import { MdDelete } from "react-icons/md";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const emailToAdd = Object.fromEntries(formData);
  const dataToSend = { emailToAdd: [emailToAdd] };
  try {
    const data = await customFetch.post(
      `/family/families/${params.id}/members`,
      dataToSend
    );
    toast.success("Invites sent successfully");
    window.location.reload();
    return data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const handleDelete = (familyId, memberId) => {
  console.log(familyId, memberId);
  try {
    customFetch.delete(`/family/families/${familyId}/members/${memberId}`);
    toast.success("Member deleted successfully");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const FamilyMembers = () => {
  const { family } = useFamilyContext();
  console.log(family);
  return (
    <Wrapper>
      <section className="parent-info">
        <h4>Creche Sta Ouders({family?.parents?.length})</h4>
        <div className=" invite-form">
          <div className="title">
            <h4>Invite parents to group</h4>
            <p>We will email them and invite them with a link</p>
          </div>
          <Form method="POST" className="form invite-form">
            <div className="row">
              <FormRow type="email" name="email" labelText="Invite email" />
              <div className="role-field">
                <label className="form-label" htmlFor="role">
                  Role
                </label>
                <select name="role" id="role">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn ">
                Send invite
              </button>
            </div>

            <div className="invited-section">
              <h4>Members</h4>
              {family?.parents?.map((parent) => (
                <div key={parent._id} className="row invited">
                  <div className="avatar"></div>
                  <div>{parent.email}</div>

                  <div className="tag accepted">Invite accepted</div>
                  <button
                    type="button"
                    className="delete-invite"
                    onClick={() => handleDelete(family._id, parent._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
              {family?.allowedEmails.map((parent) => (
                <div key={parent._id} className="row invited">
                  <div className="avatar"></div>
                  <div>{parent.email}</div>

                  <div className="tag pending">Invite sent</div>
                  <button
                    type="button"
                    className="delete-invite"
                    onClick={() => handleDelete(family._id, parent._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          </Form>
        </div>
      </section>
    </Wrapper>
  );
};

export default FamilyMembers;
