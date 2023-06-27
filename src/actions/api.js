import Axios from "axios";

const baseUrl = "https://dev.codeleap.co.uk/careers/";

const api = Axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPosts = async (offset = 0, limit = 10) => {
  const response = await api.get("", {
    params: { offset, limit },
  });

  return response.data;
};

export const createPost = async (post) => {
  const response = await api.post("", post);
  return response.data;
};

export const editPost = async (post) => {
  const response = await api.patch(`${post?.id}/`, post);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`${id}/`);
  return response.data;
};
