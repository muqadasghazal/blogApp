import postContext from "./PostContext";

import React, { useState } from "react";

const PostStates = (props) => {
  
  let initialPostState = [];
  let initialUserPostState = [];
  let initialAiResState = [];
  

  const [postState ,setPostState] = useState(initialPostState)
  const [UserpostState ,setuserPostState] = useState(initialUserPostState)
  const [aiRes, setaiRes] = useState(initialAiResState)

    //get all posts.
    const getPosts = async () => {
      const url = "http://localhost:3020/api/auth/getPosts";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setPostState(jsonResponse.postsFound); // all posts of login user is set here
      } catch (error) {
        console.error(error);
      }
    };

    //get all users posts
    const getUserPosts = async () => {
      const url = "http://localhost:3020/api/auth/getAllUserPosts";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setuserPostState(jsonResponse.postFound); // all posts of login user is set here
      } catch (error) {
        console.error(error);
      }
    };
    
    

  //Add / create post
  const addPost =async (title,content)=>{
    const url = "http://localhost:3020/api/auth/createPost"
    try {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`              },
        body: JSON.stringify({title,content}), // what we are giving in body so that it gets store in database
      });
      const newPost =await response.json();
      setPostState((prevPosts) => [...prevPosts, newPost]);
      
    } catch (error) {
      console.log(error)
    }

                                //this syntax means keep the previous posts and add new post
  }
  const aiResponse = async(prompt,typeofquestions)=>{
    const url = "http://localhost:3020/api/chat/chat"
    try {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
                  },
          
        body: JSON.stringify({prompt, typeofquestions}), // what we are giving in body so that it gets store in database
      });
      
      let jsonResponse =await response.json();
      setaiRes(jsonResponse.resultValue)
    
      //to save post in database
        } catch (error) {
      console.log(error)
    }
  }

  //delete post
  const deletePost = async(id)=>{
    const url = `http://localhost:3020/api/auth/deletePost/${id}`
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = response.json();

    console.log(id + "of deleting post");
    const newPosts = postState.filter((post)=>{return post.id!==id})
    setPostState(newPosts);
  }
  //update post

  const updatePosts =async (id,title,content)=>{
    console.log(id,title,content)
    const url = `http://localhost:3020/api/auth/update/${id}`
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title,content}), // what we are giving in body .
    });

    const json =await response.json();
    //makes  deep copy of postState which is an array 
    let newPosts = JSON.parse(JSON.stringify(postState))
    for (let index = 0; index < newPosts.length; index++) {
      const element = newPosts[index];
      if(element.id === id){
        newPosts[index].title = title;
        newPosts[index].content=content;
      }
      setPostState(newPosts)
    }
  }


 
  return <postContext.Provider value={{postState , addPost,deletePost,updatePosts,getPosts,getUserPosts,UserpostState,aiResponse,aiRes}} >
    {props.children}
    </postContext.Provider>;
};

export default PostStates;
