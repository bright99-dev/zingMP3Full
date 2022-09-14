import { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './WeekChart.module.scss';
import request from '~/utils/httpRequest';
import WeekChartContent from './WeekChartContent';
import Loading from '../Loading';
import Button from '~/components/Buttons';

const cx = classNames.bind(styles);

function WeekChart() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        request.get('/chart/home').then((res) => {
            setData(res.data.weekChart);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('bg-blur')}></div>
                <div className={cx('bg-alpha')}></div>
                <div className={cx('bg-alpha1')}></div>
                <div className={cx('header')}>
                    <div className={cx('title')}>
                        <h3>Bảng Xếp Hạng Tuần</h3>
                    </div>
                    <div className={cx('tab')}>
                        <NavLink
                            className={(nav) => cx('tab-item', { active: nav.isActive })}
                            state={{ id: data.vn.playlistId }}
                            to={data.vn.link}
                        >
                            Việt Nam
                        </NavLink>

                        <NavLink
                            className={(nav) => cx('tab-item', { active: nav.isActive })}
                            state={{ id: data.us.playlistId }}
                            to={data.us.link}
                        >
                            US-UK
                        </NavLink>

                        <NavLink
                            className={(nav) => cx('tab-item', { active: nav.isActive })}
                            state={{ id: data.korea.playlistId }}
                            to={data.korea.link}
                        >
                            k-pop
                        </NavLink>
                    </div>
                    <Button roundedm className={cx('time')}>
                        <p>Tuần {data.vn.latestWeek + '(' + data.vn.startDate + ' - ' + data.vn.endDate + ')'}</p>
                    </Button>
                </div>
                <div className={cx('content')}>
                    <WeekChartContent />
                </div>
            </div>
        );
    }
}

export default WeekChart;
