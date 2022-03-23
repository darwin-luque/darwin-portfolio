const useLocation = jest.fn().mockReturnValue({
  pathname: '/'
});

const useHistory = jest.fn().mockReturnValue({
  push: jest.fn(),
});

const Link = ({ to, ...props }) => <a {...props} href={to} />

module.exports = { useLocation, useHistory, Link };
