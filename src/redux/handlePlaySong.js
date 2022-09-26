import { useDispatch, useSelector } from 'react-redux';
import {
    setSongId,
    setInfoSongPlayer,
    setPlaylistSong,
    setIsPlay,
    setRandom,
    setPlaylistId,
    setIsRadioPlay,
    setCurrentIndexSong,
    setPlaylistRandom,
    setCurrentIndexSongRandom,
    setCurrentTime,
    setSrcAudio,
    setIsDisabled,
} from '~/redux/audioSlice';

export const shuffle = (sourceArray) => {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
};

export const getCurrentIndexSong = (playlist, song) => {
    return playlist.indexOf(song);
};

export const handlePlaySong = ({ song, playlist, id, dispatch, isRandom }) => {
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
            dispatch(setCurrentIndexSong(getCurrentIndexSong(playlistCanPlay, song)));
            dispatch(setIsPlay(true));
            dispatch(setIsDisabled(false));
        } else {
            dispatch(setPlaylistRandom(playlistCanPlay));
            dispatch(setInfoSongPlayer(song));
            dispatch(setSongId(song.encodeId));
            dispatch(setPlaylistSong(playlistCanPlay));
            dispatch(setCurrentIndexSong(getCurrentIndexSong(playlistCanPlay, song)));
            dispatch(setIsPlay(true));
            dispatch(setIsDisabled(false));
        }
    } else {
        alert('This is vip song');
    }
};

export const handlePlaylist = (dispatch, isPlay) => {
    dispatch(setIsDisabled(false));
    isPlay ? dispatch(setIsPlay(false)) : dispatch(setIsPlay(true));
};

export const handlePlayRandom = async (playlist, id, dispatch) => {
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
        dispatch(setCurrentIndexSong(randomIndex));
        dispatch(setCurrentIndexSongRandom(-1));
        dispatch(setRandom(true));
        dispatch(setIsDisabled(false));
    }
};
