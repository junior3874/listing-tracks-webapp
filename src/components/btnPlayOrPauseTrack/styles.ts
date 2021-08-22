import styled from 'styled-components';

import btnPlay from '../../assets/btn-play.svg';
import equalizerIcon from '../../assets/equalizer.gif';

export const Container = styled.button`
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);

  :hover {
    width: 42px;
    height: 42px;
  }
`;
export const ImageBtn = styled.img`
  padding: 8px;
  width: 100%;
  margin-left: 2px; ;
`;
