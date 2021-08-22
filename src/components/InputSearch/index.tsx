import React from 'react';
import { Container } from './styles';

import SearchIcon from '../../assets/search.svg';

type InputProps = {
  placeholder: string;
};

function InputSearch({ placeholder }: InputProps) {
  return (
    <Container>
      <img src={SearchIcon} alt="search" />
      <input type="text" placeholder={placeholder} />
    </Container>
  );
}

export default InputSearch;
