import { fireEvent, render, screen } from '@testing-library/react';
import SidebarElement from '../../../../../components/navbar/mobile-navbar/sidebar/sidebar-element/sidebar-element';

describe('<SidebarElement />', () => {
  it('Should render anything if show is false', () => {
    render(<SidebarElement show={false} />);

    expect(screen.queryByTestId(/sidebar-element/i)).not.toBeInTheDocument();
  });

  it('Should render the provided children', () => {
    const mockChildren = 'Mock Chdilren';

    render(<SidebarElement>{mockChildren}</SidebarElement>);

    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });

  it('Should render the provided name and execute an element click callback and the sidebar toggle', () => {
    const mockName = 'Mock Name';
    const mockOnToggleSidebar = jest.fn();
    const mockOnElementClick = jest.fn();

    render(
      <SidebarElement
        name={mockName}
        onToggleSidebar={mockOnToggleSidebar}
        onElementClick={mockOnElementClick}
      />
    );

    fireEvent.click(screen.getByText(mockName));
    
    expect(mockOnToggleSidebar).toHaveBeenCalled();
    expect(mockOnElementClick).toHaveBeenCalled();
  });
});
