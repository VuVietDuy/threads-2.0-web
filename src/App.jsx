import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import HomePage from "./pages/HomePage";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxWidth="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/auth"} />}
        ></Route>
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to={"/"} />}
        ></Route>
        <Route path="/update" element={<UpdateProfilePage />}></Route>
        <Route path="/:username" element={<UserPage />}></Route>
        <Route path="/:username/posts/:pid" element={<PostPage />}></Route>
      </Routes>
      {user && <LogoutButton />}
      {user && <CreatePost />}
    </Container>
  );
}

export default App;
