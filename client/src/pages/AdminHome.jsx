import { redirect, useNavigation, Outlet } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { Form } from "react-router-dom";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import AllFamilies from "../components/AllFamilies";
import { useAdminContext } from "./Admin";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/family", data);
    toast.success("Family created successfully");
    return redirect("/dashboard/admin");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AdminHome = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div>
      <h3>New Family</h3>
      <div>
        <Form method="POST" className="form">
          <h4>Create new family</h4>
          <FormRow
            type="childName"
            name="childName"
            labelText="Child Name"
            defaultValue={"Ren"}
          />
          <FormRow
            type="childLastName"
            name="childLastName"
            labelText="Child Last Name"
            defaultValue={"Bagenal-Reid"}
          />
          <FormRow
            type="date"
            name="childDoB"
            labelText="Child DoB"
            defaultValue={"2021-11-17"}
          />
          <FormRow
            type="date"
            name="startDate"
            labelText="Start Date"
            defaultValue={"2021-11-17"}
          />

          <button
            type="submit"
            className="submit btn btn-block"
            disabled={isSubmitting}
          >
            {" "}
            {isSubmitting ? "...submitting" : "Submit"}{" "}
          </button>
        </Form>
      </div>

      <AllFamilies />
    </div>
  );
};
export default AdminHome;
