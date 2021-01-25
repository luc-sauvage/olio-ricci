import { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";


export function useUploadFile () {
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const [image, setImage] = useState("");
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState("");

    async function uploadFileHandler(e) {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post("/api/uploads", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data); 
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

    return [image, loadingUpload, errorUpload, uploadFileHandler];
}

