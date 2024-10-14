import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
const Playlist = ({ songs, onAddSong, onDeleteSong }) => {
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongUrl, setNewSongUrl] = useState("");
  const handleAdd = () => {
    const newSong = {
      id: songs.length + 1,
      title: newSongTitle,
      url: newSongUrl,
    };
    onAddSong(newSong);
    setNewSongTitle("");
    setNewSongUrl("");
  };
  return (
    <Box>
      <List>
        {songs.map((song) => (
          <ListItem key={song.id}>
            {song.title}
            <IconButton onClick={() => onDeleteSong(song.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box>
        <TextField
          label="Song Title"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
        />
        <TextField
          label="Song URL"
          value={newSongUrl}
          onChange={(e) => setNewSongUrl(e.target.value)}
        />
      </Box>

      <Button onClick={handleAdd}>Add Song</Button>
    </Box>
  );
};

export default Playlist;
