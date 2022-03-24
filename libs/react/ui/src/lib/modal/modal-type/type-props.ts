import { ReactNode } from 'react';

export interface TypeProps {
  text?: string;
  title?: string;
  className?: string;
  children?: ReactNode;
  handleClose: () => void;
}
