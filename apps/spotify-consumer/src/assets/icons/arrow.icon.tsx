const ArrowIcon = ({ width = 24, color='#eee', length=15 }) => (
  <svg
    viewBox="0 0 24 24"
    width={width}
    role="presentation"
  >
    <path
      fill="transparent"
      d={`M7 12h${length}l-5-5 5 5-5 5`}
      strokeWidth="2"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export default ArrowIcon;
