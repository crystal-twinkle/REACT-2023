export default interface PropsDefault {
  [key: string]: string;
}

export interface IPost {
  name: string;
  sprites: {
    front_shiny: string;
    front_default: string;
    back_default: string;
  };
}
