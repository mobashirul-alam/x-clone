"use client";

import { modalState, postIdState } from "@/atom/modalAtom";
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
    HiHeart,
    HiOutlineChat,
    HiOutlineHeart,
    HiOutlineTrash,
} from "react-icons/hi";
import { useRecoilState } from "recoil";

const PostIcons = ({ id, uid }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const { data: session } = useSession();
    const db = getFirestore(app);

    const handleLikePost = async () => {
        // Implement like post functionality
        if (session) {
            if (isLiked) {
                await deleteDoc(
                    doc(db, "posts", id, "likes", session?.user?.uid)
                );
            } else {
                await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                    username: session.user.username,
                    timestamp: serverTimestamp(),
                });
            }
        } else {
            signIn();
        }
    };

    useEffect(() => {
        onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
            setLikes(snapshot.docs);
        });
    }, [db, id]);

    useEffect(() => {
        setIsLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        );
    }, [likes]);

    const deletePost = async () => {
        if (window.confirm("Are you sure you want to delete the post?")) {
            if (session?.user?.uid === uid) {
                deleteDoc(doc(db, "posts", id))
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

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", id, "comments"),
            (snapshot) => setComments(snapshot.docs)
        );
        return () => unsubscribe();
    }, [db, id]);

    return (
        <div className="flex justify-start gap-5 p-2 text-gray-500">
            <div className="flex items-center">
                <HiOutlineChat
                    onClick={() => {
                        if (!session) {
                            signIn();
                        } else {
                            setOpen(!open);
                            setPostId(id);
                        }
                    }}
                    className="h-8 w-8 cursor-pointer rounded-full transition-all duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100"
                />
                {comments.length > 0 && (
                    <span className="text-sm text-gray-500">
                        {comments.length}
                    </span>
                )}
            </div>
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
                    <span className={`text-xs ${isLiked && "text-red-500"}`}>
                        {likes.length}
                    </span>
                )}
            </div>

            {session?.user?.uid === uid && (
                <HiOutlineTrash
                    onClick={deletePost}
                    className="h-8 w-8 cursor-pointer rounded-full transition-all duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
                />
            )}
        </div>
    );
};

export default PostIcons;
