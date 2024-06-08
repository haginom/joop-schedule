import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/Register";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4>Login Page</h4>
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          defaultValue={"john@gmail.com"}
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue={"secret"}
        />
        <button
          type="submit"
          className="submit btn btn-block"
          disabled={isSubmitting}
        >
          {isSubmitting ? "...submitting" : "Submit"}{" "}
        </button>
        <p>
          Not yet a member? <Link to="/register">Register</Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
