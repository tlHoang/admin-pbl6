import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PostData {
  month: string;
  year: string;
  count: number;
}

interface PostResponse {
  statusCode: number;
  statusDetail: string;
  message: string;
  data: {
    totalPosts: number;
    postCreatedToday: number;
    postCreatedEachMonth: PostData[];
  };
}

const fetchPostData = async (token: string): Promise<PostResponse> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_POSTS_API_URL}/jobs-statistic`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const usePostData = (token: string) => {
  return useQuery({
    queryKey: ['postData'],
    queryFn: () => fetchPostData(token),
  });
};