const useLocation = jest.fn().mockReturnValue({
  pathname: '/'
});

const useHistory = jest.fn().mockReturnValue({
  push: jest.fn(),
});

const Link = ({ to, children, ...props }) =>
  <a {...props} href={to}>{children}</a>

module.exports = { useLocation, useHistory, Link };
