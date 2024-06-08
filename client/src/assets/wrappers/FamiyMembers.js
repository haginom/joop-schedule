import styled from "styled-components";

const Wrapper = styled.div`
  .invite-form {
    border-radius: 12px;
    padding: 0;
    background: white;
  }

  .invite-form .title {
    border-bottom: 1px solid var(--clr-grey-8);
    margin-bottom: 2rem;

    h4 {
      font-size: 1.2rem;
      letter-spacing: 0rem;
      padding: 1rem 1.5rem 0rem 1.5rem;
      text-transform: none;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    p {
      padding: 0rem 1.5rem 0rem 1.5rem;
    }
  }

  .invite-form form {
    padding: 0rem 1.5rem 2rem 1.5rem;
  }

  .invite-form .form-label {
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }

  .invite-form .role-field .form-label {
    visibility: hidden;
  }

  .invite-form .role-field {
    flex: 0 1 auto;
  }

  .invite-form .row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .invite-form .avatar {
    flex: 0 1 auto;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--clr-grey-8);
  }

  .tag {
    padding: 0.25rem 1.5rem;
    border-radius: 12px;
    width: fit-content;
    text-align: center;
    flex: 0 1 auto;
    font-size: 0.9rem;
  }

  .tag.pending {
    background-color: var(--clr-orange-1);
    color: var(--clr-orange-7);
  }

  .tag .accepted {
    background-color: var(--clr-green-1);
    color: white;
  }

  .invite-form .btn {
    font-size: 0.9rem;
    padding: 0.5rem 0.5rem;
    margin-top: 0;
    letter-spacing: 0rem;
    height: fit-content;
    width: fit-content;
    flex: 0 1 auto;
    background: var(--clr-primary-3);
    color: white;
  }

  .delete-invite {
    background: none;
    border: none;
    font-size: 1.5rem;
  }
`;

export default Wrapper;
