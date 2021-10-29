import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  form {
    margin-bottom: 20px;
    position: relative;
    #clear-search {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 2%;
      top: 25%;
      padding: 5px;
      cursor: pointer;

      :hover {
        background-color: gray;
        border-radius: 50%;
      }
    }
  }
  main {
    height: 100%;
    width: 100%;
  }
`;
