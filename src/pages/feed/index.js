import Navbar from "@/components/navbar";
import NewPost from "@/components/new-post";
import PostCard from "@/components/post-card";
import { getPosts } from "@/actions/api";
import { useEffect, useState } from "react";
import { useLoading } from "@/components/modal/loading/loadingProvider";
import styles from './feed.module.css';
import { EditProvider } from "@/components/modal/edit/editProvider";
import { DeleteProvider } from "@/components/modal/delete/deleteProvider";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const { showLoading, hideLoading } = useLoading();

    async function fetchData(offset = 0){
        showLoading();
        try{
            const response = await getPosts(offset);
            setPosts(response);
        }
        catch(err){
            alert(err.message)
        }
        hideLoading();
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div className={styles.feed_body}>
        <Navbar/>
        <div className={styles.feed_content}>
            <NewPost fetch={fetchData}/>
            <EditProvider>
                <DeleteProvider>
                    <div className={styles.feed_posts}>
                        {!!posts?.results?.length && posts?.results?.map((post) => (
                            <PostCard key={post.id} {...post} fetch={fetchData}/>
                        ))}
                    </div>
                </DeleteProvider>
            </EditProvider>
        </div>
    </div>
  );
}