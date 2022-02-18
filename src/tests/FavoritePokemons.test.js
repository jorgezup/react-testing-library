import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Teste do Componente Favorite', () => {
  test('Testa se a mensagem "No favorite pokemon found" aparece na tela', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const msg = getByText('No favorite pokemon found');

    expect(msg).toBeDefined();
  });

  test('Verifica se é exibido na tela os pokemons favoritados', () => {
    const { getByTestId, getByRole, getByLabelText, history } = renderWithRouter(<App />);

    const moreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    /* Pega o nome do pokemon na página de detalhes */
    const pokemonName = getByTestId('pokemon-name');

    /* Pega o input de favorito, e favorita o pokemon */
    const favorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(favorite);

    /* Vai para a pagina de favoritos */
    history.push('/favorites');

    const pokemonFavoritePage = getByTestId('pokemon-name');

    expect(pokemonFavoritePage.textContent).toEqual(pokemonName.textContent);
  });
});
