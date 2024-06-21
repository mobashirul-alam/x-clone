"use client";

import { app } from "@/firebase.init";
import {
    collection,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        onSnapshot(
            query(
                collection(db, "posts", id, "comments"),
                orderBy("timestamp", "desc")
            ),
            (snapshot) => {
                setComments(snapshot.docs);
            }
        );
    }, [db, id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", id, "comments"),
            (snapshot) => setComments(snapshot.docs)
        );
        return () => unsubscribe();
    }, [db, id]);

    return (
        <div>
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment.data()}
                    commentId={comment.id}
                    postId={id}
                />
            ))}
        </div>
    );
};

export default Comments;
