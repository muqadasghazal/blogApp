
import React from "react";


//feed related with all users post cards
const UserPostCards = (props) => {
     let {post} = props;
     const authorName = post.user ? post.user.userName : "unknown author";

  return (
    <>
    
    <div className="d-flex justify-content-center">
    <div style={{height:"auto" , width:'50%' , border:'1px solid #80808045' , borderRadius:'10px' , marginBottom:'5px'}}>
        <h5 className="card-title mx-3 my-2">{post.title}</h5>
        <p className="card-text mx-3 my-1">{post.content}</p>
        <p className="card-text mx-3 my-1">
          <small className="text-muted">By :{authorName}</small>
        </p>
      </div>
    
  </div>
  </>
  )
}

export default UserPostCards
