import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getDataById } from "@/utils/https/user";
import { history } from "@/utils/https/transaction";

import defaultPic from "@/assets/img/profile-placeholder.webp";

// TODO: add dropdown to bell icon

export default function Header() {
	const router = useRouter();

	const userId = useSelector((state) => state.auth.data.id);
	const token = useSelector((state) => state.auth.data.token);

	const [data, setData] = useState({});
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getDataById(userId, token).then((res) => {
			setData(res["data"]["data"]);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		history(1, 5, "WEEK", token)
			.then((res) => {
				setUsers(res["data"]["data"]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

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
					<div
						onClick={() => router.push("/profile")}
						className="flex items-center gap-x-4 cursor-pointer"
					>
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
								className="rounded-md h-auto w-auto"
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
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="cursor-pointer">
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
									strokeWidth="2"
									strokewinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M13.7305 21C13.5547 21.3031 13.3024 21.5547 12.9987 21.7295C12.6951 21.9044 12.3509 21.9965 12.0005 21.9965C11.6501 21.9965 11.3059 21.9044 11.0023 21.7295C10.6987 21.5547 10.4463 21.3031 10.2705 21"
									stroke="#4D4B57"
									strokeWidth="2"
									strokewinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu dropdown-content p-4 shadow bg-fazzpay-secondary rounded-box w-80 mt-12 gap-y-5"
						>
							{users.map((user, idx) => {
								return (
									<li
										className="bg-fazzpay-secondary shadow-[0px_4px_20px_rgba(0,0,0,0.1)] rounded-[10px]"
										key={idx}
									>
										<div className="flex items-center">
											<div>
												{user.type === "send" ? (
													<svg
														width="28"
														height="28"
														viewBox="0 0 28 28"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M14 22.1663L14 5.83301"
															stroke="#FF5B37"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
														<path
															d="M5.83334 13.9997L14 5.83301L22.1667 13.9997"
															stroke="#FF5B37"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
													</svg>
												) : (
													<svg
														width="28"
														height="28"
														viewBox="0 0 28 28"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M14 5.83366L14 22.167"
															stroke="#1EC15F"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
														<path
															d="M22.1667 14.0003L14 22.167L5.83333 14.0003"
															stroke="#1EC15F"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
													</svg>
												)}
											</div>
											<div className="flex flex-col">
												<p className="text-sm text-[#7A7A7A]">
													{user.type === "topup"
														? "Top Up"
														: user.type === "send"
														? `Transfer to ${user.firstName} ${user.lastName}`
														: `Accept from ${user.firstName} ${user.lastName}`}
												</p>
												<p className="font-bold text-lg text-[#43484F]">{`Rp ${user.amount.toLocaleString(
													"id-ID"
												)}`}</p>
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
