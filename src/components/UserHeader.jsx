import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";

function UserHeader({ user }) {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user?.followers.includes(currentUser._id)
  );
  const [updating, setUpdating] = useState(false);

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({ description: "Copy to clipboard", status: "success" });
    });
  };

  const handleFollow = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to follow users",
        status: "error",
      });
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`api/users/${user._id}/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
        console.error("Failed to follow user:", data.error);
        return;
      }

      if (following) {
        toast({
          title: "Unfollowed",
          description: "You are no longer following this user",
          status: "success",
        });
        user.followers.pop();
      } else {
        toast({
          title: "Followed",
          description: "You are now following this user",
          status: "success",
        });
        user.followers.push(currentUser._id);
      }

      setFollowing(!following);

      console.log("User followed successfully:", user.name);
    } catch (e) {
      console.error("Failed to follow user:", e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>
            {user?.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user?.username}</Text>
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "md",
              }}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              Threads next
            </Text>
          </Flex>
        </Box>

        <Box>
          {user?.profilePic && (
            <Avatar
              name={user?.name}
              src={user?.profilePic}
              size={{ base: "xl", md: "2xl" }}
            />
          )}
          {!user?.profilePic && (
            <Avatar
              name={user?.name}
              src={"https://bit.ly/broken-link"}
              size={{ base: "xl", md: "2xl" }}
            />
          )}
        </Box>
      </Flex>
      <Text>{user?.bio}</Text>

      {currentUser._id === user?._id && (
        <RouterLink to="/update">
          <Button size={"sm"}>Update Profile</Button>
        </RouterLink>
      )}
      {currentUser._id !== user?._id && (
        <Button size={"sm"} onClick={handleFollow} isLoading={updating}>
          {following ? "Following" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user?.followers.length} followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color="gray.light">instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"}></BsInstagram>
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"}></CgMoreO>
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy URL
                  </MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Help</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w="full">
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default UserHeader;
