import Button from "./Button";
import { X } from "lucide-react";

import "@/styles/post_modal.css";

const PostModal = () => {

    return (
        <div id="outer-box">
            
            <button>
                <X color="#E1AB69" size={48} id="x" />
            </button>

            <textarea type="text" id="text" name="post" placeholder="Type here..." />

            <div id="buttons">
                <Button title="Anonymous ON" />
                <Button title="Post" />
            </div>
            
        </div>
    )
}

export default PostModal;