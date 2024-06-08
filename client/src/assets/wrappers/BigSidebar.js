import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;

  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);

    .sidebar-container {
      background: var(--clr-white);
      min-height: 100vh;
      height: 100%;
      width: 280px;
      margin-left: -280px;
      transition: margin-left 0.3s ease-in-out;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }

    header {
      height: 4rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      padding-top: 2rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem 0;
      padding-left: 2.5rem;
      transition: padding-left 0.3s ease-in-out;
      text-transform: capitalize;
    }

    .nav-link:hover {
      padding-left: 3rem;
      background: var(--clr-primary-8);
      color: var(--clr-primary-5);
      transition: var(--transition);
    }

    .icon {
      font-size: 1.2rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }

    .active {
      color: var(--clr-primary-5);
    }

    .toggle-sublinks {
      background: transparent;
      border: transparent;
      color: var(--text-secondary-color);
      margin-left: 2.5rem;
      transition: var(--transition);
      display: grid;
      justify-content: center;
      align-items: center;
    }
    .nav-link-sub {
      display: flex;
      align-items: center;
    }

    svg.active.rotate {
      transform: rotate(-90deg);
      -webkit-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      transition: transform 0.3s ease; /* Add transition for smooth rotation */
      -webkit-transition: -webkit-transform 0.3s ease;
      -moz-transition: -moz-transform 0.3s ease;
      -ms-transition: -ms-transform 0.3s ease;
      -o-transition: -o-transform 0.3s ease;
    }

    .sublinks {
      margin-left: 2.5rem;
    }

    .dropdown {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-right: 3rem;
    }
  }
`;

export default Wrapper;
