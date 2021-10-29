import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .content-left {
    display: flex;
    align-items: center;
    width: 50%;

    .track-image {
      display: flex;
      align-items: center;
      min-width: 64px;
      height: 120px;

      position: relative;

      cursor: pointer;

      img:not(:nth-child(2)) {
        object-fit: cover;
        width: 100%;
        border-radius: 12px;
      }

      button {
        position: absolute;
        margin: 0 auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;

        :hover {
          width: 42px;
          height: 42px;
        }

        img {
          padding: 8px;
          width: 100%;
          margin-left: 2px;
        }
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
      button {
        max-width: 158px;
        padding: 10px;
        height: 30px;
        display: flex;
        align-items: center;
        background: #444444;
        border-radius: 5px;
        border: none;
        a {
          font-size: 12px;
          line-height: 14px;
          text-decoration: none;
          color: #ffffff;
        }
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

type ContainerProgressBarProps = {
  percent: number;
};

export const SvgCircularProgressBardWrapper = styled.div<ContainerProgressBarProps>`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  box-shadow: 0 0 0 2px black, 0 0 0 10px white, 0 0 0 11px black;
  svg {
    min-width: 50px !important;
    min-height: 50px !important;

    circle {
      fill: none;
      stroke: cornflowerblue;
      stroke-width: 10px;
      stroke-dasharray: 500px;
      stroke-dashoffset: ${props => {
        const getCurrentValue = (props.percent / 30) * 100;
        return 500 - (100 * getCurrentValue) / 120;
      }};
    }
  }
`;

// 289
