import React from 'react';
import { Container } from './styles';

import SearchIcon from '../../assets/search.svg';

type InputProps = {
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement>;
};

function InputSearch({ placeholder, inputRef }: InputProps) {
  return (
    <Container>
      <img src={SearchIcon} alt="search" />
      <input ref={inputRef} type="text" placeholder={placeholder} />
    </Container>
  );
}

export default InputSearch;
