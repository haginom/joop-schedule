import styled from "styled-components";

const Wrapper = styled.div`
  h3 {
    margin-bottom: 4rem;
    text-transform: initial;
    font-weight: normal;
  }
  max-width: 1100px;
  .calendar-root {
    --grid-gap: 2px;
    --grid-height: 700px;
    --text-color-light: rgba(0, 0, 0, 0.4);
    --text-color-primary: rgba(0, 0, 0, 0.7);
    --grid-background-color: rgb(211, 205, 198);
    --grid-foreground-color: white;
    --space-sm: 4px;
    --space-md: 8px;
    --space-lg: 16px;
    width: 100%;
  }

  .days-of-week {
    margin-top: 1rem;
    padding: 0.25rem 0.25rem;
    font-size: 0.75rem;
    border-bottom: 1px solid var(--clr-grey-1);
    border-top: 1px solid var(--clr-grey-1);
  }

  /* | Sun | Mon | Tue | Wed | Thu | Fri | Sat  */
  .day-of-week-header {
    color: var(--text-color-primary);
    background-color: var(--grid-foreground-color);
    padding: var(--space-md) 0;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .days-of-week,
  .days-grid {
    width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: var(--grid-gap);
    grid-row-gap: var(--grid-gap);
  }

  .days-grid {
    height: var(--grid-height);
    position: relative;

    background-color: var(--grid-background-color);
  }

  .day-grid-item-container {
    position: relative;
    background-color: var(--grid-foreground-color);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    border-bottom: 1px solid var(--clr-grey-9);
    border-left: 1px solid var(--clr-grey-9);
    &:nth-child(7n) {
      border-right: 1px solid var(--clr-grey-9);
    }
  }

  .day-grid-item-container:not(.current-month) .day-grid-item-header {
    color: var(--text-color-light);
  }

  //navigation header

  .navigation-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .month-nav-arrow-buttons {
    line-height: initial;
  }

  .btn {
    background: transparent;
    color: var(--clr-grey-5);
    margin-left: 0;
    font-size: 1rem;
    padding: 0.1rem 0.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0;
  }

  .current-date {
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    min-width: 5rem;
  }

  .year {
    font-size: 0.75rem;
    font-weight: normal;
    color: var(--clr-grey-5);
    margin-left: 0.25rem;
  }
`;

export default Wrapper;
