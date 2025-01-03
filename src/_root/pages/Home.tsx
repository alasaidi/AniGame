import Loader from "@/components/shared/Loader";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import PostCard from "@/components/shared/PostCard";

function Home() {
  const { data: posts, isPending: isPostLoading, isError: isErrorPost } = useGetRecentPosts();
  if (isPostLoading) return <Loader />;
  if (isErrorPost) return <div>Error loading posts. Please try again.</div>;
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
