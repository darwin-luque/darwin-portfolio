import { motion } from 'framer-motion';

const SearchIcon = () => (
  <motion.svg viewBox="0 0 24 24" role="presentation">
    <motion.path
      d="M11.4 5.9a5.5 5.5 0 110 11 5.5 5.5 0 110-11zM18 18l-2.5-2.5"
      fill="transparent"
      stroke-width="2"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </motion.svg>
);

export default SearchIcon;
