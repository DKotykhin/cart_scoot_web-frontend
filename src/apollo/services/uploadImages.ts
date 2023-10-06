import Cookies from "js-cookie";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_REST_API;

export const uploadImages = async (data: FormData) => {
    const token = Cookies.get("token");
    const config = {
        method: "POST",
        url: "/license",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        data,
    };
    try {
        const user = await axios(config);

        return user.data.user;
    } catch (error: any) {
        console.log(error.message);
    }
};