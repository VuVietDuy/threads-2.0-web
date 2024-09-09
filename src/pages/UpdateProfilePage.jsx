import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import { useNavigate } from "react-router-dom";

export default function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
  });
  const fileRef = useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleImageChange, imgUrl } = usePreviewImg();
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json();
      toast({
        title: "Profile updated successfully!",
        description: "Your profile has been updated.",
        status: "success",
      });
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
      navigate(`/${user.username}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleUpdateProfile}>
      <Flex align={"center"} justify={"center"} m={2}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  boxShadow={"md"}
                  src={imgUrl || user.profilePic}
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Fullname</FormLabel>
            <Input
              placeholder="Fullname"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="bio"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
