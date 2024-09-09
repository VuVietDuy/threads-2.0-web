import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

function Comment() {
  const [liked, setLiked] = useState(false);
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
              Vu Viet Duy
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"}>1d</Text>
              <BsThreeDots></BsThreeDots>
            </Flex>
          </Flex>
          <Text>Hay this look good</Text>
          <Actions liked={liked} setLiked={setLiked}></Actions>
          <Text fontSize={"sm"} color={"gray.light"}>
            {12 + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}

export default Comment;
