import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container } from './styles';

import LogoIcon from '../../assets/logo.png';

type HeaderProps = {
  children: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  return (
    <Container>
      <div className="top-content">
        <NavLink exact to="/favoritos" activeClassName="selected">
          Vá para os favoritos
        </NavLink>

        <NavLink exact to="/" activeClassName="selected">
          Vá para a página inicial
        </NavLink>
      </div>

      {children}
    </Container>
  );
}

export default Header;
