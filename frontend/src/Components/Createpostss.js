import React, { useContext, useState } from "react";
import postContext from "../Context/PostContext";

const CreatePost = (props) => {
  const [post,setPost] = useState({title:"" , content:""})
  const [prompt,setPrompt] = useState("");
  const [typeofquestions,settypeofquestions] = useState("");

  const context = useContext(postContext);
  const {addPost,aiResponse,aiRes} = context



  const handleOnChange=(event)=>{
      setPost({...post , [event.target.name]:event.target.value});
  }
  const handlePrompt = (event)=>{
    setPrompt(event.target.value);
  }

  const handleOnChange2=(event)=>{
    settypeofquestions({...typeofquestions , [event.target.name]:event.target.value});
}
const handleTypeOfQuestions = (event)=>{
  settypeofquestions(event.target.value);
}
  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default form submission
    addPost(post.title, post.content);
    props.showAlert("success" , "Post has been created")
    setPost({title:"" , content:""})
  };
  

  const submitPrompt=(e)=>{
    e.preventDefault(); // Prevent the default form submission
    aiResponse(prompt,typeofquestions)
    props.showAlert("success" , "Generating.......")
  }
  const saveAiResponse = ()=>{
    addPost(prompt, aiRes)
    props.showAlert("success" , "Post has been created")
    setPrompt("")
  }
  return (
    <div>
      <>
        <h2>Create Posts Here</h2>
        <form action="">
        <div className="mb-3 col-md-6">
          <label htmlFor="title" className="form-label">
            <b>Title</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Set title here"
            value={post.title}
            onChange={handleOnChange}
            required>
          </input>

        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="content" className="form-label">
           <b>Content</b>
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows={3}
            value={post.content}
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Post</button>
        </form>


        <div className="container my-5">
        <h4 className="text-center" style={{fontFamily:'Dancing Script , cursive' , fontSize:'xx-large'}}>Do you want to create blog using chatGPT?</h4>
        <h4 className="text-center" style={{fontFamily:'Dancing Script , cursive' , fontSize:'xx-large'}}>Here is an option. Write your topic with specifications here and get your blog</h4>
        <form className="my-3" onSubmit={submitPrompt}>

       
        <h4 >On what topic/title you want to create Blog?</h4>
        <input className="form-control" type="text"  value={prompt} placeholder="Enter topic here"  onChange={handlePrompt} aria-label="default input example" required/>
        <input className="form-control" type="text"  value={typeofquestions} placeholder="Enter type of questions here"  onChange={handleTypeOfQuestions} aria-label="default input example" required/>

        <button className="btn btn-primary my-3">Submit</button>
        </form>
             {/* get reponse from context and show here */}
         <p style={{color:'black' , backgroundColor:'#2125291f' , padding:'10px 10px'}}> {aiRes} </p> 
           
             <button className="btn btn-primary" onClick={saveAiResponse}> Save </button>
        </div>
      </>
    </div>
  );
};

export default CreatePost;
