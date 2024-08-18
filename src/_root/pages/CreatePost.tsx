import PostForm from "@/components/forms/PostForm";
import React from "react";

function CreatePost() {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/add-post.svg" alt="add" width={30} height={30} />
          <h2 className="h4-bold md:h3-bold text-left w-full">Create Post</h2>
        </div>
        <PostForm></PostForm>
      </div>
    </div>
  );
}

export default CreatePost;
