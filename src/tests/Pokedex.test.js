import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const dataId = 'pokemon-name';
describe('Testa se o component Pokedex renderiza na tela', () => {
  it('Verifica se a pagina apresenta o título "Encounterd Pokémons" ', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo pokemon ao clicar'
    + 'no botão próximo pokemon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId('next-pokemon');
    const pokemonName = screen.getByTestId(dataId);
    expect(nextButton.innerHTML).toBe('Próximo pokémon');
    userEvent.click(nextButton);
    expect(pokemonName).toHaveTextContent('Charmander');
  });

  it('Verifica se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(dataId);
    expect(pokemon).toHaveLength(1);
  });

  it('Verifica se a pokedex apresenta os botões de filtro', () => {
    renderWithRouter(<App />);
    const pokemonTypes = ['Electric', 'Fire',
      'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    pokemonTypes.forEach((type) => expect(screen.getByRole('button', {
      name: type,
    })).toBeInTheDocument());

    const typeButton = screen.getAllByTestId('pokemon-type-button');
    const LENGTH = 7;
    expect(typeButton).toHaveLength(LENGTH);

    userEvent.click(typeButton[1]);
    const pokemon = screen.getByTestId(dataId);
    expect(pokemon).toHaveTextContent('Charmander');
    const nextButton = screen.getByTestId('next-pokemon');
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent('Rapidash');

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeVisible();
  });

  it('Verifica se a pokedex apresenta um botão de reset', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', {
      name: 'All',
    });
    const pokemon = screen.getByTestId(dataId);
    expect(resetButton).toHaveTextContent('All');
    userEvent.click(resetButton);
    expect(pokemon.innerHTML).toBe('Pikachu');
  });
});
