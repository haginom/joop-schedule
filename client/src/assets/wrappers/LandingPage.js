import styled from "styled-components";

const Wrapper = styled.section`
  nav {
    height: var(--nav-height);
  }
  .container {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export default Wrapper;
