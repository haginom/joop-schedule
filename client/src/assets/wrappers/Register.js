import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;

  .form {
    max-width: 600px;
    border-top: 5px solid var(--clr-primary-3);
  }
  h4 {
    text-align: center;
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
    margin-top: 1rem;
    line-height: 1.5;
  }
`;

export default Wrapper;
