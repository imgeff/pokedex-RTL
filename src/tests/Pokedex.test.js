import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const typePokemons = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

const iteratorPokemons = () => {
  const btnNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
  const namePokemon = screen.getByTestId(/pokemon-name/i);
  pokemons.forEach((pokemon) => {
    expect(namePokemon.textContent).toBe(pokemon.name);
    userEvent.click(btnNextPokemon);
  });
};

describe('Testa o componente <Pokedex.js />', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const title = (
      screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i }));
    expect(title).toBeInTheDocument();
  });

  test('É exibido o próximo Pokémon da lista quando o botão Próximo é clicado', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    pokemons.forEach((pokemon) => {
      const btnNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
      const namePokemon = screen.getByTestId(/pokemon-name/i);
      expect(namePokemon).toHaveTextContent(pokemon.name);
      userEvent.click(btnNextPokemon);
    });
  });

  test('É exibido o primeiro pokemon da lista quando o ultímo for clicado', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    pokemons.forEach(() => {
      const btnNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
      const namePokemon = screen.getByTestId(/pokemon-name/i);
      userEvent.click(btnNextPokemon);
      if (namePokemon.textContent === 'Dragonair') {
        userEvent.click(btnNextPokemon);
        expect(namePokemon).toHaveTextContent(/Pikachu/i);
        expect(namePokemon).toBeVisible();
      }
    });
  });

  test('Testa se é exibido somente um pokemon por vez', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const imgPokemon = screen.getAllByRole('img');
    expect(imgPokemon.length).toBe(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  test(`Deve existir um botão de filtragem para cada tipo de Pokémon, e
      o nome do botão deve corresponder ao tipo do Pokémon`, () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    buttonTypes.forEach((button) => {
      const verifyButtons = typePokemons.some((type) => button.textContent === type);
      expect(verifyButtons).toBe(true);
    });
  });

  test('Os botões de filtragem não devem repetir', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    expect(buttonTypes.length).toBe(typePokemons.length);
  });

  test('Ao clicar em um botão de tipo só deve mostrar pokemons do tipo escolhido', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    const btnNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    const namePokemon = screen.getByTestId(/pokemon-name/i);
    userEvent.click(buttonFire);
    expect(namePokemon.textContent).toBe('Charmander');
    userEvent.click(btnNextPokemon);
    expect(namePokemon.textContent).toBe('Rapidash');
    userEvent.click(btnNextPokemon);
    expect(namePokemon.textContent).toBe('Charmander');
  });

  test('O botão All precisa estar sempre visível', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeVisible();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonReset = screen.getByRole('button', { name: /All/i });
    expect(buttonReset).toBeInTheDocument();
  });

  test('Deverá mostrar os Pokémons normalmente quando o botão All for clicado', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonReset = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonReset);
    iteratorPokemons();
  });

  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    RenderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    iteratorPokemons();
  });
});
