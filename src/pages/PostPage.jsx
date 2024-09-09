import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";

function PostPage() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w="full" alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatr.png" size={"md"} name="Vu viet duy"></Avatar>
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              vuvietduy
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4}></Image>
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots></BsThreeDots>
        </Flex>
      </Flex>
      <Text my={3}>Let talk about me</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w={"full"}></Image>
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked}></Actions>
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          12 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {12 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4}></Divider>
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4}></Divider>

      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
    </>
  );
}

export default PostPage;
