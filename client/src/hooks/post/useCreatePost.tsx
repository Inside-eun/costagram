/* eslint-disable */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface FormData {
  postContent: string;
  location: string;
  weather: string;
  imagePath: any;
}

const apis = {
  postImageAndContent: async (data: FormData) => {
    return await axios
      .post(`/post`, data, {
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 5000,
        headers: {
          withCredentials: true,
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch(err => console.log(err));
  },
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ['post/post'],
    (formdata: FormData) => apis.postImageAndContent(formdata),
    {
      onSuccess: () => queryClient.invalidateQueries(['get/post']),
    },
  );

  return { mutate };
};

export default useCreatePost;