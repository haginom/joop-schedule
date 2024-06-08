import styled from "styled-components";

const Wrapper = styled.div`

.account-info{
    border-bottom: 1px solid rgb(229, 231, 235);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    
}

.account-info > img{
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin-right: 1rem;
    margin-bottom: 2rem;
    object-fit: cover;
    object-position: center;
    background: red;
}

.account-info-details h3{
    margin-bottom: .25rem;

}
nav{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 2rem;
    gap: 2rem;
  
  }

  nav > a {
    text-decoration: none;
    background-color: var(--clr-black);
    color: var(--clr-white);
    font-weight: 6
500;
    font-size: 1rem;
    padding: 0.25rem .75rem;
  
  }
section{
  margin-bottom: 2rem;
  max-width: 40rem;
}
 
  section > div {
    min-width: 0px;
    min-height: 0px;
    margin: 0px;
    padding: 0.75rem;
    border: 1px solid rgb(229, 231, 235);
    border-radius: 0.375rem;
}
.popUp{
    display: flex;
    flex: 1 1 0%;
    min-height: 0px;
    width: 100%;
    
}

h4{
  margin-bottom: 1rem;
}

  }
`;

export default Wrapper;
