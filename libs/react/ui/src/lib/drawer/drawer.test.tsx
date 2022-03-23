import { render, screen } from '@testing-library/react';
import { Drawer } from './drawer';

describe('<Drawer />', () => {
  it('Should render a simple circle if show is false', () => {
    render(<Drawer show={false}>Mock</Drawer>);

    setTimeout(() => {
      expect(screen.getByTestId('drawer').getAttribute('style')).toContain(
        'circle(30px at 40px 40px)'
      );
    }, 1000);
  });

  it('Should render the drawer if show is true', () => {
    const mockHeight = 1000;
    render(<Drawer show testingHeight={mockHeight}>Mock</Drawer>);

    setTimeout(() => {
      expect(screen.getByTestId('drawer').getAttribute('style')).toContain(
        `circle(${mockHeight * 2 + 200}px at 40px 40px)`
      );
    }, 1000);
  });

  it('Should render the provided children', () => {
    const mockChildren = 'Mock Children'
    render(<Drawer show={false}>{mockChildren}</Drawer>);

    expect(screen.getByText(mockChildren));
  })
});
