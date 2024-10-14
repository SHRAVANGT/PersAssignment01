import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  PlaylistPlay,
} from "@mui/icons-material";
import {
  Button,
  Box,
  IconButton,
  Stack,
  Typography,
  Slider,
  Card,
  Switch,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import Playlist from "./Playlist";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h6: {
      fontWeight: 600,
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#e33371" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h6: {
      fontWeight: 600,
    },
  },
});
const MediaPlayer = ({ darkMode, setDarkMode }) => {
  const [songs, setSongs] = useState([
    { id: 1, title: "song one", url: "/assets/songs/song1.mp3" },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null); // Reference to the audio element

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (audioRef.current && audioRef.current.audioEl.current) {
      const audioElement = audioRef.current.audioEl.current;
      if (isPlaying) {
        audioElement
          .play()
          .catch((error) => console.error("Play error:", error));
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const playNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex < songs.length - 1 ? prevIndex + 1 : 0
    );
  };

  const playPrev = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : songs.length - 1
    );
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  const handleAddSong = (newSong) => {
    setSongs([...songs, newSong]);
  };
  const handleDeleteSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const handleProgress = (currentTime) => {
    setProgress((currentTime / duration) * 100);
  };

  const handleAudioLoaded = () => {
    setDuration(audioRef.current.audioEl.current.duration);
  };

  const handleSeek = (event, newValue) => {
    const newTime = (newValue / 100) * duration;
    audioRef.current.audioEl.current.currentTime = newTime;
    setProgress(newValue);
  };
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ p: 4, maxWidth: 500, margin: "50px auto", borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{currentSong.title}</Typography>
          {/* <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            color="secondary"
          /> */}
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <ReactAudioPlayer
            ref={audioRef}
            src={currentSong.url}
            listenInterval={1000}
            onListen={(e) => handleProgress(e.target.currentTime)}
            onLoadedMetadata={handleAudioLoaded}
            controls={false}
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <IconButton color="primary" onClick={playPrev}>
            <SkipPrevious />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={togglePlay}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              p: 2,
              borderRadius: "50%",
            }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton color="primary" onClick={playNext}>
            <SkipNext />
          </IconButton>
        </Stack>
        <Slider
          value={progress}
          onChange={handleSeek}
          aria-labelledby="continuous-slider"
          sx={{
            width: "100%",
            marginTop: "20px",
            "& .MuiSlider-thumb": { color: theme.palette.secondary.main },
            "& .MuiSlider-track": { color: theme.palette.primary.main },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <IconButton onClick={() => setShowPlaylist(!showPlaylist)}>
            <PlaylistPlay />
          </IconButton>
        </Box>
        {showPlaylist && (
          <Playlist
            songs={songs}
            onAddSong={handleAddSong}
            onDeleteSong={handleDeleteSong}
          />
        )}
      </Card>
    </ThemeProvider>
  );
};

export default MediaPlayer;
