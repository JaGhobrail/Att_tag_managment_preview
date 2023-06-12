import { useSelector } from 'react-redux';
import CommonSearch from '@common/core/CommonSearch';
import { selectFlatNavigation } from 'app/store/common/navigationSlice';

function NavigationSearch(props) {
  const { variant, className } = props;
  const navigation = useSelector(selectFlatNavigation);

  return <CommonSearch className={className} variant={variant} navigation={navigation} />;
}

export default NavigationSearch;
