import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function Comment({ reply, lastReply }) {
  const currentUser = useRecoilValue(userAtom);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={""} size={"sm"} name="Vu Viet Duy" />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="sm" fontWeight="bold">
              {reply.repliedBy.username}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize="xs" color="gray.light" isTruncated>
                {formatDistanceToNow(reply.createdAt)}
              </Text>
              <BsThreeDots></BsThreeDots>
            </Flex>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply && <Divider />}
    </>
  );
}

export default Comment;
