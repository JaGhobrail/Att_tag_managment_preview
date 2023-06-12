import CommonSidePanel from '@common/core/CommonSidePanel';
import { memo } from 'react';
import NavigationShortcuts from '../../shared-components/NavigationShortcuts';

function LeftSideLayout3() {
  return (
    <>
      <CommonSidePanel>
        <NavigationShortcuts className="py-16 px-8" variant="vertical" />
      </CommonSidePanel>
    </>
  );
}

export default memo(LeftSideLayout3);
