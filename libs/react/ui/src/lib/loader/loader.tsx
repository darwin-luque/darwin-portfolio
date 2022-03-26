import Grid from './grid/grid';
import Radar from './radar/radar';
import Ring from './ring/ring';
import Spinner from './spinner/spinner';
import SpinningDots from './spinning-dots/spinning-dots';
import ThreeDots from './three-dots/three-dots';

export interface SizeProps {
  size?: number;
}

export interface LoaderProps extends SizeProps {
  type?: 'grid' | 'radar' | 'ring' | 'spinner' | 'spinning-dots' | 'three-dots';
}

export const Loader = ({ size, type }: LoaderProps) => {
  let Template: (props: SizeProps) => JSX.Element;

  switch (type) {
    case 'grid':
      Template = Grid;
      break;
    case 'radar':
      Template = Radar;
      break;
    case 'ring':
      Template = Ring;
      break;
    case 'spinner':
      Template = Spinner;
      break;
    case 'spinning-dots':
      Template = SpinningDots;
      break;
    case 'three-dots':
    default:
      Template = ThreeDots;
  }

  return <Template size={size} />;
};
