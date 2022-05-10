import styled from 'styled-components'

const Wrapper = styled.aside`

.sidebar {
    z-index: 1001;
    position: absolute;
    right: 0;
    height: 89vh;
    min-width: 33%;
    max-height: 100vh;
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,0.76) 25%, rgba(255,255,255,0.7595413165266106) 49%, rgba(255,255,255,0.76) 75%);
    //overflow-y: scroll;
}

.sidebar .container {
    padding: 20px 20px 20px 30px;
    display: flex;
    flex-direction: column;
}

.sidebar.hidden {
    display: none;
}

.sidebar .closeBtn {
    /* width: 50%;
    margin-bottom: 50px; */
     //display:grid;
    /* width: 100%; */
    //padding: 10px;
    //cursor: pointer;
    //user-select: none;
}

.sidebar .closeBtn-container button {
flex-direction: row;
  flex-wrap: wrap;
  /* width: 100px; */
 margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 50px;
    
}

.sidebar table {
    border-collapse: separate;
    border-spacing: 0;
    /*table-layout: fixed;*/
    margin: 20px 0;
    border: 1px solid #536f64;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
}

.sidebar table td, .sidebar table th {
    padding: 8px 20px;
    white-space: nowrap;
}

.sidebar table th {
    text-align: left;
}

/* .sidebar table th:first-child {
    width: 50%;
} */

.sidebar table tr.headers {
    background-color: #446666;
}

.sidebar table tr.headers th {
    border-bottom: #696d6e 1px solid;
}

.sidebar table tr.mean {
    background-color: #648579;
}

.sidebar table tr.sensor {
    background-color: #8da082;
}

.sidebar table tr.sensor:nth-child(odd) {
    background-color: #95a98a;
}

.sidebar table tr.sensor.selected {
    background-color: #58796d;
}

.sidebar table tr.selected {
    background-color: #7c8a72;
}

.sidebar table tr.selected:first-child td, .sidebar table tr.selected:last-child {
    border-bottom: #696d6e 1px solid;
}

.sidebar table tr.sensor:hover {
    cursor: pointer;
    background-color: #446666;
}

.sidebar table th {
    font-size: 1.2em;
}

.sidebar a, .sidebar span.a {
    cursor: pointer;
    background: none;
    border: none;
    text-decoration: underline;
    text-decoration-style: solid;
    font-size: 1em;
    color: #3d564c;
}

`
export default Wrapper
