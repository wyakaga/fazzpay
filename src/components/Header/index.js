import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getDataById } from "@/utils/https/user";

import defaultPic from "@/assets/img/profile-placeholder.webp";

// TODO: add dropdown to bell icon

export default function Header() {
	const router = useRouter();

	const userId = useSelector((state) => state.auth.data.id);
	const token = useSelector((state) => state.auth.data.token);

	const [data, setData] = useState({});

	useEffect(() => {
		getDataById(userId, token).then((res) => {
			setData(res["data"]["data"]);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="navbar lg:px-28 px-4 py-6 font-nunitoSans bg-fazzpay-secondary/80 rounded-b-md shadow-[0px_4px_20px_rgba(0,0,0,0.5)] fixed top-0 left-0 z-50">
				<div className="navbar-start">
					<p
						onClick={() => router.push("/home")}
						className="text-3xl text-fazzpay-primary font-bold cursor-pointer"
					>
						FazzPay
					</p>
				</div>
				<div className="navbar-end flex flex-row lg:gap-x-5 gap-x-2">
					<div onClick={() => router.push("/profile")} className="flex gap-x-4 cursor-pointer">
						<div>
							<Image
								alt="user profile"
								src={
									data["image"]
										? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${data["image"]}`
										: defaultPic
								}
								width={52}
								height={52}
								className="rounded-md"
							/>
						</div>
						<div>
							<p className="font-bold text-lg text-fazzpay-dark">{`${
								data["firstName"] ? data["firstName"] : "Anonymous"
							} ${data["lastName"] ? data["lastName"] : "Anonymous"}`}</p>
							<p className="text-sm text-fazzpay-dark/90">
								{data["noTelp"] ? data["noTelp"] : "No Phone Number"}
							</p>
						</div>
					</div>
					<div className="cursor-pointer">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
								stroke="#4D4B57"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13.7305 21C13.5547 21.3031 13.3024 21.5547 12.9987 21.7295C12.6951 21.9044 12.3509 21.9965 12.0005 21.9965C11.6501 21.9965 11.3059 21.9044 11.0023 21.7295C10.6987 21.5547 10.4463 21.3031 10.2705 21"
								stroke="#4D4B57"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>
		</>
	);
}
