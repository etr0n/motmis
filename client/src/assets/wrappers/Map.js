import styled from 'styled-components'

const Wrapper = styled.section`

.map-container {
   width: 100vw;
    height: 89vh;
    overflow: hidden;
    margin-top: 3.5px
  }

  .enable-map-click{
    z-index: 1;
    position: absolute;
    top: 95px;
    left: 330px;
    margin: 12px;
  }
  .sidebar {
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 850px;
    left: -1px;
    margin: 12px;
    }


    body {
        margin: 0;
        padding: 0;
        font-family: 'Open Sans', sans-serif;
      }

      #map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }

      ${'' /* .sidebar {
        position: absolute;
        margin: 20px 20px 30px 20px;
        width: 25%;
        top: 0;
        bottom: 0;
        padding: 20px;
        background-color: #fff;
        overflow-y: scroll;
      } */}

      .card {
        font-size: small;
        border-bottom: solid #d3d3d3 2px;
        margin-bottom: 6px;
      }

      .card-header {
        font-weight: bold;
        padding: 6px;
      }

      .no-route {
        background-color: #d3d3d3;
        color: #f00;
      }

      .obstacle-found {
        background-color: #d3d3d3;
        color: #fff;
      }

      .route-found {
        background-color: #33a532;
        color: #fff;
      }

      .card-details {
        padding: 3px 6px;
      }
    
`
export default Wrapper