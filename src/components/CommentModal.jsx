"use client";

import { modalState } from "@/atom/modalAtom";
import { useRecoilState } from "recoil";

const CommentModal = () => {
    const [open, setOpen] = useRecoilState(modalState);
    return <div>CommentModal</div>;
};

export default CommentModal;
