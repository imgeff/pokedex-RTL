import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Teste de Rotas em App.js', () => {
  test('Testa se o topo da aplicação tem um conjunto fixo de links de navegação', () => {
    RenderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  test('Ao clicar no link Home há um redirect para / ', () => {
    const { history } = RenderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Ao clicar no link About há um redirect para /about ', () => {
    const { history } = RenderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Ao clicar no link Pokémons Favoritados há um redirect para /favorites ', () => {
    const { history } = RenderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Ao entrar em uma url desconhecida há um redirect para Not Found ', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('url/nao/encontrada');
    const titleNotFound = screen.getByText(/Page requested not found/i);
    expect(titleNotFound).toBeInTheDocument();
  });
});
