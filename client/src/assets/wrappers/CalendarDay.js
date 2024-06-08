import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 8rem;
  /* Position the day label within the day cell */
  .day-grid-item-container .day-header {
    color: var(--text-color-primary);
    padding: var(--space-md);
    padding-bottom: 0;
    flex-shrink: 0;
    font-weight: bold;
  }

  .day-header {
    font-size: 0.85rem;
    padding-top: 0.5rem;
    padding-left: 0.35rem;
  }

  .not-current-month {
    color: var(--clr-grey-8);
  }

  .day-grid-item-content-container {
    margin-top: 0.5rem;
  }

  .halfday {
    flex: 1;
    background: var(--clr-grey-9);
    border-radius: var(--radius);
    min-height: 0;
    position: relative;
    padding: 0.25rem 0.1rem;
    margin: 0.1rem;
  }

  .day-grid-item-container > .day-content-wrapper {
    flex: 1;
    min-height: 0;
    position: relative;
  }

  .yes {
    background: var(--clr-green-light);
  }
  .no {
    background: var(--clr-grey-5);
  }
  .maybe {
    background: var(--clr-orange-4);
  }

  .status-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: white;
  }

  .status-icon svg {
    font-size: 1.5rem;
  }
`;

export default Wrapper;
