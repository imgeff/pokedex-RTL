import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('É renderizado um card com as informações de determinado pokémon', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const charmander = pokemons[1];
    const isFavorite = true;
    RenderWithRouter(<Pokemon pokemon={ charmander } isFavorite={ isFavorite } />);
    const namePokemon = screen.getByTestId(/pokemon-name/i);
    expect(namePokemon.textContent).toBe(charmander.name);
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const rapidash = pokemons[6];
    const isFavorite = false;
    RenderWithRouter(<Pokemon pokemon={ rapidash } isFavorite={ isFavorite } />);
    const typePokemon = screen.getByTestId(/pokemon-type/i);
    expect(typePokemon.textContent).toBe(rapidash.type);
  });

  test(`O peso médio do pokémon deve ser exibido com um texto no formato
    Average weight: <value> <measurementUnit>, onde <value> e <measurementUnit> são,
    respectivamente, o peso médio do pokémon e sua unidade de medida`, () => {
    const mew = pokemons[5];
    const isFavorite = false;
    RenderWithRouter(<Pokemon pokemon={ mew } isFavorite={ isFavorite } />);
    const weightPokemon = screen.getByTestId(/pokemon-weight/i);
    const { value, measurementUnit } = mew.averageWeight;
    expect(weightPokemon.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
  });

  test(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src
   com a URL da imagem e um atributo alt com o texto <name> sprite, 
   onde <name> é o nome do pokémon`, () => {
    const alakazam = pokemons[4];
    const isFavorite = false;
    RenderWithRouter(<Pokemon pokemon={ alakazam } isFavorite={ isFavorite } />);
    const imgPokemon = screen.getByAltText(`${alakazam.name} sprite`);
    expect(imgPokemon).toHaveAttribute('src', `${alakazam.image}`);
    expect(imgPokemon).toBeVisible();
  });

  test(`Deve conter um link de navegação para exibir detalhes deste Pokémon. O link deve
   possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const ekans = pokemons[3];
    const isFavorite = false;
    RenderWithRouter(<Pokemon pokemon={ ekans } isFavorite={ isFavorite } />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${ekans.id}`);
  });

  test(`Ao clicar no link de navegação do Pokémon, é feito 
    o redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const caterpie = pokemons[2];
    const isFavorite = false;
    const { history } = RenderWithRouter(
      <Pokemon pokemon={ caterpie } isFavorite={ isFavorite } />,
    );
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${caterpie.id}`);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  test('O ícone será uma imagem com o atributo src com o caminho /star-icon.svg', () => {
    const pikachu = pokemons[0];
    const isFavorite = true;
    const { history } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ isFavorite } />,
    );
    history.push(`/pokemons/${pikachu.id}`);
    const iconFavorite = screen.getByAltText(`${pikachu.name} is marked as favorite`);
    expect(iconFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
