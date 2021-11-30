import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  test('Testa se a página contém um heading h2 com "Page requested not found"', () => {
    RenderWithRouter(<NotFound />);
    const titleNotFound = (
      screen.getByRole('heading', { name: 'Page requested not found Crying emoji' }));
    expect(titleNotFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    RenderWithRouter(<NotFound />);
    const imgNotFound = (
      screen.getByAltText('Pikachu crying because the page requested was not found'));
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
