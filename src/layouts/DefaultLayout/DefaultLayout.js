import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import Player from '~/layouts/components/Player';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsExtendSidebar } from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const isOpenSidebarRight = useSelector((state) => state.audio.isOpenSidebarRight);
    const [sticky, setSticky] = useState(false);
    const dispatch = useDispatch();
    const handleScroll = (e) => {
        if (e.currentTarget.scrollTop) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    const handleScaleSidebar = () => {
        dispatch(setIsExtendSidebar(false));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div className={cx('content')}>
                    <div className={cx('header', sticky && 'sticky')}>
                        <Header />
                    </div>
                    <div className={cx('page')} onScroll={handleScroll} onClick={handleScaleSidebar}>
                        {children}
                    </div>
                </div>
                <div className={cx('right-sidebar', isOpenSidebarRight && 'active')}>
                    <RightSidebar />
                </div>
            </div>
            <div className={cx('player')}>
                <Player />
            </div>
        </div>
    );
}

export default DefaultLayout;
