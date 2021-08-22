import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .content-left {
    display: flex;
    align-items: center;

    .track-image {
      display: flex;
      align-items: center;
      width: 120px;
      height: 120px;
      border-radius: 18px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      img:not(:nth-child(2)) {
        object-fit: cover;
        width: 100%;
      }

      .btn-play-music {
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        text-align: center;
        width: 32px;
      }
    }

    .track-informations {
      margin-left: 20px;
      position: relative;

      h1 {
        font-size: 14px;
        line-height: 16px;
      }
      h2 {
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #616161;
      }

      span {
        margin: 30px 0 10px 0;
        display: flex;
        align-items: center;
        p {
          font-size: 12px;
          line-height: 14px;
          color: #6a6a6a;
          margin-left: 10px;
        }
      }
    }
  }
`;
