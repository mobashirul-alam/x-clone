import { app } from "@/firebase.init";
import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";
import Post from "./Post";

const Feed = async () => {
    let data = [];
    const db = getFirestore(app);
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });

    return (
        <div>
            {data.map((post) => (
                <Post key={post.id} post={post} id={post.id} />
            ))}
        </div>
    );
};

export default Feed;
