import { TrackPropsDTO } from '../entities/track';

export type ResponseFromDeezerApi = {
  data: {
    data: TrackPropsDTO[];
    lenght: number;
  };
  message: string;
};

export default interface IRequisitionService {
  limit: number | 10;
  getTopTracks: () => Promise<ResponseFromDeezerApi>;
  searchTracks: (params: string) => Promise<ResponseFromDeezerApi>;
  getMoreTracks: (url: string, index: number) => Promise<ResponseFromDeezerApi>;
}
