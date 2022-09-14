import React from 'react';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Mv.module.scss';
const cx = classNames.bind(styles);

function Mv() {
    useEffect(() => {
        document.title = 'Video | Tuyển tập nhạc hay chọn lọc';
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2>Mv page</h2>
        </div>
    );
}

export default Mv;
