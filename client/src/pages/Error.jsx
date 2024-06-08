import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/Error";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div>
        <h3>Ohh! page not found</h3>
        <p>we can't seem to find the page you are looking for</p>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
