import axios from 'axios';
import { TrackPropsDTO } from '../entities/track';
import IRequisitionService, {
  ResponseFromDeezerApi,
} from './IRequisitionService';

export const api = axios.create({
  baseURL: 'https://well-middlewarex.herokuapp.com',
});

type RequisitionToolWithAxiosProps = {
  limit?: number;
};

export class RequisitionToolWithAxios implements IRequisitionService {
  api = axios.create({
    baseURL: 'https://well-middlewarex.herokuapp.com/home?link=api.deezer.com',
  });

  limit: number;
  constructor({ limit }: RequisitionToolWithAxiosProps) {
    this.limit = limit || 10;
  }

  async getTopTracks() {
    const response: ResponseFromDeezerApi = await this.api
      .get(`/chart/0/tracks?%26limit=${this.limit}`)
      .then(response => response.data)
      .catch(err => ({ error: err, message: 'ocurred a problem' }));

    return response;
  }

  async searchTracks(params: string) {
    const response: ResponseFromDeezerApi = await this.api
      .get(`search?q=${params}%26index=0%26limit=${this.limit}`)
      .then(response => response.data)
      .catch(err => ({ error: err, message: 'ocurred a problem' }));

    return response;
  }

  async getMoreTracks(url: string, index: number) {
    const response: ResponseFromDeezerApi = await this.api
      .get(`${url}%26index=${index}%26limit=${this.limit}`)
      .then(response => response.data)
      .catch(err => ({ error: err, message: 'ocurred a problem' }));

    return response;
  }
}
