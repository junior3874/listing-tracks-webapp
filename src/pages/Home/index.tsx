import Track from '../../entities/track';

import React, { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Music from '../../components/Music';
import TrackList from '../../components/TrackList';
import InputSearch from '../../components/InputSearch';

import { getListMusics } from '../../store/listMusics/listMusicsSelector';
import {
  initListMusic,
  makingInitListMusic,
  makingRequestWithError,
  moreMusics,
  removeListMusics,
} from '../../store/listMusics';

import { Container } from './styles';
import Loading from '../../components/loading';
import { RequisitionToolWithAxios } from '../../service/requisitionToolWithAxios';

import CloseIcon from '../../assets/close-icon.png';
import PlayerProvider from '../../components/player';

const requisitionToolWithAxios = new RequisitionToolWithAxios({
  limit: 10,
});

function Home() {
  const [searchParams, setSearchParams] = useState('/chart/0/tracks');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(undefined);

  //================================================================
  // Contexts
  //================================================================

  const { data, loading, error } = useSelector(getListMusics);
  const dispatch = useDispatch();

  //=================================================================
  // Refs
  //=================================================================

  const inputSearchRef = useRef<HTMLInputElement>(null);

  //=================================================================
  // Handlers
  //=================================================================
  const handleFormAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputRefValue = inputSearchRef.current!.value;
    if (inputRefValue! == '') return resetParams();

    //@ts-ignore

    setSearchParams(`/search/track?q=${inputRefValue}`);
    setCurrentIndex(0);
  };

  const moreMusic = () => {
    if (maxIndex && currentIndex >= maxIndex!) {
      return true;
    }
    setCurrentIndex(prev => (prev += requisitionToolWithAxios.limit));
    return false;
  };

  const resetParams = () => {
    if (searchParams === '/chart/0/tracks') return;

    inputSearchRef.current!.value = '';
    setSearchParams('/chart/0/tracks');
    setCurrentIndex(0);
  };

  //=================================================================
  // hooks
  //=================================================================

  const getTopMusics = async () => {
    const res = await requisitionToolWithAxios.getTopTracks();
    if (res.message == 'okay') {
      dispatch(initListMusic(res.data.data));
      return;
    }
    dispatch(makingRequestWithError({}));
  };

  const getMusicsByParam = async () => {
    const res = await requisitionToolWithAxios.searchTracks(searchParams);
    if (res.message == 'okay') {
      dispatch(initListMusic(res.data.data));
      return;
    }
    dispatch(makingRequestWithError({}));
  };

  useEffect(() => {
    (async () => {
      dispatch(makingInitListMusic({}));
      if (searchParams === '/chart/0/tracks') {
        getTopMusics();
        return;
      }

      getMusicsByParam();
    })();

    return () => {
      dispatch(removeListMusics({}));
    };
  }, [searchParams]);

  useEffect(() => {
    if (currentIndex === 0) return;
    (async () => {
      const res = await requisitionToolWithAxios.getMoreTracks(
        searchParams,
        currentIndex + requisitionToolWithAxios.limit,
      );

      if (res.message === 'okay') {
        dispatch(moreMusics(res.data));
        return false;
      }
    })();
  }, [currentIndex]);

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={e => handleFormAction(e)}>
          <InputSearch placeholder="Faça uma busca" inputRef={inputSearchRef} />
          <img onClick={resetParams} id="clear-search" src={CloseIcon} alt="" />
        </form>
        <main>
          <PlayerProvider>
            {loading ? (
              <Loading />
            ) : (
              <TrackList command={() => moreMusic()} data={data} error={error}>
                {data.map(trackProps => {
                  const track = new Track(trackProps);
                  return (
                    <Music
                      albumImage={track.albumImage}
                      artistName={track.artistName}
                      duration={track.duration}
                      key={track.id}
                      id={track.id}
                      link={track.link}
                      preview={track.preview}
                      title={track.title}
                    />
                  );
                })}
              </TrackList>
            )}
          </PlayerProvider>
        </main>
      </Container>
    </>
  );
}

export default Home;
