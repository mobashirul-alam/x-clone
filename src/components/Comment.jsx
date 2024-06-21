import { app } from "@/firebase.init";
import {
    collection,
    deleteDoc,
    doc,
    getFirestore,
    onSnapshot,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
    HiDotsHorizontal,
    HiHeart,
    HiOutlineHeart,
    HiOutlineTrash,
} from "react-icons/hi";

const Comment = ({ comment, commentId, postId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    const { data: session } = useSession();
    const db = getFirestore(app);

    const handleLikePost = async () => {
        // Implement like post functionality
        if (session) {
            if (isLiked) {
                await deleteDoc(
                    doc(
                        db,
                        "posts",
                        postId,
                        "comments",
                        commentId,
                        "likes",
                        session?.user?.uid
                    )
                );
            } else {
                await setDoc(
                    doc(
                        db,
                        "posts",
                        postId,
                        "comments",
                        commentId,
                        "likes",
                        session.user.uid
                    ),
                    {
                        username: session.user.username,
                        timestamp: serverTimestamp(),
                    }
                );
            }
        } else {
            signIn();
        }
    };

    useEffect(() => {
        onSnapshot(
            collection(db, "posts", postId, "comments", commentId, "likes"),
            (snapshot) => {
                setLikes(snapshot.docs);
            }
        );
    }, [db]);

    useEffect(() => {
        setIsLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        );
    }, [likes]);

    const deletePost = async () => {
        if (window.confirm("Are you sure you want to delete the post?")) {
            if (session?.user?.uid === comment?.uid) {
                deleteDoc(doc(db, "posts", postId, "comments", commentId))
                    .then(() => {
                        console.log("Document successfully deleted.");
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error("Error removing document: ", error);
                    });
            } else {
                alert("You are not authorized to delete this post.");
            }
        }
    };

    return (
        <div className="flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10">
            <img
                src={comment?.userImg}
                alt="user-img"
                className="h-9 w-9 rounded-full mr-4"
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 whitespace-nowrap">
                        <h4 className="font-bold text-xs truncate">
                            {comment?.name}
                        </h4>
                        <span className="text-xs truncate">
                            @{comment?.username}
                        </span>
                    </div>
                    <HiDotsHorizontal className="text-sm" />
                </div>

                <p className="text-xs text-gray-600 my-3">{comment?.comment}</p>

                <div className="flex justify-start gap-5 p-2 text-gray-500">
                    <div className="flex items-center">
                        {isLiked ? (
                            <HiHeart
                                onClick={handleLikePost}
                                className="h-8 w-8 text-red-500 cursor-pointer rounded-full transition-all duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
                            />
                        ) : (
                            <HiOutlineHeart
                                onClick={handleLikePost}
                                className="h-8 w-8 cursor-pointer rounded-full transition-all duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
                            />
                        )}
                        {likes.length > 0 && (
                            <span
                                className={`text-xs ${
                                    isLiked && "text-red-500"
                                }`}
                            >
                                {likes.length}
                            </span>
                        )}
                    </div>

                    {session?.user?.uid === comment.uid && (
                        <HiOutlineTrash
                            onClick={deletePost}
                            className="h-8 w-8 cursor-pointer rounded-full transition-all duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
