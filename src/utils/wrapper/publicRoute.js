import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {
	const router = useRouter();
	const { token } = useSelector((state) => state.auth.data);
	if (token) router.push("/home");

	return <>{children}</>;
};
