import axios from "axios";

export const addToPlaylistList = (playlist, encodedToken) =>
  axios.post(
    "/api/user/playlists",
    { playlist: playlist },
    {
      headers: { authorization: encodedToken },
    }
  );

export const addVideoToPlaylist = (playlistId, video, encodedToken) => {
  return axios.post(
    `/api/user/playlists/${playlistId}`,
    { video },
    {
      headers: { authorization: encodedToken },
    }
  );
};

export const removePlaylist=(playlistId,encodedToken)=>{
  return axios.delete(`/api/user/playlists/${playlistId}`,{
    headers:{
      authorization:encodedToken
    }
  })
}

export const removeVideoFromPlaylist = (playlistId,videoId,encodedToken)=>{
  return axios.delete(`/api/user/playlists/${playlistId}/${videoId}`,{
    headers:{
      authorization: encodedToken
    }
  })
}

export const getPlaylists = (encodedToken) =>
  axios.get("/api/user/playlists", {
    headers: { authorization: encodedToken },
  });
