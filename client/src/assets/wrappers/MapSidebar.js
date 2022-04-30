import styled from 'styled-components'

const Wrapper = styled.aside`
display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--white);
      min-height: 100vh;
      height: 100%;
      width: 500px;
      margin-left: -500px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      //6rem
      height: 7rem;
      display: flex;
      align-items: center;
      padding-left: 5rem;
      //2.5rem
    }
  }
`
export default Wrapper
