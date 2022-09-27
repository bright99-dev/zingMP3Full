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
import Artist from '~/components/Artist';

const cx = classNames.bind(styles);

function Search() {
    const location = useLocation();
    const keyword = localStorage.getItem('searchKeyWord');
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
            console.log(data.songs);
        });
    }, [keyword]);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <h3>Kết quả tìm kiếm </h3>
                <span className={cx('title')}>Nổi bật</span>
                <div className={cx('grid-song')}>
                    {data.songs.slice(0, 1).map((song) => (
                        <SongItemShort
                            active={true}
                            onClick={() => handlePlaySong(song)}
                            key={song.encodeId}
                            data={song}
                        />
                    ))}
                    {data.songs.slice(0, 1).map((song) => (
                        <Artist active={true} onClick={() => handlePlaySong(song)} key={song.encodeId} data={song} />
                    ))}
                    {data.songs.slice(1, 2).map((song) => (
                        <SongItemShort
                            active={true}
                            onClick={() => handlePlaySong(song)}
                            key={song.encodeId}
                            data={song}
                        />
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
