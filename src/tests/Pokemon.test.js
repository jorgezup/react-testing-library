import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Teste do Componente Pokemon', () => {
  test('Verifica o nome, o tipo e o peso do pokemon', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    /* Pega o pikachu do Data */
    const pikachu = data[0];
    const { averageWeight: { value, measurementUnit } } = pikachu;

    /* Vai até a página do pikachu */
    history.push('/pokemons/25');

    const pikachuWeight = `${value} ${measurementUnit}`;

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');

    expect(pokemonName.textContent).toEqual(pikachu.name);
    expect(pokemonType.textContent).toEqual(pikachu.type);
    expect(pokemonWeight.textContent.split(': ')[1]).toEqual(pikachuWeight);
  });

  test('Verifica se a image com src e o alt correto são exibidos', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    /* Pega o pikachu do Data */
    const pikachu = data[0];
    const pikachuImg = pikachu.image;

    /* Vai até a página do pikachu */
    history.push('/pokemons/25');

    const pokemonImage = getByAltText('Pikachu sprite');

    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', pikachuImg);
  });

  test('Verfica se há um link de mais detalhes com o ID do Pokemon', () => {
    const { getByRole } = renderWithRouter(<App />);
    /* Pega o pikachu do Data */
    const pikachu = data[0];
    const { id } = pikachu;

    const moreDetails = getByRole('link', { name: 'More details' });

    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('Verfica se ao clicar no Link de Detalhes é redirecionado para a página', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    /* Pega o pikachu do Data */
    const pikachu = data[0];
    const { id } = pikachu;

    const moreDetails = getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const { location: { pathname } } = history;

    expect(pathname).toEqual(`/pokemons/${id}`);
  });

  test('Verfica se há imagem de favorito, caso o pokemon esteja favoritado', () => {
    const { getByAltText, getByLabelText, history } = renderWithRouter(<App />);
    /* Pega o pikachu do Data */
    const pikachu = data[0];
    const { id, name } = pikachu;

    history.push(`/pokemons/${id}`);

    /* Pega o input de favorito, e favorita o pokemon */
    const favorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(favorite);

    const imgStar = getByAltText(`${name} is marked as favorite`);

    expect(imgStar).toBeDefined();
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
