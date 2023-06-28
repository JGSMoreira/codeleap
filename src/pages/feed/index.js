/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/navbar";
import NewPost from "@/components/new-post";
import PostCard from "@/components/post-card";
import { getPosts } from "@/actions/api";
import { useEffect, useState } from "react";
import { useLoading } from "@/components/modal/loading/loadingProvider";
import { EditProvider } from "@/components/modal/edit/editProvider";
import { DeleteProvider } from "@/components/modal/delete/deleteProvider";
import styles from "./feed.module.css";

export default function Feed() {
  const [posts, setPosts] = useState();
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
    const offset = posts?.next?.split("&offset=")[1];
    const newPosts = await fetch(offset);
    setPosts((posts) => ({
        next: newPosts?.next,
        results: [...posts?.results, ...newPosts?.results],
      }));
    hideLoading();
  }

  function handleScroll() {
    if (!posts?.next) return;
    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) fetchMore();
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts]);

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
