import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import CommonPageSimple from '@common/core/CommonPageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { selectAllItems, getItems, getVendors } from './store/Slice';
import AppHeader from './AppHeader';
import AppConfig from './AppConfig';
import AppListContainer from './components/AppListContainer';

function App() {
    const items = useSelector(selectAllItems);

    return (
        <CommonPageSimple
            header={<AppHeader />}
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
                            <motion.div className="w-full" variants={container} initial="hidden" animate="show">
                                <div className="grid grid-cols-1 gap-y-32 w-full mt-32">
                                    <motion.div variants={item}>
                                        <AppListContainer />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )
                    }, [items])}
                </div>
            }
        />
    );
}

export default withReducer(AppConfig.settings.store, reducer)(App);
