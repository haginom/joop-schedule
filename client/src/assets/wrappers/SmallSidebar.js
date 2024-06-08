import styled from "styled-components";

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visiblity: hidden;
  }
  .show-sidebar {
    z-index: 999;
    opacity: 1;
    visibility: visible;
  }

  .content {
    background: var(--clr-white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: (var--clr-red-light);
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    font-size: 1.5rem;
  }

  .nav-link {
    display: flex;
    align-items: center;

    color: var(--clr-grey-3);
    transition: var(--transition);
    cursor: pointer;
    text-transform: capitalize;
    margin-bottom: 1rem;
  }
  .icon {
    font-size: 2rem;
    margin-right: 1rem;

    display: grid;
    place-items: center;
  }
`;

export default Wrapper;
