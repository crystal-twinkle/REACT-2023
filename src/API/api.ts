import axios from 'axios';
import PropsDefault, { IPost } from '../components/models';

export default class PokemonApi {
  private static _link: string =
    'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20';

  static async getALL(): Promise<{ resolved: IPost[]; count: number }> {
    const response = await axios.get(`${this._link}`);
    const promises = response.data.results.map(async (e: PropsDefault) => {
      return await this.getByURL(e.url);
    });
    const resolved = await Promise.all(promises);
    return { resolved, count: response.data.count };
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
