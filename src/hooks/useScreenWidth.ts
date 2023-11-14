import { useState, useEffect } from "react";

const useScreenSize = () => {
    const hasWindow = typeof window !== "undefined";
    const width = hasWindow ? window.innerWidth : 1440;
    const [screenSize, setScreenSize] = useState(width);

    useEffect(() => {
        if (hasWindow) {
            const handleResize = () => setScreenSize(window.innerWidth);

            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [hasWindow]);

    return screenSize;
};

export default useScreenSize;
