import { HiDotsHorizontal } from "react-icons/hi";

const Comment = ({ id, comment }) => {
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
            </div>
        </div>
    );
};

export default Comment;
