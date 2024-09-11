import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import HomePage from "./pages/HomePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Box position="relative" w={"full"}>
      <Container
        maxWidth={{
          base: "100%",
          md: "620px",
        }}
      >
        <Navbar></Navbar>
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
          <Route path="/:username/post/:postId" element={<PostPage />}></Route>
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
          ></Route>
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
