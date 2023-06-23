import { addLikedVideo, removeLikedVideo } from "../../serverCalls/serverCalls";
import { isPresentInState } from "../utilCalls";

export async function addLikedVideoCall(video, encodedToken, setState) {
  try {
    const response = await addLikedVideo(video, encodedToken);
    if (response) {
      setState(response.data.likes);
    }

  } catch (error) {
    console.log(error);
  }
}

export async function removeLikedVideoCall(videoID, encodedToken, setState) {
  try {
    const response = await removeLikedVideo(videoID, encodedToken);
    if (response) {
      setState(response.data.likes);
    }
  } catch (error) {
    console.log(error);
  }
}

export const likeHandler = (state,video, encodedToken, setState) =>{
    const isVideoLiked = isPresentInState(state,video);
    isVideoLiked
    ? removeLikedVideoCall(video._id, encodedToken, setState)
    : addLikedVideoCall(video, encodedToken, setState);
}
