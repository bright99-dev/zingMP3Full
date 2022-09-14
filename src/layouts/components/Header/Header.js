import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import Search from '../Search';
import {
    faArrowLeftLong,
    faArrowRightLong,
    faBars,
    faGear,
    faShirt,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import { faVuejs } from '@fortawesome/free-brands-svg-icons';
import Button from '~/components/Buttons';
import { setIsExtendSidebar } from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const handleOpenSidebar = () => {
        dispatch(setIsExtendSidebar(true));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('icon')}>
                    <Button circlem="true" className={cx('icon-row')}>
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </Button>
                    <Button circlem="true" className={cx('icon-row')}>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </Button>
                    <Button circlem="true" className={cx('icon-bar')} onClick={handleOpenSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                </div>
                <div className={cx('search-fields')}>
                    <Search />
                </div>
            </div>
            <div className={cx('right')}>
                <Button circlem="true" className={cx('icon')}>
                    <FontAwesomeIcon icon={faShirt} />
                </Button>
                <Button circlem="true" className={cx('icon')}>
                    <FontAwesomeIcon icon={faVuejs} />
                </Button>
                <Button circlem="true" className={cx('icon', 'upload')}>
                    <FontAwesomeIcon icon={faUpload} />
                </Button>
                <Button circlem="true" className={cx('icon')}>
                    <FontAwesomeIcon icon={faGear} />
                </Button>
                <Button circlem="true" className={cx('icon', 'img')}>
                    <img
                        src="https://s120-ava-talk-zmp3.zmdcdn.me/c/f/5/9/36/120/d7e2c9af9754c1305c6163278f0824c8.jpg"
                        alt="logo"
                    />
                </Button>
            </div>
        </div>
    );
}

export default Header;
