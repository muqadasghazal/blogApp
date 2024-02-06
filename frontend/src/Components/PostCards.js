import React, { useContext } from "react";
import postContext from "../Context/PostContext";

//home related with use personal post cards
const Postcard = (props) => {
  let context = useContext(postContext);
  let { deletePost } = context;
  let { post, updatePost,showAlert } = props;
  const authorName = post.user ? post.user.userName : "unknown author";
  return (
    <>
    <div className="d-flex justify-content-center">
    <div style={{height:"auto" , width:'50%' , border:'1px solid #80808045' , borderRadius:'10px' , marginBottom:'5px'}}>
        <h5 className=" mx-3 my-2">{post.title}</h5>
        <p className="mx-3 my-1">{post.content}</p>
        <p className=" mx-3 my-1">
          <small className="text-muted">By :{authorName}</small>
        </p>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-end">
          <div className="p-2">
            <i
              className="fa-solid fa-trash"
              onClick={() => {
                deletePost(post.id);
                showAlert("success","Post has been deleted")
              }}
            ></i>
          </div>
          <div className="p-2">
            <i
              className="fa-solid fa-pen-to-square"
              onClick={() => {
                updatePost(post);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>

    
    </>
    
  );
};

export default Postcard;
