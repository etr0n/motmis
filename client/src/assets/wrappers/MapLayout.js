import styled from 'styled-components'

const Wrapper = styled.section`
.container {
  display: flex;
  position: relative;
  overflow: hidden;
}
.updated-time {
  position: absolute;
  top: 15px;
  left: 100px;
}
 .legend, .updated-time {
  z-index: 400;
  padding: 8px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.72);
}
`
export default Wrapper
