import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from './styles';

function Header() {
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
    </Container>
  );
}

export default Header;
