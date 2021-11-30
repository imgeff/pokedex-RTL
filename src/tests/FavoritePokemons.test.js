import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente <FavoritePokemons />', () => {
  test('É exibido No favorite pokemon found, se  não existir favoritos', () => {
    RenderWithRouter(<FavoritePokemons />);
    const favoritesPokemons = FavoritePokemons.defaultProps.pokemons;
    if (favoritesPokemons.length === 0) {
      const NoFavorite = screen.getByText(/No favorite pokemon found/i);
      expect(NoFavorite).toBeInTheDocument();
    }
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    RenderWithRouter(<FavoritePokemons />);
    const favoritesPokemons = FavoritePokemons.defaultProps.pokemons;
    if (favoritesPokemons.length > 0) {
      const pokemonDetail = screen.getAllByRole('link', { name: /More details/i });
      expect(pokemonDetail.length).toBe(favoritesPokemons.length);
    }
  });
});
