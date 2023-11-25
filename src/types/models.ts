export default interface PropsDefault {
  [key: string]: string;
}

export interface IPost {
  name: string;
  height?: number;
  weight?: number;
}

export interface IDetailPost extends IPost {
  sprites: {
    front_shiny: string;
    front_default: string;
    back_default: string;
  };
}

export interface IPokemonState {
  posts: IPost[];
  loading: boolean;
  error: boolean;
  status: string;
}

export interface gSSP {
  cards: IPokemonState;
}
