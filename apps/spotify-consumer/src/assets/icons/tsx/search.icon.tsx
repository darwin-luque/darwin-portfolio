import { motion } from 'framer-motion';

const SearchIcon = ({ size = 32, color = '#eee' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="presentation"
  >
    <motion.path
      d="M11.4 5.9a5.5 5.5 0 110 11 5.5 5.5 0 110-11zM18 18l-2.5-2.5"
      fill="transparent"
      strokeWidth="2"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export default SearchIcon;
