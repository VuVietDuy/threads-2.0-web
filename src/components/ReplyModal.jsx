import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function ReplyModal({ isOpen, onClose, post, setPost }) {
  const [reply, setReply] = useState("");
  const user = useRecoilValue(userAtom);
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  const handleReply = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to reply",
        status: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${post._id}/reply`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reply }),
      });
      const data = await res.json();
      setPost(data.post);
      onClose();
      setReply("");
      toast({
        title: "Reply posted successfully!",
        description: "Your reply has been posted.",
        status: "success",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to reply",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reply</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Reply goes here"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            mr={3}
            size={"sm"}
            onClick={handleReply}
          >
            Reply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReplyModal;
