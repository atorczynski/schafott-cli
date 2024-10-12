export const buttonTestCode = `
/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './components/Button';
import React from 'react';

test('loads and displays Hello', async () => {
  // ARRANGE
  render(<Button label="Hello" />);

  // ACT
  await screen.findByRole('button');

  // ASSERT
  expect(screen.getByRole('button')).toHaveTextContent('Hello');
});
`;
