import styled from 'styled-components';

type ContainerProgressBarProps = {
  percent: number;
  radius: number;
};

export const SvgCircularProgressBardWrapper = styled.svg<ContainerProgressBarProps>`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  transform: rotate(-90deg);
  circle {
    fill: transparent;
    stroke: cornflowerblue;
    stroke-width: 10;
    stroke-dasharray: ${({ radius }) => `${radius} ${radius}`};
    stroke-dashoffset: ${({ percent }) => `${percent}`};
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s;
  }
`;
