import { render, screen } from '@testing-library/react';
import App from './App';

test('renders New Task button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/New Task/i);
  expect(buttonElement).toBeInTheDocument();
});
