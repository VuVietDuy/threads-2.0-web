import React from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

function UserPage() {
  return (
    <div>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={401}
        postImg="/post1.png"
        postTitle="Let's talk about thread"
      ></UserPost>
      <UserPost
        likes={120}
        replies={401}
        postImg="/post2.png"
        postTitle="Noice"
      ></UserPost>
      <UserPost
        likes={900}
        replies={1}
        postImg="/post3.png"
        postTitle="Fuckk"
      ></UserPost>
    </div>
  );
}

export default UserPage;
