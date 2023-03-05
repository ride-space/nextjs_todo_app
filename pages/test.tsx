import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { useQueryPost } from "../hooks/useJsons";

const Test: NextPage = () => {
const {data} = useQueryPost()
console.log(data);

  return (
    <Layout title="Task Board">
      <div>これはテストです。</div>
      <div>これはテスト2です。</div>
{data?.map((post) => {
  return <div key={post.id}>{post.id}:{post.body}</div>
})}
    </Layout>
  );
};

export default Test;
