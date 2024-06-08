import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <Wrapper>
      <div className="container page">
        <h1>Joop Gilliamse Ouderportaal</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eos
          delectus amet fugit quisquam illo sit omnis dolorum repudiandae ex
          ullam voluptas, labore fugiat ducimus, id perspiciatis ipsum aperiam
          distinctio.
        </p>
        <div className="link-container">
          <Link to="register" className="btn">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
