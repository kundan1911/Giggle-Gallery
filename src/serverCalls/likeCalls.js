import axios from "axios";

export const addLikedVideo = (video, encodedToken) =>
  axios.post(
    "/api/user/likes",
    { video },
    {
      headers: { authorization: encodedToken },
    }
  );

  export const getLikes = (encodedToken) =>
  axios.get("/api/user/likes", { headers: { authorization: encodedToken } });


export const removeLikedVideo = (videoID, encodedToken) =>
  axios.delete(`/api/user/likes/${videoID}`, {
    headers: { authorization: encodedToken },
  });

