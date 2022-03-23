import { fireEvent, render, screen } from '@testing-library/react';
import MenuToggle from './menu-toggle';

describe('<MenuToggle />', () => {
  it('Should render a animate x/burger icon', () => {
    render(<MenuToggle onToggle={() => null} />);

    expect(screen.getByTestId('animated-burger-x-icon')).toBeInTheDocument();
  });

  it('Should execute a function if the element is clicked', () => {
    const mockOnToggle = jest.fn();
    render(<MenuToggle onToggle={mockOnToggle} />);

    fireEvent.click(screen.getByTestId('menu-toggle'));

    expect(mockOnToggle).toHaveBeenCalled();
  });
});
