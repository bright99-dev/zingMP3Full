import request from '~/utils/httpRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Zingchart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartSongs from './ChartSongs';
import Loading from '../Loading';
import WeekChart from './WeekChart';
import Button from '~/components/Buttons';

import {
    setSrcAudio,
    setCurrentTime,
    setInfoSongPlayer,
    setSongId,
    setPlaylistSong,
    setIsPlay,
    setPlaylistId,
    setIsRadioPlay,
    setPlaylistRandom,
    setCurrnetIndexSong,
    setCurrentIndexSongRandom,
    setRandom,
} from '~/redux/features/audioSlice';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Zingchart() {
    const cx = classNames.bind(styles);

    const dispatch = useDispatch();
    const isRandom = useSelector((state) => state.audio.isRandom);
    const isPlay = useSelector((state) => state.audio.isPlay);
    const playlistId = useSelector((state) => state.audio.playlistId);

    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([]);
    console.log(result);

    useEffect(() => {
        request.get('/chart/home').then((res) => {
            setIsLoading(false);
            setResult(res.data);
            document.title = '#zingchart';
            console.log(result);
        });
    }, []);

    function shuffle(sourceArray) {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    const handlePlaySong = (song, playlist, id) => {
        let playlistCanPlay = [];
        if (song.streamingStatus === 1 && song.isWorldWide) {
            dispatch(setIsRadioPlay(false));
            dispatch(setPlaylistId(id));
            dispatch(setCurrentTime(0));
            dispatch(setSrcAudio(''));
            for (var i = 0; i < playlist.length; i++) {
                if (playlist[i].streamingStatus === 1 && playlist[i].isWorldWide) {
                    playlistCanPlay.push(playlist[i]);
                }
            }
            if (isRandom) {
                dispatch(setPlaylistRandom(shuffle([...playlistCanPlay])));
                dispatch(setSongId(song.encodeId));
                dispatch(setInfoSongPlayer(song));
                dispatch(setPlaylistSong(playlistCanPlay));
                dispatch(setCurrnetIndexSong(playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)));
                dispatch(setCurrentIndexSongRandom(-1));
                dispatch(setIsPlay(true));
            } else {
                dispatch(setCurrentIndexSongRandom(-1));
                dispatch(setInfoSongPlayer(song));
                dispatch(setSongId(song.encodeId));
                dispatch(setPlaylistSong(playlistCanPlay));
                dispatch(setCurrnetIndexSong(playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)));
                dispatch(setIsPlay(true));
            }
        } else {
            alert('This is vip song');
        }
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('bg-blur')}></div>
                <div className={cx('bg-alpha')}></div>
                <div className={cx('bg-alpha1')}></div>
                <div className={cx('header')}>
                    <h2>#zingchart</h2>
                    {result.RTChart.sectionId !== playlistId && (
                        <Button
                            circlem="true"
                            className={cx('play-btn')}
                            onClick={() => {
                                handlePlaySong(result.RTChart.items[0], result.RTChart.items, result.RTChart.sectionId);
                                dispatch(setRandom(false));
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    )}
                    {result.RTChart.sectionId === playlistId && isPlay && (
                        <Button
                            circlem="true"
                            className={cx('play-btn')}
                            onClick={() => {
                                dispatch(setIsPlay(false));
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    )}
                    {result.RTChart.sectionId === playlistId && !isPlay && (
                        <Button
                            circlem="true"
                            className={cx('play-btn')}
                            onClick={() => {
                                dispatch(setIsPlay(true));
                            }}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    )}
                </div>
                <div className={cx('content')}>
                    {result !== '' && <ChartSongs data={result} onClick={handlePlaySong} />}
                    <WeekChart data={result.weekChart} onClick={handlePlaySong} />
                </div>
            </div>
        );
    }
}

export default Zingchart;
