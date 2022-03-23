import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, To } from 'history';
import NavbarElement, {
  NavbarElementProps,
} from '../../../../components/navbar/desktop-navbar/navbar-element/navbar-element';

let pushSpy: jest.SpyInstance<void, [to: To, state?: unknown]>;

const RouterNavbarElement = (props: NavbarElementProps) => {
  const history = createMemoryHistory();
  pushSpy = jest.spyOn(history, 'push');

  return (
    <Router
      history={{
        ...history,
        length: 0,
        goBack: jest.fn(),
        goForward: jest.fn(),
        block: jest.fn(),
        listen: jest.fn(),
      }}
    >
      <NavbarElement {...props} />
    </Router>
  );
};

describe('<NavbarElement />', () => {
  it('Should not render anything if show is false', () => {
    render(<RouterNavbarElement show={false} name="name" to="to" />);

    expect(screen.queryByTestId(/navbar-element/i)).toBeNull();
  });

  it('Should navigate to the provided link', () => {
    const link = '/mock';
    const name = 'Mock Name';
    render(<RouterNavbarElement name={name} to={link} />);

    fireEvent.click(screen.getByText(name));

    expect(pushSpy).toHaveBeenCalledWith(link);
  });

  it('Should render the provided name', () => {
    const name = 'Mock Name';
    render(<RouterNavbarElement name={name} to="to" />);

    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
