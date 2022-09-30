import styles from './ThemItem.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import { setThemeCurrent } from '~/redux/audioSlice';

const cx = classNames.bind(styles);
export default function ThemItem(data) {
    const dispatch = useDispatch();
    const datareceived = data.data;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img')}>
                <Button
                    roundeds
                    purple
                    className={cx('btn', 'btn-apply')}
                    state={datareceived.color}
                    onClick={() => {
                        dispatch(setThemeCurrent(datareceived.color));
                    }}
                >
                    Áp dụng
                </Button>
                <Button roundeds className={cx('btn')}>
                    Xem trước
                </Button>
                <img src={datareceived.link} alt="img" />
            </div>
            <div className={cx('title')}>{datareceived.title}</div>
        </div>
    );
}
