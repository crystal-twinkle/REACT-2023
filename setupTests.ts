import '@testing-library/jest-dom';

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('https://pokeapi.co/api/v2/pokemon', ({}) => {
    return HttpResponse.json({
      count: 1200,
      results: [
        { name: 'Bulbasaur' },
        { name: 'Charmander' },
        { name: 'Pikachu' },
        { name: 'ivysaur' },
      ],
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
    const { name } = params;
    return HttpResponse.json({
      name,
      sprites: {
        front_default: 'front_default_url',
        back_default: 'back_default_url',
        front_shiny: 'front_shiny_url',
      },
      height: 10,
      weight: 20,
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
