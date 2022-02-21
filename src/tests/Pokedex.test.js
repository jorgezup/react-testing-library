import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('Teste do Pokedex Componente', () => {
  test('Verifica se a pagina contem h2 com o texto', () => {
    const { getByRole } = renderWithRouter(<App />);

    const h2Title = getByRole('heading', { name: /Encountered pokémons/i, level: 2 });

    expect(h2Title).toBeDefined();
  });

  test('Verifica se aparece o proximo pokemon ao clicar no botao de proximo', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const btn = getByTestId('next-pokemon');

    data.forEach((pokemon, index, array) => {
      const nextPokemon = (index + 1) % (data.length); // para fazer o loop do último ir para o primeiro
      const pokemonScreen = getByText(pokemon.name);
      userEvent.click(btn);
      expect(pokemonScreen.textContent).toEqual(array[nextPokemon].name);
    });
  });

  test('Verifica se o filtro All está ativo', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const btnAll = getByRole('button', { name: 'All' });

    expect(btnAll).toBeDefined();

    userEvent.click(btnAll);

    const pikachu = getByTestId('pokemon-name');

    expect(pikachu).toBeDefined();
  });

  test('Verifica se e exibido um botão para cada tipo de Pokemon', () => {
    const { getByRole } = renderWithRouter(<App />);

    const types = data.map((pokemon) => pokemon.type);
    /* https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/ */
    const filteredTypes = [...new Set(types)];

    filteredTypes.forEach((type) => {
      const btn = getByRole('button', { name: `${type}` });
      expect(btn).toBeDefined();
    });
  });

  test('Verifica se ao filtrar o tipo do Pokemon e possivel navegar entre os filtrados',
    () => {
      const { getByTestId, getAllByTestId } = renderWithRouter(<App />);

      const allBtnTypes = getAllByTestId('pokemon-type-button');

      allBtnTypes.forEach((btn) => {
        const filteredPokemons = data
          .filter((pokemon) => pokemon.type === btn.textContent);
        userEvent.click(btn);
        filteredPokemons.forEach((_, index, array) => {
          const btnNext = getByTestId('next-pokemon');
          const nextPokemon = (index + 1) % (filteredPokemons.length); // para fazer o loop do último ir para o primeiro
          const pokemonScreen = getByTestId('pokemon-name');
          userEvent.click(btnNext);
          expect(pokemonScreen.textContent).toEqual(array[nextPokemon].name);
        });
      });
    });
});
