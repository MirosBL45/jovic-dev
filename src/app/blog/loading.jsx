// components
import Spinner from '@/components/UIComponents/Spinner/Spinner';

export default function Loading() {
  return (
    <Spinner
      text={'Loading blogs... Grabbing from Database, Please be Patient'}
    />
  );
}
