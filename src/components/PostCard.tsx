import Post from "@/types/post";
import Image from "next/image";
import Link from "next/link";


export default function PostCard(props: Post) {
    const { title, body, id } = props;
    return (
        <li className="rounded-lg shadow-lg bg-neutral-700 m-5">
            <Image className="rounded-t-lg" src={`https://via.placeholder.com/600x400?text=${title.replace(" ", "").slice(0, 2).toUpperCase()}`} width={"600"} height={"400"} alt={title} />
            <Link href={`/posts/${id}`}>
                <div className="p-4">
                    <h4 className="text-xl text-neutral-50 font-medium">{title}</h4>
                    <p className="text-neutral-300">{body.slice(0, 50)}</p>
                </div>
            </Link>

        </li>
    );
}
