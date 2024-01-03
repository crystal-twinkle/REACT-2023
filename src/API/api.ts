import axios from 'axios';
import PropsDefault, { IPost } from '../components/models';

export default class PokemonApi {
  static async getALL(
    limit: number,
    offset: number
  ): Promise<{ resolved: IPost[]; countPosts: number }> {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const promises = response.data.results.map(async (e: PropsDefault) => {
      return await this.getByURL(e.url);
    });
    const resolved = await Promise.all(promises);
    return { resolved, countPosts: response.data.count };
  }

  static async getByURL(URL: string): Promise<IPost[]> {
    const response = await axios.get(URL);
    return response.data;
  }

  static async getByName(name: string): Promise<IPost> {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return response.data;
  }
}
