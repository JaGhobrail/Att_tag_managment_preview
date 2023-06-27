import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import CommonPageSimple from '@common/core/CommonPageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { getOverview, getWeekly, selectOverview, selectWeekly } from './store/Slice';
import VendorsAppHeader from './VendorsAppHeader';
import VendorList from './components/VendorList';

function VendorsApp() {
  const dispatch = useDispatch();
  const overview = useSelector(selectOverview);
  const weekly = useSelector(selectWeekly);

  useEffect(() => {
    dispatch(getOverview());
    dispatch(getWeekly());
  }, [dispatch]);

  return (
    <CommonPageSimple
      header={<VendorsAppHeader />}
      content={
        <div className="w-full px-24 md:px-32 pb-24">
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (
              !_.isEmpty(overview) && !_.isEmpty(weekly) && (
                <motion.div className="w-full" variants={container} initial="hidden" animate="show">
                  <div className="grid grid-cols-1 gap-y-32 w-full mt-32">
                    <motion.div variants={item}>
                      <VendorList />
                    </motion.div>
                  </div>
                </motion.div>
              )
            );
          }, [overview, weekly])}
        </div>
      }
    />
  );
}

export default withReducer('vendorsApp', reducer)(VendorsApp);
