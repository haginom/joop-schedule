import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--light-shadow);
  background: var(--background-secondary-color);

  .nav-center {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 1rem;
  }

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }

  .logo-text {
    display: block;
    margin-bottom: 0;
  }
  @media (max-width: 992px) {
    position: sticky;
    top: 0;
  }
`;

export default Wrapper;
