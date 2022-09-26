import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import Player from '~/layouts/components/Player';
import styles from './DefaultLayout.module.scss';
import { setIsExtendSidebar, setIsOpenSidebarRight } from '~/redux/audioSlice';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    const isOpenSidebarRight = useSelector((state) => state.audio.isOpenSidebarRight);
    const currentIndexSongRandom = useSelector((state) => state.audio.currentIndexSongRandom);
    const currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
    const srcRadio = useSelector((state) => state.audio.srcRadio);
    const [sticky, setSticky] = useState(false);

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
    const handleHiddenRightSidebar = () => {
        dispatch(setIsOpenSidebarRight(false));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sidebar')} onClick={handleHiddenRightSidebar}>
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
                {(!!currentIndexSong || !!currentIndexSongRandom || !!srcRadio) && <Player />}
            </div>
        </div>
    );
}

export default DefaultLayout;
