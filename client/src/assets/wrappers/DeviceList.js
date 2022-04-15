import styled from 'styled-components'

const Wrapper = styled.article`
.table-hover > tbody > tr:hover {
  background-color: #fafafa;
}
  .active {
    margin-top: 0.5rem;
    background: #e0e8f9;
    color: #647acb;
  }
  .offline {
    margin-top: 0.5rem;
    color: #d66a6a;
    background: #ffeeee;
  }
  .styled-table {
    background: var(--white);
    border-collapse: collapse;
    border-radius: 0.25em 0.25em 0 0;
    width: 100%;
    max-width: 100%;
    border-spacing: 0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color:var(--primary-50);
    color: #ffffff;
    text-align: left;
}
.styled-table thead tr:first-child th:first-child{
   border-radius: 0.25em 0 0 0;
}
.styled-table thead tr:first-child th:last-child {
    border-radius: 0 0.25em 0 0;
}
.styled-table tbody tr:last-child td:first-child {
    border-radius: 0 0 0 0.25em;
}
.styled-table tbody tr:last-child td:last-child {
    border-radius: 0 0 0.25em 0;
}
.styled-table th,
.styled-table td {
    padding: 12px 15px;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
} 

  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
    margin-right: 0.5rem;
  }
  .details-btn{
     color: var(--blue-dark);
     background: var(--blue-light);
  }
  &:hover .actions {
    visibility: visible;
  } 

  .styled-table {
    @media (min-width: 576px) {
      responsive: sm;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  } 
`

export default Wrapper
