import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { memo } from 'react';
import _ from '@lodash';
import GlobalStyles from '@mui/material/GlobalStyles';
import CommonNavHorizontalLayout from './horizontal/CommonNavHorizontalLayout';
import CommonNavVerticalLayout from './vertical/CommonNavVerticalLayout';
import CommonNavVerticalLayout2 from './vertical/CommonNavVerticalLayout2';
import CommonNavHorizontalCollapse from './horizontal/types/CommonNavHorizontalCollapse';
import CommonNavHorizontalGroup from './horizontal/types/CommonNavHorizontalGroup';
import CommonNavHorizontalItem from './horizontal/types/CommonNavHorizontalItem';
import CommonNavHorizontalLink from './horizontal/types/CommonNavHorizontalLink';
import CommonNavVerticalCollapse from './vertical/types/CommonNavVerticalCollapse';
import CommonNavVerticalGroup from './vertical/types/CommonNavVerticalGroup';
import CommonNavVerticalItem from './vertical/types/CommonNavVerticalItem';
import CommonNavVerticalLink from './vertical/types/CommonNavVerticalLink';
import { registerComponent } from './CommonNavItem';

const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '.popper-navigation-list': {
        '& .common-list-item': {
          padding: '8px 12px 8px 12px',
          height: 40,
          minHeight: 40,
          '& .common-list-item-text': {
            padding: '0 0 0 8px',
          },
        },
        '&.dense': {
          '& .common-list-item': {
            minHeight: 32,
            height: 32,
            '& .common-list-item-text': {
              padding: '0 0 0 8px',
            },
          },
        },
      },
    })}
  />
);

/*
Register Navigation Components
 */
registerComponent('vertical-group', CommonNavVerticalGroup);
registerComponent('vertical-collapse', CommonNavVerticalCollapse);
registerComponent('vertical-item', CommonNavVerticalItem);
registerComponent('vertical-link', CommonNavVerticalLink);
registerComponent('horizontal-group', CommonNavHorizontalGroup);
registerComponent('horizontal-collapse', CommonNavHorizontalCollapse);
registerComponent('horizontal-item', CommonNavHorizontalItem);
registerComponent('horizontal-link', CommonNavHorizontalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

function CommonNavigation(props) {
  const options = _.pick(props, [
    'navigation',
    'layout',
    'active',
    'dense',
    'className',
    'onItemClick',
    'firstLevel',
    'selectedId',
  ]);
  if (props.navigation.length > 0) {
    return (
      <>
        {inputGlobalStyles}
        {props.layout === 'horizontal' && <CommonNavHorizontalLayout {...options} />}
        {props.layout === 'vertical' && <CommonNavVerticalLayout {...options} />}
        {props.layout === 'vertical-2' && <CommonNavVerticalLayout2 {...options} />}
      </>
    );
  }
  return null;
}

CommonNavigation.propTypes = {
  navigation: PropTypes.array.isRequired,
};

CommonNavigation.defaultProps = {
  layout: 'vertical',
};

export default memo(CommonNavigation);
