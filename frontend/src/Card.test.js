import { render, screen } from '@testing-library/react';
import Card from './components/content/Card';

jest.mock('axios');

test('renders card component', () => {
  render(<Card image="test.jpg" />);
  const cardElement = screen.getByRole('img');
  expect(cardElement).toBeInTheDocument();
});
