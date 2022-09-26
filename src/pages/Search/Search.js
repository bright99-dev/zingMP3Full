import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    setIsRadioPlay,
    setIsPlay,
    setSongId,
    setInfoSongPlayer,
    setPlaylistSong,
    setPlaylistRandom,
    setLoop,
    setRandom,
    setSrcAudio,
    setCurrentTime,
    setIsDisabled,
} from '~/redux/audioSlice';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import request from '~/utils/httpRequest';
import SongItem from '~/components/SongItem';
import SongItemShort from '~/components/SongItemShort';
import Item from '~/components/Item';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Search() {
    const loaction = useLocation();
    const { keyword } = loaction.state;
    const [data, setData] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const dispatch = useDispatch();

    const handlePlaySong = (song) => {
        dispatch(setIsDisabled(false));
        dispatch(setSrcAudio(''));
        dispatch(setCurrentTime(0));
        dispatch(setIsRadioPlay(false));
        dispatch(setSongId(song.encodeId));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong([song]));
        dispatch(setPlaylistRandom([song]));
        dispatch(setIsPlay(true));
        dispatch(setLoop(true));
        dispatch(setRandom(false));
    };

    useEffect(() => {
        request.get(`/search?keyword=${keyword}`).then((res) => {
            setIsloading(false);
            setData(res.data);
            console.log(data);
        });
    }, [keyword]);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <h1>Kết quả tìm kiếm </h1>
                <div className={cx('song-short')}>
                    <span className={cx('title')}>Nổi bật</span>
                    {data.songs.slice(0, 1).map((song) => (
                        <SongItemShort onClick={() => handlePlaySong(song)} key={song.encodeId} data={song} />
                    ))}
                </div>

                <span className={cx('title')}>Bài hát</span>
                <div className={cx('song')}>
                    {data.songs.slice(0, 6).map((song) => (
                        <SongItem
                            onClick={() => handlePlaySong(song)}
                            key={song.encodeId}
                            data={song}
                            type="mini"
                            className={cx('custom-song')}
                        />
                    ))}
                </div>

                <div className={cx('header-playlist')}>
                    <span className={cx('title')}>Playlist/Album</span>
                </div>
                <div className={cx('grid')}>
                    {data.playlists.slice(0, 5).map((playlist, index) => (
                        <Item data={playlist} key={index} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Search;
