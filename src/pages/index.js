import { useRouter } from "next/router";
export default function Index() {
    const router = useRouter();

    return(
        <div>
            <h1>Home</h1>
            <button onClick={() => router.push("/sign-up")}>Sign Up</button>
        </div>
    );
}