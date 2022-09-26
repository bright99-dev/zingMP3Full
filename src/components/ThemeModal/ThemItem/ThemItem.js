import styles from './ThemItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export default function ThemItem() {
    return <div className={cx('wrapper')}></div>;
}
