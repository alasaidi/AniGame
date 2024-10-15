import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GridPostList from "@/components/shared/GridPostList";
import { useGetPosts, useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import Loader from "@/components/shared/Loader";

function Profile() {
  const { data: currentUser, isLoading, error } = useGetCurrentUser();
  const [likedPosts, setLikedPosts] = useState([]);
  const [showAllPosts, setShowAllPosts] = useState(true);
  const { data: posts } = useGetPosts();

  useEffect(() => {
    if (currentUser && currentUser.liked) {
      const postsWithCreator = currentUser.liked.map((likedPost) => ({
        ...likedPost.post,
        creator: {
          name: currentUser.name,
          username: currentUser.username,
          imageUrl: currentUser.imageUrl,
        },
      }));
      setLikedPosts(postsWithCreator);
    }
  }, [currentUser]);
  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!currentUser) {
    return <div>No user data available</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          {" "}
          <img
            src={currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{currentUser.name}</p>
            <p className="small-regular text-light-3">@{currentUser.username}</p>
          </div>
          <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
            <p>posts</p>
            <p>Following</p>
            <p>Followers</p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Link to={`/update-profile/${currentUser.$id}`}>
            <button className="h-8 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg">
              <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
              <h2 className="flex whitespace-nowrap small-medium">Edit profile</h2>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-start gap-0">
        <button
          className={`profile-tab  ${showAllPosts ? "bg-dark-3" : "bg-dark-4"}`}
          onClick={() => setShowAllPosts(true)}>
          <img src="/assets/icons/posts.svg" alt="posts" width={20} height={20} />
          <span className="whitespace-nowrap small-medium">Posts</span>
        </button>
        <button
          className={`profile-tab  ${!showAllPosts ? "bg-dark-3" : "bg-dark-4"}`}
          onClick={() => setShowAllPosts(false)}>
          <img src="/assets/icons/like.svg" alt="liked posts" width={20} height={20} />
          <span className="whitespace-nowrap small-medium">Liked Posts</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {showAllPosts ? (
          posts?.pages ? (
            posts.pages.map((page, index) =>
              page?.documents ? <GridPostList key={index} posts={page.documents as Models.Document[]} /> : null
            )
          ) : (
            <p>No posts found.</p>
          )
        ) : likedPosts.length > 0 ? (
          <GridPostList posts={likedPosts} showStats={false} />
        ) : (
          <p>No liked posts found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
