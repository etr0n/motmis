import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .measurements {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    margin-top: 20px;
  }
  .measurement-info{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  @media (min-width: 992px) {
    .measurement-info{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 30px);
    grid-gap: 60rem;
    margin-bottom: 20px;
    padding: 10px 10px 10px;
  }
    .measurements {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
`
export default Wrapper
