import {
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";

function MessageInput({ setMessages }) {
  const [messageText, setMessageText] = useState("");
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const toast = useToast();
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, data]);
      setMessageText("");
      toast({
        title: "Message sent successfully!",
        description: "Your message has been sent",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error sending message",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          w={"full"}
          placeholder="Type a message"
        ></Input>
        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
          <IoSendSharp color="green.500"></IoSendSharp>
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

export default MessageInput;
