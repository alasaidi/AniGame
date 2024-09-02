import { useState, useEffect } from "react";
import GridPostList from "@/components/shared/GridPostList";

import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
function Saved() {
  const { data: currentUser } = useGetCurrentUser();
  console.log("test", currentUser.save[0].post);

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/saved.svg" alt="add" width={30} height={30} />
          <h2 className="h4-bold md:h3-bold text-left w-full">Saved Posts</h2>
        </div>
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={currentUser.save[0]} showStats={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Saved;
