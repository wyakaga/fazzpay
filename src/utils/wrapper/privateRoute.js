import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
	const router = useRouter();
	const authData = useSelector((state) => state.auth.data);
	if (authData["pin"] === null) router.push("/createpin");
	if (authData.length <= 1) router.push("/login");
	return <>{children}</>;
};
