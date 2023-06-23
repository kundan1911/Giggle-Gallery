import { addToPlaylistList,addVideoToPlaylist,getPlaylists,removePlaylist,removeVideoFromPlaylist} from "../../serverCalls/serverCalls";
export async function addPlaylistHandler(playlistItem,encodedToken,dispatch){
  try {
      const response = await addToPlaylistList(playlistItem,encodedToken);
      if(response.status===201){
        dispatch({type:"SET_PLAYLISTS",payload:response.data.playlists});
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getAllPlaylistCall(encodedToken,dispatch){
  try {
    const response = await getPlaylists(encodedToken);
    if(response){
      dispatch({type:"SET_PLAYLISTS",payload:response.data.playlists})
    }
  } catch (error) {
    console.log(error)
  }
}

export async function addVideoToPlaylistCall(playlistItem,videoID,encodedToken,dispatch){
  try {
    const response = await addVideoToPlaylist(playlistItem,videoID,encodedToken);
    if(response){
      dispatch({type:"ACTION_PLAYLIST",payload:response.data.playlist})
    }
  } catch (error) {
    console.log(error)
  }
}

export async function removeVideoFromPlaylistCall(playlistId,videoId,encodedToken,dispatch){
  try {
    const response = await removeVideoFromPlaylist(playlistId,videoId,encodedToken);
    if(response){
      dispatch({type:"ACTION_PLAYLIST",payload:response.data.playlist})
    }
  } catch (error) {
    console.log(error)
  }
}

export async function removePlaylistCall(playlistId,encodedToken,dispatch){
  try {
    const response = await removePlaylist(playlistId,encodedToken);
    if(response){
      dispatch({type:"SET_PLAYLISTS",payload:response.data.playlists})
    }
  } catch (error) {
    console.log(error)
  }
}
