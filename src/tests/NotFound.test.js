import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o Componente Not Found', () => {
  test('Testa se é renderizado o componente h2', () => {
    const { getByRole, history } = renderWithRouter(<NotFound />);

    history.push('/page-not-found');

    const notFoundTitle = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFoundTitle).toBeDefined();
  });

  test('Verifica se a imagem de não encontrado é exibida na tela', () => {
    const { getByAltText, history } = renderWithRouter(<NotFound />);

    history.push('/page-not-found');

    const image = getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
