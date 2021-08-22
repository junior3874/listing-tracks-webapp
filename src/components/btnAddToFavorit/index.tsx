import React from 'react';
import { useSelector } from 'react-redux';
import { Container, FavoritIconImage } from './styles';

import FavoritIcon from '../../assets/favorit-icon.svg';
import FavoritIconEmpty from '../../assets/favorit-icon-empty.svg';
import { verifyTrackHasAddedInFavoritList } from '../../store/ducks/favoritList/favoritListSelectors';

import { RootState } from '../../store';

type BtnAddToFavoritProp = {
  trackId: number;
  onClick: (type: boolean) => void;
};

function BtnAddToFavorit({ trackId, onClick }: BtnAddToFavoritProp) {
  const verifyBtnHasAddedToFavorit = useSelector((state: RootState) =>
    verifyTrackHasAddedInFavoritList(state, trackId),
  );
  return (
    <Container
      className="btnAddOrRemoveFavirite"
      title="Adicione essa música aos favoritos"
      onClick={() => onClick(!!verifyBtnHasAddedToFavorit)}
    >
      <FavoritIconImage
        src={verifyBtnHasAddedToFavorit ? FavoritIcon : FavoritIconEmpty}
        alt="favorit-icon"
      />
    </Container>
  );
}

export default BtnAddToFavorit;
