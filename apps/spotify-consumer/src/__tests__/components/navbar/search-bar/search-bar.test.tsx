import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../../../../components/navbar/search-bar/search-bar';

describe('<SearchBar />', () => {
  it('Should not render the input if show bar is false', () => {
    render(
      <SearchBar
        showBar={false}
        inputValue=""
        onInputChange={() => null}
        onToggleBar={() => null}
      />
    );

    expect(screen.getByTestId(/search-input/i).getAttribute('style')).toContain(
      'width: 0px'
    );
  });

  it('Should render the input if show bar is true', () => {
    render(
      <SearchBar
        showBar
        inputValue=""
        onInputChange={() => null}
        onToggleBar={() => null}
      />
    );

    // Animation of 500ms or 0.5s keeps the width as 0px
    setTimeout(() => {
      expect(
        screen.getByTestId(/search-input/i).getAttribute('style')
      ).toContain('width: 300px');
    }, 600);
  });

  it('Should provide the value for the input', () => {
    const mockValue = 'Mock Value';
    render(
      <SearchBar
        showBar
        inputValue={mockValue}
        onInputChange={() => null}
        onToggleBar={() => null}
      />
    );

    expect(screen.getByTestId(/search-input/i).getAttribute('value')).toEqual(
      mockValue
    );
  });

  it('Should trigger an on change callback when typing on the input', () => {
    const mockValue = 'Mock Value';
    const mockOnChange = jest.fn();
    render(
      <SearchBar
        showBar
        inputValue=""
        onInputChange={mockOnChange}
        onToggleBar={() => null}
      />
    );

    fireEvent.change(screen.getByTestId(/search-input/i), {
      target: { value: mockValue },
    });

    expect(mockOnChange).toHaveBeenCalledWith(mockValue);
  });

  it('Should render a search icon if the search bar is closed', () => {
    render(
      <SearchBar
        showBar={false}
        inputValue=""
        onInputChange={() => null}
        onToggleBar={() => null}
      />
    );

    expect(screen.getByTestId(/search-icon/i)).toBeInTheDocument();
  });

  it('Should render an "x" icon if the search bar is closed', () => {
    render(
      <SearchBar
        showBar
        inputValue=""
        onInputChange={() => null}
        onToggleBar={() => null}
      />
    );

    expect(screen.getByTestId(/x-icon/i)).toBeInTheDocument();
  });

  it('Should execute a function when an icon is clicked', () => {
    const mockOnToggleBar = jest.fn();
    render(
      <SearchBar
        showBar
        inputValue=""
        onInputChange={() => null}
        onToggleBar={mockOnToggleBar}
      />
    );

    fireEvent.click(screen.getByTestId(/icon-btn/i));

    expect(mockOnToggleBar).toHaveBeenCalled();
  });
});
