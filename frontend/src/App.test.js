import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main heading', async () => {
  render(<App />
  );
  const linkElement = await screen.findByRole('heading', {
    name: /Unveiling Wonders, Crafting Memories/i,
  });
  expect(linkElement).toBeInTheDocument();
});
