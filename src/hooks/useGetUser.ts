import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { User } from "@/models/User";

const useGetUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUser = async () => {
        try {
            const response = await axiosInstance.get("/api/user-details");
            const data = response.data;
            if (data.result) {
                setUser(data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return { user, loading };
};

export default useGetUser;
