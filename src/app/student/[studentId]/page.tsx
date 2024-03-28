import { getStudent } from "@/services/students";

interface PostView{
    params:{
        postId: string;
    }
}
export default async function PostsPage(props: PostView) {
    const post = await getStudent(props.params.postId);
    return (
     <>
     </>
    )
  }
  