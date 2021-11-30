import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    RenderWithRouter(<About />);
    const PokedexH2 = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(PokedexH2).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    RenderWithRouter(<About />);
    const PokedexH2 = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can Filter Pokémons/i);
    expect(PokedexH2).toBeInTheDocument();
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('Testa se a página contém a imagem de uma Pokédex:', () => {
    RenderWithRouter(<About />);
    const imgPokedex = screen.getByAltText(/Pokédex/i);
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
