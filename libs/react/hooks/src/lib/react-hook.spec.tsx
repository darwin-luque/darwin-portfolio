import { render } from '@testing-library/react';

import ReactHook from './react-hook';

describe('ReactHook', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactHook />);
    expect(baseElement).toBeTruthy();
  });
});
