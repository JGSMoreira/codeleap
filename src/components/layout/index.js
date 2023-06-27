import { setUsername } from "@/redux/slices/username.slice";
import store from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Layout({children}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.username);

    useEffect(() => {
        if (!username) {
            const storedUser = localStorage.getItem('username');
            if (storedUser && storedUser != '') {
                dispatch(setUsername(storedUser));
                router.push('/feed');
            }
            else
                router.push('/sign-up');
        }
        else
            router.push('/feed');

    }, [username]);

    return (
        <>
            {children}
        </>
    );
}