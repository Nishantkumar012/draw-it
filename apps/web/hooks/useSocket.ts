import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwYmNjZTIwMy00MGU1LTRmODEtYTY5Ni0zNzM3ZWQwMWVjMmYiLCJpYXQiOjE3NTMyMDk5NDl9.KxaORk-5u0sV4rYYIa98PaOAtXyydRq9IMw0zbqhhTU`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}