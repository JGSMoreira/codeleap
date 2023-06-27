import Navbar from "@/components/navbar";
import NewPost from "@/components/new-post";
import PostCard from "@/components/post-card";
import { getPosts } from "@/actions/api";
import { useEffect, useState } from "react";
import { useLoading } from "@/components/modal/loading/loadingProvider";
import styles from "./feed.module.css";
import { EditProvider } from "@/components/modal/edit/editProvider";
import { DeleteProvider } from "@/components/modal/delete/deleteProvider";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  async function fetch(offset = 0) {
    try {
      const response = await getPosts(offset, 10);
      return response;
    } catch (err) {
      alert(err.message);
    }
  }

  async function fetchData() {
    showLoading();
    setPosts(await fetch());
    hideLoading();
  }

  async function fetchMore() {
    showLoading();
    const offset = posts?.next?.trim().split("&offset=")[1];
    const newPosts = await fetch(offset);
    setPosts((posts) => {
      return {
        next: newPosts?.next,
        results: [...posts?.results, ...newPosts?.results],
      };
    });
    hideLoading();
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) fetchMore();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.feed_body}>
      <Navbar />
      <div className={styles.feed_content}>
        <NewPost fetch={fetchData} />
        <EditProvider>
          <DeleteProvider>
            <div className={styles.feed_posts}>
              {!!posts?.results?.length &&
                posts?.results?.map((post) => (
                  <PostCard key={post.id} {...post} posts={posts} />
                ))}
            </div>
          </DeleteProvider>
        </EditProvider>
      </div>
    </div>
  );
}
