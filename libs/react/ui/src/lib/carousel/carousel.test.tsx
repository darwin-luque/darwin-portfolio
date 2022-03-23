import { fireEvent, render, screen } from '@testing-library/react';
import { Carousel } from './carousel';

const MockTemplate = ({ name, id }: { name: string; id: number }) => (
  <p data-testid={`mock-template-${id}`}>{name}</p>
);

describe('<Carousel />', () => {
  it('Should render as much items as intended on the per page', () => {
    const mockData: { id: number; name: string }[] = [
      { id: 0, name: 'Mock Name 0' },
      { id: 1, name: 'Mock Name 1' },
      { id: 2, name: 'Mock Name 2' },
      { id: 3, name: 'Mock Name 3' },
      { id: 4, name: 'Mock Name 4' },
      { id: 5, name: 'Mock Name 5' },
    ];
    const mockPerPage = 4;
    render(
      <Carousel
        data={mockData}
        perPage={mockPerPage}
        ElementTemplate={MockTemplate}
      />
    );

    expect(screen.getAllByTestId('item')).toHaveLength(mockPerPage);
  });

  it('Should render the next element and remove the first if the next button is pressed', () => {
    const mockData: { id: number; name: string }[] = [
      { id: 0, name: 'Mock Name 0' },
      { id: 1, name: 'Mock Name 1' },
      { id: 2, name: 'Mock Name 2' },
      { id: 3, name: 'Mock Name 3' },
      { id: 4, name: 'Mock Name 4' },
      { id: 5, name: 'Mock Name 5' },
    ];
    const mockPerPage = 2;
    render(
      <Carousel
        data={mockData}
        perPage={mockPerPage}
        ElementTemplate={MockTemplate}
      />
    );

    expect(screen.getByTestId('mock-template-0')).toBeInTheDocument();
    expect(screen.getByTestId('mock-template-1')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-template-2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('next-button'));

    expect(screen.queryByTestId('mock-template-0')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-template-1')).toBeInTheDocument();
    expect(screen.getByTestId('mock-template-2')).toBeInTheDocument();
  });

  it('Should render the pervious element and remove the last if the next button is pressed', () => {
    const mockData: { id: number; name: string }[] = [
      { id: 0, name: 'Mock Name 0' },
      { id: 1, name: 'Mock Name 1' },
      { id: 2, name: 'Mock Name 2' },
      { id: 3, name: 'Mock Name 3' },
      { id: 4, name: 'Mock Name 4' },
      { id: 5, name: 'Mock Name 5' },
    ];
    const mockPerPage = 2;
    render(
      <Carousel
        data={mockData}
        perPage={mockPerPage}
        ElementTemplate={MockTemplate}
      />
    );

    expect(screen.getByTestId('mock-template-0')).toBeInTheDocument();
    expect(screen.getByTestId('mock-template-1')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-template-4')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-template-5')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('prev-button'));

    expect(screen.queryByTestId('mock-template-0')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-template-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-template-4')).toBeInTheDocument();
    expect(screen.getByTestId('mock-template-5')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('prev-button'));

    expect(screen.queryByTestId('mock-template-5')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-template-4')).toBeInTheDocument();
    expect(screen.getByTestId('mock-template-3')).toBeInTheDocument();
  });
});
