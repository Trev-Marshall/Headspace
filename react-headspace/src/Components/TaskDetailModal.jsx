import { styled } from '@material-ui/core'
import React from 'react'



/*

NOTE: TASK DETAILS ARE PUT ON THE BACK BURNER FOR NOW

*/


function TaskDetailModal({details}) {
  return (
    <Container onClick={() => setArchiveState(false)}>
      <WindowContainer>
        DETAILS
        <Li>
          {details}
        </Li>
      </WindowContainer>
    </Container>
  )
}

export default TaskDetailModal

const Container = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: rgba(78, 55, 75, 0.39);
`

const WindowContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 70%;
  background-color: rgb(226, 74, 132);
  margin: auto;
  padding: 40px 20px;
  list-style-type: none;

  @media (max-width: 850px) {
    padding: 10px;
  }
`

const Li = styled.li`

`