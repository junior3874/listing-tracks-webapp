import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #e3e3e3;

  .top-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    span {
      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 10px;
    }
    a {
      text-decoration: none;
      color: #1197f2;
    }
    a:hover {
      color: black;
    }
    a.selected {
      display: none;
    }
  }
`;
