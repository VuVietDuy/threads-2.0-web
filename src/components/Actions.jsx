import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import userAtom from "../atoms/userAtom";
import { CommentSVG, LikeSVG, RepostSVG, ShareSVG } from "./Icons";
import ReplyModal from "./ReplyModal";

function Actions({ post: post_ }) {
  const user = useRecoilValue(userAtom);
  const [post, setPost] = useState(post_);
  const [liked, setLiked] = useState(post?.likes?.includes(user._id));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to like post",
        status: "error",
      });
      return;
    }
    try {
      const res = await fetch(`/api/posts/${post._id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
        return;
      }
      if (liked) {
        setPost({
          ...post,
          likes: post.likes.filter((id) => id !== user._id),
        });
      } else {
        setPost({
          ...post,
          likes: [...post.likes, user._id],
        });
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to like post",
        status: "error",
        duration: 5000,
      });
    }
    setLiked(!liked);
  };
  return (
    <Flex flexDirection="column">
      <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
        <LikeSVG liked={liked} onClick={handleLike} />
        <CommentSVG onClick={onOpen} />
        <RepostSVG />
        <ShareSVG />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          {post?.replies.length} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {post?.likes?.length} likes
        </Text>
      </Flex>

      <ReplyModal
        isOpen={isOpen}
        onClose={onClose}
        post={post}
        setPost={setPost}
      ></ReplyModal>
    </Flex>
  );
}

export default Actions;
