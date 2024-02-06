import React,{useContext,useEffect} from "react";
import postContext from "../Context/PostContext";
import UserPostCards from "./UserPostCards";


//feed related with all users post cards
const Feed = () => {
    let context = useContext(postContext);
    let{UserpostState , getUserPosts} = context;

    useEffect(()=>{
        getUserPosts();
      },[])
  return (
    
    <div>
    <h2>Feed</h2>
    <div className="container">
      {UserpostState.map((post) => {
        return <UserPostCards key={post.id} post={post} />;
      })}
    </div>
  </div>
  )
}

export default Feed
