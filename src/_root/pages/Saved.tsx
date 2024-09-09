import { useEffect, useState } from "react";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";

function Saved() {
  const { data: currentUser, isLoading, error } = useGetCurrentUser();
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.save) {
      const postsWithCreator = currentUser.save.map((savedPost) => ({
        ...savedPost.post,
        creator: {
          name: currentUser.name,
          username: currentUser.username,
          imageUrl: currentUser.imageUrl,
        },
      }));
      setSavedPosts(postsWithCreator);
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

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/saved.svg" alt="add" width={30} height={30} />
          <h2 className="h4-bold md:h3-bold text-left w-full">Saved Posts</h2>
        </div>
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {savedPosts.length > 0 ? <GridPostList posts={savedPosts} showStats={false} /> : <p>No saved posts found.</p>}
        </div>
      </div>
    </div>
  );
}

export default Saved;
