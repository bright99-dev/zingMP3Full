import React from 'react';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
const cx = classNames.bind(styles);

function Following() {
    useEffect(() => {
        document.title = 'Nghệ sĩ | Xem bài hát, album, MV đang hot hiện tại';
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2>Following page</h2>
        </div>
    );
}

export default Following;
