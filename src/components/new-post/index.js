import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './new-post.module.css';
import { createPost } from '@/actions/api';
import { useLoading } from '../modal/loading/loadingProvider';

export default function NewPost({ fetch }){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { showLoading, hideLoading } = useLoading();
    const username = useSelector((state) => state.user.username);

    const handleTitle = (event) => setTitle(event.target.value?.trim());
    const handleContent = (event) => setContent(event.target.value?.trim());
    
    function clearForm(event){
      event.target.reset();
      setTitle("");
      setContent("");
    }

    async function handleSubmit(event){
      showLoading();
      event.preventDefault();
      try{
        await createPost({ username, title, content });
        clearForm(event);
        await fetch();
      }
      catch(err){
        alert(err.message);
      }
      hideLoading();
    }

    return (
      <div className={styles.newpost_body}>
        <h4 className={styles.newpost_title}>What's on your mind?</h4>
        <form className='flex_form' onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Hello World :)"
            onChange={handleTitle}
          />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Content here"
            onChange={handleContent}
          />
          <button disabled={title == "" || content == ""} type='submit'>Create</button>
        </form>
      </div>
    );
}