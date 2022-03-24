import { Type } from '../modal';
import BadSuspensionModal from './bad-suspension';
import DropInModal from './drop-in';
import FlipModal from './flip';
import NewspaperModal from './newspaper';
import { TypeProps } from './type-props';

interface ModalTypeProps extends TypeProps {
  type: Type;
}

const ModalType = ({ type, ...props }: ModalTypeProps) => {
  switch (type) {
    case 'badSuspension':
      return <BadSuspensionModal {...props} />;
    case 'flip':
      return <FlipModal {...props} />;
    case 'newspaper':
      return <NewspaperModal {...props} />;
    default:
    case 'dropIn':
      return <DropInModal {...props} />;
  }
};

export default ModalType
