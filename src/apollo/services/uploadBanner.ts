import Cookies from "js-cookie";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_REST_API;

export const uploadBanner = async (data: FormData) => {
    const token = Cookies.get("token");
    const config = {
        method: "POST",
        url: "/banner",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        data,
    };
    try {
        const imageURL = await axios(config);

        return imageURL.data.imageURL;
    } catch (error: any) {
        console.log(error.message);
    }
};
