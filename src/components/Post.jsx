import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import PostIcons from "./PostIcons";

const Post = ({ post, id }) => {
    return (
        <div className="flex p-3 border-b border-gray-200 hover:bg-gray-50">
            <img
                src={post?.profileImg}
                alt="user-img"
                className="h-11 w-11 rounded-full mr-4"
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 whitespace-nowrap">
                        <h4 className="font-bold text-xs truncate">
                            {post?.name}
                        </h4>
                        <span className="text-xs truncate">
                            @{post?.username}
                        </span>
                    </div>
                    <HiDotsHorizontal className="text-sm" />
                </div>
                {post?.text && (
                    <Link href={`/posts/${id}`}>
                        <p className="text-sm text-gray-600 my-3">
                            {post?.text}
                        </p>
                    </Link>
                )}
                {post?.image && (
                    <Link href={`/posts/${id}`}>
                        <img src={post?.image} className="rounded-2xl mr-2" />
                    </Link>
                )}

                <PostIcons id={id} uid={post.uid} />
            </div>
        </div>
    );
};

export default Post;
