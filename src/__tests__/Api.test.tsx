import axios from 'axios';
import PokemonApi from '../API/api';
import { Mock } from 'vitest';

vi.mock('axios');

const mockResponsePokemon = {
  data: {
    name: 'bulbasaur',
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      back_female: null,
      back_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
      back_shiny_female: null,
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      front_female: null,
      front_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
      front_shiny_female: null,
    },
  },
};

describe('PokemonApi', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all posts', async () => {
    const mockResponse = {
      data: {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
        count: 1292,
      },
    };

    (axios.get as Mock).mockResolvedValue(mockResponse);

    const result = await PokemonApi.getALL(1, 0);

    expect(axios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=1&offset=0'
    );
    expect(result.resolved).toEqual([
      {
        count: 1292,
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
        ],
      },
    ]);
  });

  it('should fetch post by URL', async () => {
    (axios.get as Mock).mockResolvedValue(mockResponsePokemon);

    const result = await PokemonApi.getByURL(
      'https://pokeapi.co/api/v2/pokemon/1/'
    );

    expect(axios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/1/'
    );
    expect(result).toEqual(mockResponsePokemon.data);
  });

  it('should fetch post by name', async () => {
    (axios.get as Mock).mockResolvedValue(mockResponsePokemon);

    const result = await PokemonApi.getByName('Bulbasaur');

    expect(axios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/Bulbasaur'
    );
    expect(result).toEqual(mockResponsePokemon.data);
  });
});
