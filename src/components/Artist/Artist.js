import { Link } from 'react-router-dom';
import styles from './Artist.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function SongItemShort({ data, onClick, active }) {
    return (
        <div onDoubleClick={onClick}>
            {data.artists ? (
                data.artists.slice(0, 1).map((artist) => (
                    <Link
                        to={artist.link}
                        state={{ artistName: artist.alias }}
                        key={artist.id}
                        className={cx('wrapper', active && 'bg')}
                    >
                        <div className={cx('avatar')}>
                            <img src={data.thumbnail} alt={data.alias} />
                        </div>
                        <div className={cx('info')}>
                            <span className={cx('title')}>Nghệ sĩ</span>
                            <div className={cx('singers')}>{artist.name}</div>
                        </div>
                    </Link>
                ))
            ) : (
                <span className={cx('artists')}>{data.artistsNames}</span>
            )}
        </div>
    );
}

export default SongItemShort;
