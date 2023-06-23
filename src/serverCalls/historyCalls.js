import axios from "axios";

export const addToHistory = (video, encodedToken) =>
  axios.post(
    "/api/user/history",
    { video },
    {
      headers: { authorization: encodedToken },
    }
  );

export const getHistory = (encodedToken) =>
  axios.get("/api/user/history", { headers: { authorization: encodedToken } });

export const removeFromHistory = (videoID, encodedToken) =>
  axios.delete(`/api/user/history/${videoID}`, {
    headers: { authorization: encodedToken },
  });

export const clearHistory = (encodedToken) =>
  axios.delete("/api/user/history/all", {
    headers: { authorization: encodedToken },
  });
