import { useUserContext } from "@/context/AuthContext";
// import { useEffect, useState } from "react";
// import SearchResults from "@/components/shared/SearchResults";
import GridPostList from "@/components/shared/GridPostList";
import { useGetPosts } from "@/lib/react-query/queriesAndMutation";
// import useDebounce from "@/hooks/useDebounce";
import { Models } from "appwrite";

import Loader from "@/components/shared/Loader";
function Profile() {
  const { user } = useUserContext();
  const { data: posts } = useGetPosts();
  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  console.log(posts);
  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          {" "}
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
          <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
            <p>posts</p>
            <p>Following</p>
            <p>Followers</p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="h-8 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg">
            <img src="/assets/icons/edit.svg" alt="add" width={20} height={20} />
            <h2 className="flex whitespace-nowrap small-medium">Edit profile</h2>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex justify-center gap-4">
          <div className="flex max-w-5xl w-ful bg-dark-3">
            <img src="/assets/icons/posts.svg" alt="add" width={20} height={20} />
            <h2 className="flex whitespace-nowrap small-medium">Posts</h2>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex max-w-5xl w-ful bg-dark-3">
            <img src="/assets/icons/like.svg" alt="add" width={20} height={20} />
            <h2 className="flex whitespace-nowrap small-medium">Liked Post</h2>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {posts.pages.map(
          (item, index) => item?.documents && <GridPostList key={index} posts={item.documents as Models.Document[]} />
        )}
      </div>
    </div>
  );
}

export default Profile;
