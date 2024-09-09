import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";

function App() {
  return (
    <Container maxWidth="620px">
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />}></Route>
        <Route path="/:username/posts/:pid" element={<PostPage />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
