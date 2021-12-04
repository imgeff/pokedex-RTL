import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
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

const matchPokemon = (id) => {
  const match = {
    isExact: true,
    params: { id },
    path: '/pokemons/:id',
    url: `/pokemons/${id}`,
  };
  return match;
};

describe('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon',
    () => {
      const pikachu = pokemons[0];

      RenderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ matchPokemon(pikachu.id.toString()) }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />,
      );
      const titleDetail = screen.getByText(`${pikachu.name} Details`);
      expect(titleDetail).toBeInTheDocument();
    });

  test('Não deve existir o link de navegação para os detalhes do Pokémon selecionado',
    () => {
      const pikachu = pokemons[0];

      RenderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ matchPokemon(pikachu.id.toString()) }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />,
      );
      const linkDetails = screen.queryByRole('link', { name: /More details/i });
      expect(linkDetails).not.toBeInTheDocument();
    });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary',
    () => {
      const pikachu = pokemons[0];

      RenderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ matchPokemon(pikachu.id.toString()) }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />,
      );
      const titleSummary = screen.queryByRole('heading', { level: 2, name: /Summary/i });
      expect(titleSummary).toBeInTheDocument();
    });

  test('Deve conter um parágrafo com o resumo do Pokémon na seção detalhes Visível',
    () => {
      const pikachu = pokemons[0];

      RenderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ matchPokemon(pikachu.id.toString()) }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />,
      );
      const paragraph = screen.getByText(pikachu.summary);
      expect(paragraph).toBeInTheDocument();
    });
});

describe('Teste se existe na página uma seção com os mapas das localizações do pokémon',
  () => {
    test(`Na seção detalhes deve existir um h2 com o texto Game Locations of <name> 
      onde <name> é o nome do Pokémon exibido`,
    () => {
      const charmander = pokemons[1];

      RenderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ matchPokemon(charmander.id.toString()) }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />,
      );
      const textLocationTitle = `Game Locations of ${charmander.name}`;
      const titleLocations = (
        screen.getByRole('heading', { level: 2, name: textLocationTitle }));
      expect(titleLocations).toBeInTheDocument();
    });

    test('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes',
      () => {
        const charmander = pokemons[1];

        RenderWithRouter(
          <PokemonDetails
            isPokemonFavoriteById={ isPokemonFavoriteById }
            match={ matchPokemon(charmander.id.toString()) }
            pokemons={ pokemons }
            onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
              this.onUpdateFavoritePokemons(pokemonId, isFavorite)
            ) }
          />,
        );
        let location = '';
        charmander.foundAt.forEach((local) => {
          location = screen.getByText(local.location);
          expect(location).toBeInTheDocument();
          expect(location).toBeVisible();
        });
      });

    test(`Devem ser exibidos, uma imagem do mapa além de ter um 
      atributo src com a URL da localização`,
    () => {
      const charmander = pokemons[1];

      RenderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ matchPokemon(charmander.id.toString()) }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />,
      );
      let imgLocal = '';
      charmander.foundAt.forEach((local, index) => {
        imgLocal = screen.getAllByAltText(`${charmander.name} location`);
        expect(imgLocal[index]).toBeInTheDocument();
        expect(imgLocal[index]).toHaveAttribute('src', local.map);
      });
    });
  });

describe('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
  () => {
    test('A página deve exibir um checkbox que permite favoritar o Pokémon',
      () => {
        const snorlax = pokemons[7];

        RenderWithRouter(
          <PokemonDetails
            isPokemonFavoriteById={ isPokemonFavoriteById }
            match={ matchPokemon(snorlax.id.toString()) }
            pokemons={ pokemons }
            onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
              this.onUpdateFavoritePokemons(pokemonId, isFavorite)
            ) }
          />,
        );
        const checkboxFavorite = screen.getByLabelText('Pokémon favoritado?');
        expect(checkboxFavorite).toBeInTheDocument();
      });

    test(`Cliques alternados no checkbox devem adicionar e remover respectivamente
      o Pokémon da lista de favoritos`,
    () => {
      const snorlax = pokemons[7];

      RenderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ matchPokemon(snorlax.id.toString()) }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />,
      );
    });
  });
