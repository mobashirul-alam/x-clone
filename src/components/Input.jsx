"use client";

import { app } from "@/firebase.init";
import {
    addDoc,
    collection,
    getFirestore,
    serverTimestamp,
} from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";

const Input = () => {
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [text, setText] = useState("");
    const [postLoading, setPostLoading] = useState(false);

    const { data: session } = useSession();
    const db = getFirestore(app);

    const imagePickRef = useRef();

    const addImageToPost = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (selectedFile) {
            uploadImageToStorage();
        }
    }, [selectedFile]);

    const uploadImageToStorage = () => {
        setImageFileUploading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "-" + selectedFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Handle uploaded bytes
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
                setImageFileUploading(false);
                setImageFileUrl(null);
                setSelectedFile(null);
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setImageFileUploading(false);
                });
            }
        );
    };

    const handleSubmit = async () => {
        setPostLoading(true);
        const docRef = await addDoc(collection(db, "posts"), {
            uid: session.user.uid,
            username: session.user.username,
            name: session.user.name,
            text,
            profileImg: session.user.image,
            image: imageFileUrl,
            timestamp: serverTimestamp(),
        });
        setPostLoading(false);
        setText("");
        setImageFileUrl(null);
        setSelectedFile(null);
        location.reload();
    };

    if (!session) return null;

    return (
        <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
            <img
                src={session.user.image}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            />
            <div className="w-full divide-y divide-gray-200">
                <textarea
                    placeholder="What's happening"
                    rows="3"
                    className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {selectedFile && (
                    <img
                        src={imageFileUrl}
                        alt="image"
                        className={`w-full max-h-[250px] object-cover cursor-pointer ${
                            imageFileUploading && "animate-pulse"
                        }`}
                    />
                )}
                <div className="flex items-center justify-between pt-2.5">
                    <HiOutlinePhotograph
                        onClick={() => imagePickRef.current.click()}
                        className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
                    />
                    <input
                        type="file"
                        ref={imagePickRef}
                        accept="image/*"
                        onChange={addImageToPost}
                        hidden
                    />
                    <button
                        className="bg-blue-400 text-white px-4 py-2 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                        disabled={
                            text.trim() === "" ||
                            postLoading ||
                            imageFileUploading
                        }
                        onClick={handleSubmit}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Input;
