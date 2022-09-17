import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request from '~/utils/httpRequest';
import Carousel from '~/components/Carousel';
import Loading from '../Loading';
import Section from '~/components/Section';
import Item from '~/components/Item';
import Button from '~/components/Buttons/Button';
import SongItemShort from '~/components/SongItemShort';
import Album from './components/Album';
import classNames from 'classnames/bind';
import styles from './Discover.module.scss';
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
    setIsDisabled,
} from '~/redux/features/audioSlice';

const cx = classNames.bind(styles);

function Decover() {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFail, setIsFail] = useState(false);
    const [newReleaseSong, setNewReleaseSong] = useState(true);
    const [newReleaseAlbum, setNewReleaseAlbum] = useState(false);

    const dispatch = useDispatch();
    const isRandom = useSelector((state) => state.audio.isRandom);
    const playlistId = useSelector((state) => state.audio.playlistId);
    const shuffle = (sourceArray) => {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    };
    const handleNewReleaseSong = () => {
        setNewReleaseSong(true);
        setNewReleaseAlbum(false);
    };
    const handleNewReleaseAlbum = () => {
        setNewReleaseSong(false);
        setNewReleaseAlbum(true);
    };

    const handlePlaySong = (song, playlist, id) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setCurrentTime(0));
        dispatch(setSrcAudio(''));
        dispatch(setPlaylistId(id));
        let playlistCanPlay = [];
        if (song.streamingStatus === 1) {
            for (var i = 0; i < playlist.length; i++) {
                if (playlist[i].streamingStatus === 1) {
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
                dispatch(setIsDisabled(false));
            } else {
                dispatch(setCurrentIndexSongRandom(-1));
                dispatch(setInfoSongPlayer(song));
                dispatch(setSongId(song.encodeId));
                dispatch(setPlaylistSong(playlistCanPlay));
                dispatch(setCurrnetIndexSong(playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)));
                dispatch(setIsPlay(true));
                dispatch(setIsDisabled(false));
            }
        } else {
            alert('This is vip song');
        }
        console.log(playlistId);
    };

    useEffect(() => {
        request.get('/home').then((res) => {
            // console.log(res.data);
            setIsLoading(false);
            setResult(res.data.items);
            document.title = 'ZingMP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và ...';
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else if (isFail) {
        return <h1>Bi Loi</h1>;
    } else {
        return (
            <div className={cx('wrapper')}>
                <Carousel data={result[0]} />

                <div className={cx('new-release')}>
                    <h3>{result[3].title}</h3>
                    <div className={cx('header')}>
                        <Button
                            roundeds={true}
                            className={cx('btn', newReleaseSong && 'active')}
                            onClick={handleNewReleaseSong}
                        >
                            Bài hát
                        </Button>
                        <Button
                            roundeds={true}
                            onClick={handleNewReleaseAlbum}
                            className={cx('btn', newReleaseAlbum && 'active')}
                        >
                            Album
                        </Button>
                    </div>
                    {newReleaseSong && (
                        <div className={cx('grid')}>
                            {result[3].items[0].song.slice(0, 12).map((song, index) => (
                                <SongItemShort
                                    key={index}
                                    data={song}
                                    index={index}
                                    onClick={() =>
                                        handlePlaySong(song, result[3].items[0].song, result[3].items[0].song.encodeId)
                                    }
                                />
                            ))}
                        </div>
                    )}
                    {newReleaseAlbum && (
                        <div className={cx('grid')}>
                            {result[3].items[0].album.slice(0, 9).map((album, index) => (
                                <Album key={album.encodeId} data={album} />
                            ))}
                        </div>
                    )}
                </div>

                {result.map(
                    (playlist, index) =>
                        playlist.sectionType === 'playlist' && (
                            <Section key={index} title={playlist.title} className={cx('section')}>
                                {playlist.items.map((item) => (
                                    <Item key={item.encodeId} data={item} />
                                ))}
                            </Section>
                        ),
                )}
            </div>
        );
    }
}

export default Decover;
