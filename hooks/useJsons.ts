import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

type Post = {
  userId: number
    id:number
    title:string
    body: string
}

export const useQueryPost = () => {
  const router = useRouter();
  const getPosts = async () => {
    const { data } = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_API_URL_JSON}`
    );
    return data;
  };
  return useQuery<Post[], Error>({
    queryKey: ["post"],
    queryFn: getPosts,
    onError: (err: any) => {
      console.log(err);

    },
  });
};
