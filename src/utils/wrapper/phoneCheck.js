import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const PhoneCheck = ({ children }) => {
	const router = useRouter();
	const phoneNumber = useSelector((state) => state.user.data.noTelp);
	useEffect(() => {
		if (!phoneNumber) router.push("/profile/update-phone");
	}, [router, phoneNumber]);
	return <>{children}</>;
};
