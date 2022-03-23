import { fireEvent, render, screen } from '@testing-library/react';
import Card from './card';

// TODO: test swipe action
describe('<Card />', () => {
  it('Should render the provided children', () => {
    const mockChildren = 'Mock Children';
    render(<Card>{mockChildren}</Card>);

    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });

  it('Should execute a function on click'),
    () => {
      const mockOnClick = jest.fn();
      const mockChildren = 'Mock Children';
      render(<Card onClick={mockOnClick}>{mockChildren}</Card>);

      fireEvent.click(screen.getByTestId('card'));

      expect(mockOnClick).toHaveBeenCalled();
    };
});
