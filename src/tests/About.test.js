import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Teste do Component About', () => {
  test('Verifica se a página contém um h2 com o texto "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);

    const aboutTitle = getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(aboutTitle).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphs = getAllByText(/pokémons/i);

    expect(paragraphs).toHaveLength(2);
  });

  test('Verifica se a imagem recebe o determinado "src" ', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
