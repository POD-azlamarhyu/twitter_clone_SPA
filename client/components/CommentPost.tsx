import React from 'react';
import { useRouter } from 'next/router';
import { useState,useEffect,useRef } from 'react';
import Cookie from "universal-cookie";
import Layout from "./Layout";
import MainLayout from "./MainLayout";
import NotFount from "./NotFount";
import axios from 'axios';

const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;
const cookie = new Cookie();

const CommentPost = ({tid}) => {

    const router = useRouter();
    const [userProfile,setUserProfile] = useState([]);
    const [isAuth,setIsAuth] = useState(true);
    const [commentImg,setCommentImg] = useState("");
    const [text,setText] = useState("");
    const inputImageDom = useRef(null);
    const like = [];


    // const onChangeForm = (e) => {
    //     setFormData({...formData,[e.target.name]: e.target.value});
    // }

    const onChangeImg = (e) => {
        setCommentImg(e.target.files[0]);
    }
    const onChangeText = (e) => {
        setText(e.target.value);
    }

    const postComment = async(e) => {
        e.preventDefault();
        let img;
        const form_data = new FormData();
        form_data.append('text',text);
        form_data.append('tweet',parseInt(tid));
        if(commentImg){
            form_data.append("comment_img",commentImg);
            img = commentImg;
        }else{
            img=null;
            form_data.append("comment_img",img);
        }
        const res = await fetch(
            `${apiEndPoint}api/comment/`,
            {
                method: "POST",
                headers:{
                    "Authorization": `JWT ${cookie.get("access_token")}`,
                },
                body:form_data,
            }
        )


        if (res.status === 201 || res.status === 200){
            console.log("コメントしました");
        }
    }



  return (
      <>
        <div className='m-2'>
            <p className='md:text-2xl'>コメントを投稿</p>
            <form className='border-3' onSubmit={postComment}>
                <div>
                    <textarea 
                    type="text"
                    className='md:my-5 md:mx-0 shadow appearance-none border rounded md:w-full md:h-24 md:py-2 md:px-3'  placeholder='comment...'
                    wrap='hard'
                    name='text'
                    onChange={onChangeText}
                    >

                    </textarea>
                </div>
                <div>
                    <input 
                        ref={inputImageDom}
                        type="file" 
                        accept="image/*"
                        name='comment_img'
                        onChange={onChangeImg}
                        />
                </div>
                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='align-middle block sm:text-xl md:text-2xl test-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-white m-4'
                        >
                        ツイート
                    </button>
                </div>
            </form>
        </div>
      </>
  )
}

export default CommentPost;