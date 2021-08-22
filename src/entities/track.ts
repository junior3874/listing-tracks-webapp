export interface TrackProps {
  id: number;
  link: string;
  title: string;
  artistName: string;
  albumImage: string;
  duration: number;
  preview: string;
}

export type TrackPropsDTO = {
  id: number;
  link: string;
  title: string;
  artist: {
    name: string;
  };
  album: {
    cover: string;
  };
  duration: number;
  preview: string;
};

export default class Track implements TrackProps {
  id;

  link;

  title;

  artistName;

  preview;

  albumImage;

  duration;

  constructor({
    id,
    link,
    title,
    artist,
    preview,
    duration,
    album,
  }: TrackPropsDTO) {
    this.id = id;
    this.link = link;
    this.title = title;
    this.artistName = artist.name;
    this.preview = preview;
    this.albumImage = album.cover;
    this.duration = duration;
  }
}
