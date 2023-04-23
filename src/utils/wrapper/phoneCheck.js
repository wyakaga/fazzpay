import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const PhoneCheck = ({ children }) => {
	const router = useRouter();
	const phoneNumber = useSelector((state) => state.user.phoneNumber);
	useEffect(() => {
		if (phoneNumber === null) router.push("/profile/update-phone");
	}, [router, phoneNumber]);
	return <>{children}</>;
};
