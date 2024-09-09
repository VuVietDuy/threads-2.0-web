import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { formatDistanceToNow } from "date-fns";

function PostCard({ post }) {
  const navgate = useNavigate();

  return (
    <Flex gap={3} mb={4} py={5}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Link to={`/${post.postedBy.username}`}>
          <Avatar
            size="md"
            name={post.postedBy.name}
            src={post.postedBy.profilePic}
          />
        </Link>
        <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
        <Box position={"relative"} w={"full"}>
          {post.replies[0] && (
            <Avatar
              size={"xs"}
              name="Dan Abrahmov"
              src={post.replies[0].userProfilePic}
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
          )}
          {post.replies[1] && (
            <Avatar
              size={"xs"}
              name="Dan Abrahmov"
              src={post.replies[1].userProfilePic}
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
          )}
          {post.replies[2] && (
            <Avatar
              size={"xs"}
              name="Dan Abrahmov"
              src={post.replies[2].userProfilePic}
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          )}
        </Box>
      </Flex>
      <Flex flex={1} flexDirection={"column"} gap={2}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Flex w={"full"} alignItems={"center"} gap={1}>
            <Link to={`/${post.postedBy.username}`}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={() => navgate(`/${post.postedBy.username}`)}
              >
                {post.postedBy.username}
              </Text>
            </Link>
            <Image w={4} h={4} src="/verified.png"></Image>
          </Flex>
          <Flex gap={4} alignItems={"center"}>
            <Text fontSize="xs" color="gray.light" isTruncated>
              {formatDistanceToNow(post.createdAt)}
            </Text>
            <BsThreeDots />
          </Flex>
        </Flex>
        <Link to={`/${post.postedBy.username}/post/${post._id}`}>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"}></Image>
            </Box>
          )}
          <Flex gap={3} my={3}>
            <Actions post={post} />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
}

export default PostCard;
