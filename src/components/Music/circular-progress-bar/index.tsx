import { SvgCircularProgressBardWrapper } from './styles';

/* eslint-disable react/react-in-jsx-scope */

type CircularProgressBarProps = {
  percent: number;
  radius: number;
};
function CircularProgressBar({ percent, radius }: CircularProgressBarProps) {
  const circunference = Math.PI * radius * 2;
  const strokeDashoffset = circunference * (1 - percent / 100);

  return (
    <SvgCircularProgressBardWrapper
      percent={strokeDashoffset}
      radius={circunference}
    >
      <circle cy="50%" cx="50%" r={radius}></circle>
    </SvgCircularProgressBardWrapper>
  );
}

export default CircularProgressBar;
