import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const favoritePokemons = [];

describe('Testa o componente <FavoritePokemons />', () => {
  test('É exibido No favorite pokemon found, se  não existir favoritos', () => {
    RenderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    const NoFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(NoFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    favoritePokemons.push(pokemons[0], pokemons[7]);
    RenderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    favoritePokemons.forEach((pokemon) => {
      const pokemonFavorite = screen.getByText(pokemon.name);
      expect(pokemonFavorite).toBeInTheDocument();
      expect(pokemonFavorite).toBeVisible();
    });
  });
});
