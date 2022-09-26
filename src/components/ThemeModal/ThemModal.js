import styles from './ThemModal.module.scss';
import classNames from 'classnames/bind';
import ThemItem from './ThemItem';

const cx = classNames.bind(styles);
export default function ThemModal() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <ThemItem />
            </div>
        </div>
    );
}
