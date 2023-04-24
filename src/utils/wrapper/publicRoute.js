import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {
	const router = useRouter();
	const authData = useSelector((state) => state.auth.data);
	useEffect(() => {
		if (authData.length > 0) router.push("/home");
	}, [authData, router]);
	return <>{children}</>;
};
