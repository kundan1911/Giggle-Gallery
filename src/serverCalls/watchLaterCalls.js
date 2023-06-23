import axios from "axios";

export const addToWatchLater = (video, encodedToken) =>
  axios.post(
    "/api/user/watchlater",
    { video },
    {
      headers: { authorization: encodedToken },
    }
  );

  export const getWatchLater = (encodedToken) =>
  axios.get("/api/user/watchlater", { headers: { authorization: encodedToken } });

export const removeFromWatchLater = (videoID, encodedToken) =>
  axios.delete(`/api/user/watchlater/${videoID}`, {
    headers: { authorization: encodedToken },
  });
