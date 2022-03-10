import { motion } from 'framer-motion';

const XIcon = ({ size = 32, color = '#eee' }) => (
  <motion.svg
    viewBox="0 0 24 24"
    role="presentation"
    width={size}
    height={size}
  >
    <motion.path
      d="M17 7L7 17M7 7l5.03 5.03L17 17"
      fill="transparent"
      strokeWidth="2"
      stroke={color}
      strokeLinecap="round"
    />
  </motion.svg>
);

export default XIcon;
