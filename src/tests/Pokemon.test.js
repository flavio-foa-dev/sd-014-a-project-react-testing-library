import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Test Pokemon component', () => {
  it('renders a card with the information of a certain Pokémon', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

      const { averageWeight, image, name, type } = pokemon;
      const { measurementUnit, value } = averageWeight;

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImage = screen.getByRole('img');

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);

      // Cleanup is necessary to avoid memory leaks in the test environment
      cleanup();
    });
  });

  it('contains a link to display details on the Pokémon card', () => {
    // (The link must have the URL /pokemons/<id>, where <id> is the id of the Pokemon displayed)
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

      const link = screen.getByRole('link', { name: 'More details' });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      // Cleanup is necessary to avoid memory leaks in the test environment
      cleanup();
    });
  });
});
