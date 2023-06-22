import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./pages/AuthenticationPage/AuthRoutes/require-auth";
import { RestrictAuth } from "./pages/AuthenticationPage/AuthRoutes/restrict-auth";
import {
  AuthLogin,
  AuthSignUp,
  Error404Page,
  History,
  HomePage,
  LibraryPage,
  Likes,
  Playlist,
  VideoListing,
  WatchLater,
} from "./pages/pages";
import { PlayListVideoList } from "./pages/PlaylistVideoList/PlaylistVideoList";
import { SingleVideoPage } from "./pages/SingleVideoPage/SingleVideoPage";

function RoutesPath() {
  return (
    <Routes>
      <Route path="/videos/:videoId" element={<SingleVideoPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<VideoListing />} />
        <Route path="*" element={<Error404Page />}></Route>

      <Route element={<RestrictAuth />}>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/signup" element={<AuthSignUp />} />
      </Route>

      <Route element={<RequireAuth />}>
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/liked-videos" element={<Likes />} />
        <Route path="/playlists/:playlistId" element={<PlayListVideoList />} />
        <Route path="/playlists" element={<Playlist />} />
        <Route path="/history" element={<History />} /> 
        <Route path="/watchLater" element={<WatchLater />} />
      </Route>
    </Routes>
  );
}

export { RoutesPath };
