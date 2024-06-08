import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/Register";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("auth/register", data);
    toast.success("Registration successful, please login");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred");
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.actionStatus === "submitting";

  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4>Register Page</h4>
        <FormRow type="text" name="name" labelText="Name" defaultValue="john" />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="john"
        />
        <FormRow type="email" name="email" defaultValue="john@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret" />

        <button
          type="submit"
          className="submit btn btn-block"
          disabled={isSubmitting}
        >
          {isSubmitting ? "...submitting" : "submit"}
        </button>
        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
