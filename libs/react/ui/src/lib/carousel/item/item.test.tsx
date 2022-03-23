import { render, screen } from '@testing-library/react';
import Item from './item';

describe('<Item />', () => {
  it('Should render the provided children', () => {
    const mockChildren = 'Mock Children';
    render(<Item direction={1}>{mockChildren}</Item>);

    setTimeout(() => {
      expect(screen.getByText(mockChildren)).toBeInTheDocument();
    }, 1000);
  });
});
