import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import request from '~/utils/httpRequest';

import Loading from '../Loading';

import classNames from 'classnames/bind';
import styles from './Artist.module.scss';
import Button from '~/components/Buttons';
import SongItem from '~/components/SongItem';
import {
    setIsPlay,
    setPlaylistSong,
    setSongId,
    setInfoSongPlayer,
    setIsRadioPlay,
    setRandom,
    setPrevSong,
    setPlaylistId,
    setCurrentTime,
    setSrcAudio,
    setPlaylistRandom,
    setCurrentIndexSongRandom,
    setCurrnetIndexSong,
} from '~/redux/features/audioSlice';
import Section from '~/components/Section';
import Item from '~/components/Item';

const cx = classNames.bind(styles);

function Artist() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { artistName } = location.state;
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const [isFullList, setIsFullList] = useState(false);
    const [contentBtn, setContentBtn] = useState('Xem Tất Cả');
    const isRandom = useSelector((state) => state.audio.isRandom);
    const isPlay = useSelector((state) => state.audio.isPlay);
    const playlistId = useSelector((state) => state.audio.playlistId);

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    const handleGetSong = (song, playlist, id) => {
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
    const handlePlayRandom = async (playlist, id) => {
        let songsCanPlay = [];
        let randomIndex;

        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i].streamingStatus === 1 && playlist[i].isWorldWide) {
                await songsCanPlay.push(playlist[i]);
            }
        }
        await songsCanPlay;
        if (songsCanPlay.length === 0) {
            alert('This is vip playlist');
        } else {
            dispatch(setPlaylistId(id));
            dispatch(setIsPlay(true));
            dispatch(setIsRadioPlay(false));
            dispatch(setCurrentTime(0));
            dispatch(setSrcAudio(''));
            randomIndex = Math.floor(Math.random() * songsCanPlay.length - 1) + 1;
            dispatch(setSongId(songsCanPlay[randomIndex].encodeId));
            dispatch(setInfoSongPlayer(songsCanPlay[randomIndex]));
            dispatch(setPlaylistSong(songsCanPlay));
            dispatch(setPlaylistRandom(shuffle([...songsCanPlay])));
            dispatch(setCurrnetIndexSong(randomIndex));
            dispatch(setCurrentIndexSongRandom(-1));
            dispatch(setRandom(true));
        }
    };

    useEffect(() => {
        setIsLoading(true);
        request.get(`/artist/${artistName}`).then((res) => {
            setData(res.data);
            setSongs(res.data.sections[0].items);
            setIsLoading(false);
            document.title = res.data.name;
        });
    }, [artistName]);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('info')}>
                    <div className={cx('bio')}>
                        <h1 className={cx('name')}>{data.name}</h1>
                        <p className={cx('desc')}>{data.sortBiography}</p>
                        <>
                            {playlistId !== data.encodeId && (
                                <Button
                                    roundedm
                                    className={cx('play-btn')}
                                    onClick={() => {
                                        handlePlayRandom(data.sections[0].items, data.encodeId);
                                    }}
                                >
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </span>
                                    PHÁT NHẠC
                                </Button>
                            )}
                            {playlistId === data.encodeId && isPlay && (
                                <Button
                                    roundedm
                                    className={cx('play-btn')}
                                    onClick={() => {
                                        dispatch(setIsPlay(!isPlay));
                                    }}
                                >
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPause} />
                                    </span>
                                    TẠM NGỪNG
                                </Button>
                            )}
                            {playlistId === data.encodeId && !isPlay && (
                                <Button
                                    roundedm
                                    className={cx('play-btn')}
                                    onClick={() => {
                                        dispatch(setIsPlay(!isPlay));
                                    }}
                                >
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </span>
                                    TIẾP TỤC PHÁT
                                </Button>
                            )}
                        </>
                    </div>
                    <div className={cx('avatar')}>
                        <img alt={data.alias} src={data.thumbnailM} />
                    </div>
                </div>
                <div className={cx('songs-top')}>
                    <h3 className={cx('title')}>Bài Hát Nổi Bật</h3>
                    <div className={cx('content')}>
                        <div className={cx('avatar')}>
                            <img alt={data.alias} src={data.thumbnailM} />
                        </div>
                        <div className={cx('songs-section')}>
                            {songs.map((song, index) => (
                                <SongItem
                                    data={song}
                                    key={index}
                                    onClick={() => handleGetSong(song, songs, data.encodeId)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('playlist-section')}>
                    {data.sections.map(
                        (section) =>
                            section.sectionType === 'playlist' && (
                                <Section key={section.title} title={section.title}>
                                    {section.items.slice(0, 5).map((item) => (
                                        <Item key={item.encodeId} data={item} />
                                    ))}
                                </Section>
                            ),
                    )}
                </div>
            </div>
        );
    }
}

export default Artist;
