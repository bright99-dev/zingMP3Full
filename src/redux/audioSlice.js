import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import mobilelogo from '~/assets/img/mobilelogo.png';
const initialState = {
    isPlay: false,
    isRadioPlay: false,
    isMute: false,
    isExtendSidebar: false,
    isOpenSidebarRight: false,
    isDisabled: JSON.parse(localStorage.getItem('disabled')) || false,
    songId: localStorage.getItem('songId') || '',
    playlistId: localStorage.getItem('playlistId') || '',
    currentIndexSong: localStorage.getItem('currentIndexSong') || 0,
    currentIndexSongRandom: localStorage.getItem('currentIndexSongRandom') || 0,
    infoSongPlayer: JSON.parse(localStorage.getItem('songInfo')) || {
        thumbnail: mobilelogo,
        thumbnailM: mobilelogo,
        title: 'Tên bài hát',
        artistsNames: 'artistsNames',
        duration: 0,
    },
    srcAudio: '',
    srcRadio: JSON.parse(localStorage.getItem('srcRadio')) || '',
    currentTime: 0,
    duration: 0,
    volume: JSON.parse(localStorage.getItem('volume')) || 100,
    isLoop: JSON.parse(localStorage.getItem('loop')) || false,
    isRandom: JSON.parse(localStorage.getItem('random')) || false,
    autoPlay: false,
    playlistSong: JSON.parse(localStorage.getItem('playlistSong')) || [],
    playlistRandom: JSON.parse(localStorage.getItem('playlistRandom')) || [],
    prevSong: [],
    isLyric: false,
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setIsPlay: (state, action) => {
            state.isPlay = action.payload;
        },
        setIsRadioPlay: (state, action) => {
            state.isRadioPlay = action.payload;
        },
        setIsExtendSidebar: (state, action) => {
            state.isExtendSidebar = action.payload;
        },
        setIsOpenSidebarRight: (state, action) => {
            state.isOpenSidebarRight = action.payload;
        },
        setIsDisabled: (state, action) => {
            state.isDisabled = action.payload;
            localStorage.setItem('disabled', JSON.stringify(action.payload));
        },
        changeIconVolume: (state, action) => {
            state.isMute = action.payload;
        },
        setSongId: (state, action) => {
            state.songId = action.payload;
            localStorage.setItem('songId', JSON.stringify(action.payload));
        },
        setPlaylistId: (state, action) => {
            state.playlistId = action.payload;
            localStorage.setItem('playlistId', JSON.stringify(action.payload));
        },
        setInfoSongPlayer: (state, action) => {
            state.infoSongPlayer = { ...action.payload };
            localStorage.setItem('songInfo', JSON.stringify({ ...action.payload }));
        },
        setSrcAudio: (state, action) => {
            state.srcAudio = action.payload;
        },
        setSrcRadio: (state, action) => {
            state.srcRadio = action.payload;
            localStorage.setItem('srcRadio', JSON.stringify(action.payload));
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
            localStorage.setItem('volume', JSON.stringify(action.payload));
        },
        setLoop: (state, action) => {
            state.isLoop = action.payload;
            localStorage.setItem('loop', JSON.stringify(action.payload));
        },
        setAutoPlay: (state, action) => {
            state.autoPlay = action.payload;
        },
        setPlaylistSong: (state, action) => {
            state.playlistSong = action.payload;
            localStorage.setItem('playlistSong', JSON.stringify(action.payload));
        },
        setPlaylistRandom: (state, action) => {
            state.playlistRandom = action.payload;
            localStorage.setItem('playlistRandom', JSON.stringify(action.payload));
        },
        setCurrentIndexSong: (state, action) => {
            state.currentIndexSong = action.payload;
            localStorage.setItem('currentIndexSong', JSON.stringify(action.payload));
        },
        setCurrentIndexSongRandom: (state, action) => {
            state.currentIndexSongRandom = action.payload;
            localStorage.setItem('currentIndexSongRandom', JSON.stringify(action.payload));
        },
        setOpenLyric: (state, action) => {
            state.isLyric = action.payload;
        },
        setPrevSong: (state, action) => {
            state.prevSong = action.payload;
        },
        setRandom: (state, action) => {
            state.isRandom = action.payload;
            localStorage.setItem('random', JSON.stringify(action.payload));
        },
        // handleSong: (song, playlist, id) => {
        //     // eslint-disable-next-line react-hooks/rules-of-hooks
        //     const dispatch = useDispatch();
        //     let playlistCanPlay = [];
        //     if (song.streamingStatus === 1 && song.isWorldWide) {
        //         dispatch(setIsRadioPlay(false));
        //         dispatch(setPlaylistId(id));
        //         dispatch(setCurrentTime(0));
        //         dispatch(setSrcAudio(''));
        //         for (var i = 0; i < playlist.length; i++) {
        //             if (playlist[i].streamingStatus === 1 && playlist[i].isWorldWide) {
        //                 playlistCanPlay.push(playlist[i]);
        //             }
        //         }
        //         if (isRandom) {
        //             dispatch(setPlaylistRandom(shuffle([...playlistCanPlay])));
        //             dispatch(setSongId(song.encodeId));
        //             dispatch(setInfoSongPlayer(song));
        //             dispatch(setPlaylistSong(playlistCanPlay));
        //             dispatch(setCurrentIndexSong(getCurrentIndexSong(playlistCanPlay, song)));
        //             // dispatch(setCurrentIndexSongRandom(-1));
        //             dispatch(setIsPlay(true));
        //             dispatch(setIsDisabled(false));
        //         } else {
        //             dispatch(setPlaylistRandom(playlistCanPlay));
        //             // dispatch(setCurrentIndexSongRandom(-1));
        //             dispatch(setInfoSongPlayer(song));
        //             dispatch(setSongId(song.encodeId));
        //             dispatch(setPlaylistSong(playlistCanPlay));
        //             dispatch(setCurrentIndexSong(getCurrentIndexSong(playlistCanPlay, song)));
        //             dispatch(setIsPlay(true));
        //             dispatch(setIsDisabled(false));
        //         }
        //     } else {
        //         alert('This is vip song');
        //     }
        // },
    },
});

export const {
    setIsPlay,
    setIsDisabled,
    setIsExtendSidebar,
    setIsOpenSidebarRight,
    changeIconVolume,
    setSongId,
    setInfoSongPlayer,
    setCurrentTime,
    setDuration,
    setVolume,
    setLoop,
    setSrcAudio,
    setAutoPlay,
    setPlaylistSong,
    setCurrentIndexSong,
    setOpenLyric,
    setRandom,
    setPrevSong,
    setPlaylistId,
    setSrcRadio,
    setIsRadioPlay,
    setPlaylistRandom,
    setCurrentIndexSongRandom,
} = audioSlice.actions;
export default audioSlice.reducer;
