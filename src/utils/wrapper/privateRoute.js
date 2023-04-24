import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
	const router = useRouter();
	const authData = useSelector((state) => state.auth.data);
	useEffect(() => {
		if (authData["pin"] === null) router.push("/createpin");
		if (authData.length <= 1) router.push("/login");
	}, [authData, router]);
	return <>{children}</>;
};
