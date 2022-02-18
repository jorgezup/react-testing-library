import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do Componente App.js', () => {
  test('Se a página home é renderizada ao ser clicado no link Home', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const homeLink = getAllByRole('link')[0];

    history.push('/');

    const homeTitle = screen.getByRole('heading', {
      name: 'Pokédex',
      level: 1,
    });

    expect(homeLink.textContent).toEqual('Home');
    expect(history.location.pathname).toBe('/');
    expect(homeTitle).toBeDefined();
  });

  test('Se a página about é renderizada ao ser clicado no link About', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const aboutLink = getAllByRole('link')[1];

    history.push('/about');

    const aboutTitle = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(history.location.pathname).toBe('/about');
    expect(aboutTitle).toBeDefined();
    expect(aboutLink.textContent).toEqual('About');
  });

  test('Se a página Favorites é renderizada ao ser clicado no link Favorites',
    () => {
      const { getAllByRole, history } = renderWithRouter(<App />);
      const favorites = getAllByRole('link')[2];

      history.push('/favorites');

      expect(history.location.pathname).toBe('/favorites');
      expect(favorites.textContent).toEqual('Favorite Pokémons');
    });
});
