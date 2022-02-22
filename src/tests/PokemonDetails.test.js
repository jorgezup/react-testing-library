import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste do Component PokemonDetails', () => {
  test('Verifica se ha o h2 na pagina', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const { id, name } = pokemon;
      history.push(`/pokemons/${id}`);
      const h2Title = getByRole('heading', { name: `${name} Details`, level: 2 });
      expect(h2Title).toBeInTheDocument();
    });
  });

  test('Verifica se ha h2 com Summary', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const { id } = pokemons[0];

    history.push(`/pokemons/${id}`);

    const h2Summary = getByRole('heading', { name: 'Summary', level: 2 });

    expect(h2Summary).toBeDefined();

    const pSummary = getByText(/This intelligent Pokémon roasts hard berries with/i);
    expect(pSummary).toBeDefined();
  });

  test('Verifica se ha mapas com a localizacao do pokemon', () => {
    const { getByRole, getAllByAltText, history } = renderWithRouter(<App />);
    const { id, name, foundAt } = pokemons[0];

    history.push(`/pokemons/${id}`);

    const h2Game = getByRole('heading', { name: `Game Locations of ${name}`, level: 2 });
    expect(h2Game).toBeDefined();

    const images = getAllByAltText('Pikachu location');

    foundAt.forEach(({ location, map }, index) => {
      expect(location).toBeDefined();
      expect(images[index]).toHaveAttribute('src', map);
    });
  });

  test('Verifica se ha um checkbox', () => {
    const { getByAltText, getByLabelText, history } = renderWithRouter(<App />);
    const { id } = pokemons[0];

    history.push(`/pokemons/${id}`);

    const input = getByLabelText('Pokémon favoritado?');

    userEvent.click(input);

    expect(input).toBeDefined();

    const imgStar = getByAltText('Pikachu is marked as favorite');
    expect(imgStar).toBeInTheDocument();
  });
});
