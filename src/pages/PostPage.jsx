import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function PostPage() {
  const [post, setPost] = useState();
  const currentUser = useRecoilValue(userAtom);
  const { postId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
        }
        setPost(data);
        console.log(data);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to get post information",
          status: "error",
        });
      }
    };
    getPost();
  }, []);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post")) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
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
      navigate("/");
      toast({
        title: "Post deleted",
        description: "Your post has been deleted successfully",
        status: "success",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        status: "error",
      });
    }
  };

  if (!post) return <div>Loading...</div>;
  return (
    <>
      {post && (
        <>
          <Flex>
            <Flex w="full" alignItems={"center"} gap={3}>
              <Avatar
                src={post.postedBy.profilePic}
                size={"md"}
                name={post.postedBy.name}
              ></Avatar>
              <Flex>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  {post.postedBy.username}
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={4}></Image>
              </Flex>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize="xs" color="gray.light" isTruncated>
                {formatDistanceToNow(post.createdAt)}
              </Text>
              <Menu>
                <MenuButton>
                  <BsThreeDots />
                </MenuButton>
                <Portal>
                  <MenuList bg={"gray.dark"}>
                    <MenuItem bg={"gray.dark"} cursor={"pointer"}>
                      Copy URL
                    </MenuItem>
                    <MenuItem bg={"gray.dark"} cursor={"pointer"}>
                      Settings
                    </MenuItem>
                    {currentUser?._id === post?.postedBy._id && (
                      <MenuItem
                        bg={"gray.dark"}
                        cursor={"pointer"}
                        onClick={handleDeletePost}
                      >
                        Delete
                      </MenuItem>
                    )}
                  </MenuList>
                </Portal>
              </Menu>
            </Flex>
          </Flex>
          <Text my={3}>{post.text}</Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            {post.img && <Image src={post.img} w={"full"}></Image>}
          </Box>

          <Flex gap={3} my={3}>
            <Actions post={post}></Actions>
          </Flex>

          <Divider my={4}></Divider>
          <Flex justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"2xl"}>👋</Text>
              <Text color={"gray.light"}>
                Get the app to like, reply and post
              </Text>
            </Flex>
            <Button>Get</Button>
          </Flex>

          <Divider my={4}></Divider>

          {post.replies.map((reply, index) => (
            <Comment
              key={reply._id}
              reply={reply}
              lastReply={index === post.replies.length - 1}
            ></Comment>
          ))}
        </>
      )}
    </>
  );
}

export default PostPage;
