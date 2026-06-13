import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        // forcegny le page mba hagnapody scroll ambony agny.
        window.scroll({
            top: 0,
            left: 0,
            behavior : 'instant' 
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;