import React from "react";
import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/messagesAtom";

function Conversation({ conversation }) {
  const currentUser = useRecoilValue(userAtom);
  const user = conversation.participants[0];
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  console.log(selectedConversation);
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          username: user.username,
          userProfilePic: user.profilePic,
        })
      }
      bg={
        selectedConversation?._id == conversation._id
          ? useColorModeValue("gray.600", "gray.dark")
          : ""
      }
    >
      <WrapItem>
        <Avatar
          size={{
            base: "md",
            md: "md",
          }}
          src=""
          name="Vu Viet Duy"
        >
          <AvatarBadge boxSize={"1em"} bg={"green.500"} />
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          {conversation?.participants[0]?.username}{" "}
          <Image src="/verified.png" w={4} h={4} ml={1}></Image>
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === conversation?.lastMessage?.sender._id ? (
            <BsCheck2All size={16}></BsCheck2All>
          ) : (
            ""
          )}
          {conversation?.lastMessage?.text.length > 10
            ? conversation?.lastMessage?.text.substring(0, 10) + "..."
            : conversation?.lastMessage?.text}
        </Text>
      </Stack>
    </Flex>
  );
}

export default Conversation;
