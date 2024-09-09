import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { TbNumber3Small } from "react-icons/tb";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const MAX_CHAR = 500;

function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState();
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const fileRef = useRef(TbNumber3Small);
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const user = useRecoilValue(userAtom);
  const toast = useToast();
  const [updating, setUpdating] = useState(false);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleFileChange = (e) => {
    handleImageChange(e);
  };

  const handleCreatePost = async () => {
    setUpdating(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: postText,
          img: imgUrl,
          postedBy: user._id,
        }),
      });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
        return;
      }
      console.log(data);

      toast({
        title: "Post created successfully!",
        description: "Your post has been created.",
        status: "success",
      });
      onClose();
      setPostText("");
      setImgUrl("");
    } catch (e) {
      console.log(e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <Button
        position="fixed"
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder={"Post content goes here"}
                onChange={handleTextChange}
                value={postText}
              ></Textarea>
              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {remainingChar}/500
              </Text>

              <Input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleFileChange}
              ></Input>
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={20}
                onClick={() => fileRef.current.click()}
              />
            </FormControl>
            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image w={"full"} src={imgUrl} alt="Selected img"></Image>
                <CloseButton
                  onClick={() => setImgUrl("")}
                  position={"absolute"}
                  top={2}
                  right={2}
                  bg={"gray.800"}
                ></CloseButton>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={updating}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
