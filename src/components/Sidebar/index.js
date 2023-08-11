import { useRouter } from "next/router";
import { useEffect, useState, useMemo, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";

import { topUp } from "@/utils/https/transaction";
import { logout } from "@/utils/https/auth";
import { authAction } from "@/redux/slices/auth";
import { userAction } from "@/redux/slices/user";
import { transactionAction } from "@/redux/slices/transaction";

export default function Sidebar() {
	const dispatch = useDispatch();

	const router = useRouter();

	const currentRoute = router.pathname;

	const style = {
		active: "text-fazzpay-primary font-bold border-l-[5px] border-l-fazzpay-primary",
		inactive: "text-fazzpay-dark/80",
	};

	const controller = useMemo(() => new AbortController(), []);

	const token = useSelector((state) => state.auth.data.token);
	const phoneNumber = useSelector((state) => state.user.data?.noTelp);

	const [isHomeActive, setIsHomeActive] = useState(false);
	const [isTransferActive, setIsTransferActive] = useState(false);
	const [isTopUpActive, setIsTopUpActive] = useState(false);
	const [isProfileActive, setIsProfileActive] = useState(false);
	const [isLogoutActive, setIsLogoutActive] = useState(false);
	const [amount, setAmount] = useState("");

	useEffect(() => {
		if (currentRoute.includes("/home")) setIsHomeActive(true);
		if (currentRoute.includes("/profile")) setIsProfileActive(true);
		if (currentRoute.includes("/transfer")) setIsTransferActive(true);
	}, [currentRoute]);

	const toHomeHandler = () => {
		router.push("/home");
		setIsHomeActive(true);
	};

	const toTransferHandler = () => {
		phoneNumber === null ? router.push("/profile/update-phone") : router.push("/transfer");
		setIsTransferActive(true);
	};

	const toTopUpHandler = () => {
		phoneNumber === null ? router.push("profile/update-phone") : setIsTopUpActive(true);
		setIsHomeActive(false);
		setIsProfileActive(false);
		setIsTransferActive(false);
	};

	const topUpCloseHandler = () => {
		setIsTopUpActive(false);
		if (currentRoute.includes("/home")) setIsHomeActive(true);
		if (currentRoute.includes("/profile")) setIsProfileActive(true);
		if (currentRoute.includes("/transfer")) setIsTransferActive(true);
	};

	const toProfileHandler = () => {
		router.push("/profile");
		setIsProfileActive(true);
	};

	const onAmountChange = (e) => {
		setAmount(e.target.value);
	};

	const topUpHandler = (e) => {
		e.preventDefault();

		toast.promise(topUp(amount, token, controller), {
			pending: {
				render() {
					e.target.disabled = true;
					return "Please wait..."
				}
		},
			success: {
				render({ data }) {
					e.target.disabled = false;
					setAmount("");
					const redirectUrl = data["data"]["data"]["redirectUrl"];
					setTimeout(() => {
						if (redirectUrl) router.push(redirectUrl);
					}, 3000);
					return "Top up success!";
				},
			},
			error: {
				render({ data }) {
					e.target.disabled = false;
					if (data["response"]) return data["response"]["data"]["msg"];
					return "Something went wrong";
				},
			},
		});
	};

	const toLogoutHandler = () => {
		setIsLogoutActive(true);
		setIsHomeActive(false);
		setIsProfileActive(false);
		setIsTransferActive(false);
	};

	const logoutCloseHandler = () => {
		setIsLogoutActive(false);
		if (currentRoute.includes("/home")) setIsHomeActive(true);
		if (currentRoute.includes("/profile")) setIsProfileActive(true);
		if (currentRoute.includes("/transfer")) setIsTransferActive(true);
	};

	const logoutHandler = (e) => {
		e.preventDefault();

		toast.promise(logout(token), {
			pending: {
				render() {
					e.target.disabled = true;
					return "Please wait..."
				}
			},
			success: {
				render() {
					e.target.disabled = false;
					router.push("/");
					dispatch(authAction.remove());
					dispatch(userAction.reset());
					dispatch(transactionAction.reset());
					return "Succesfully logged out";
				},
			},
			error: {
				render({ data }) {
					e.target.disabled = false;
					if (data["response"]) return data["response"]["data"]["msg"];
					return "Something went wrong";
				},
			},
		});
	};

	return (
		<section className="nav-sidebar hidden lg:w-1/4 font-nunitoSans lg:grid grid-rows-2 bg-fazzpay-secondary rounded-[25px] shadow-[0px_4px_20px_rgba(0,0,0,0.5)] py-10 ">
			<section className="top flex flex-col gap-y-10">
				<div
					onClick={() => toHomeHandler()}
					className={`dashboard flex gap-x-5 items-center cursor-pointer ${
						isHomeActive === true ? style.active : style.inactive
					} hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary duration-300`}
				>
					<div className="tab-icon pl-10">
						<svg
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current"
						>
							<path
								d="M11.6667 3.5H3.5V11.6667H11.6667V3.5Z"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M24.4999 3.5H16.3333V11.6667H24.4999V3.5Z"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M24.4999 16.333H16.3333V24.4997H24.4999V16.333Z"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M11.6667 16.333H3.5V24.4997H11.6667V16.333Z"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className="tab-title text-lg text-current">Dashboard</div>
				</div>
				<div
					onClick={() => toTransferHandler()}
					className={`transfer flex gap-x-5 items-center cursor-pointer ${
						isTransferActive === true ? style.active : style.inactive
					} hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary duration-300`}
				>
					<div className="tab-icon pl-10">
						<svg
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current"
						>
							<path
								d="M14 22.1663V5.83301"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5.83333 13.9997L14 5.83301L22.1667 13.9997"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className="tab-title text-lg text-current">Transfer</div>
				</div>
				<div
					onClick={() => toTopUpHandler()}
					className={`top-up flex gap-x-5 items-center cursor-pointer ${
						isTopUpActive === true ? style.active : style.inactive
					} hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary duration-300`}
				>
					<div className="tab-icon pl-10">
						<svg
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current"
						>
							<path
								d="M14 5.83301V22.1663"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5.83333 14H22.1667"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className="tab-title text-lg text-current">Top Up</div>
				</div>
				<div
					onClick={() => toProfileHandler()}
					className={`profile flex gap-x-5 items-center cursor-pointer ${
						isProfileActive === true ? style.active : style.inactive
					} hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary duration-300`}
				>
					<div className="tab-icon pl-10">
						<svg
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current"
						>
							<path
								d="M23.3333 24.5V22.1667C23.3333 20.929 22.8417 19.742 21.9665 18.8668C21.0913 17.9917 19.9043 17.5 18.6667 17.5H9.33334C8.09566 17.5 6.90868 17.9917 6.03351 18.8668C5.15834 19.742 4.66667 20.929 4.66667 22.1667V24.5"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M14 12.8333C16.5773 12.8333 18.6667 10.744 18.6667 8.16667C18.6667 5.58934 16.5773 3.5 14 3.5C11.4227 3.5 9.33333 5.58934 9.33333 8.16667C9.33333 10.744 11.4227 12.8333 14 12.8333Z"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className="tab-title text-lg text-current">Profile</div>
				</div>
			</section>
			<section className="bottom flex flex-col justify-end">
				<div
					onClick={() => toLogoutHandler()}
					className={`logout flex gap-x-5 items center cursor-pointer ${
						isLogoutActive === true ? style.active : style.inactive
					} hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary duration-300`}
				>
					<div className="tab-icon pl-10">
						<svg
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current"
						>
							<path
								d="M10.5 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H10.5"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M18.6667 19.8337L24.5 14.0003L18.6667 8.16699"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M24.5 14H10.5"
								strokeOpacity="0.8"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className="tab-title text-lg text-current">Logout</div>
				</div>
			</section>
			<Transition appear show={isTopUpActive} as={Fragment}>
				<Dialog
					as="div"
					onClose={topUpCloseHandler}
					className="relative z-[51]"
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed bg-gray-700/80 inset-0 overflow-y-auto" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-screen">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="bg-fazzpay-secondary w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg z-[52]">
									<div className="flex flex-col gap-y-10">
										<div className="flex flex-col gap-y-5">
											<div className="flex items-center justify-between">
												<p className="font-bold text-2xl text-fazzpay-dark">Topup</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													onClick={() => topUpCloseHandler()}
													className="bi bi-x-lg h-6 w-6 fill-fazzpay-dark cursor-pointer"
													viewBox="0 0 16 16"
												>
													<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
												</svg>
											</div>
											<p className="text-fazzpay-dark/60">
												Enter the amount of money, and click <br /> submit
											</p>
										</div>
										<div className="border border-[#A9A9A999] rounded-md flex justify-center">
											<input
												value={amount}
												onChange={onAmountChange}
												type="number"
												className={`h-16 text-lg border-b rounded-none ${
													amount ? "border-transparent" : "border-[#A9A9A966]"
												} focus:outline-none bg-transparent w-3/4 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
											/>
										</div>
										<div className="submit-button pt-10 flex justify-end">
											<button
												onClick={(e) => topUpHandler(e)}
												className="btn normal-case w-1/4 border-transparent text-fazzpay-secondary bg-fazzpay-primary hover:text-fazzpay-primary hover:bg-fazzpay-secondary disabled:bg-[#DADADA] disabled:text-[#88888F]"
											>
												Submit
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			<Transition appear show={isLogoutActive} as={Fragment}>
				<Dialog
					as="div"
					onClose={logoutCloseHandler}
					className="relative z-[51]"
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed bg-gray-700/80 inset-0 overflow-y-auto" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-screen">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="bg-fazzpay-secondary w-1/2 p-16 rounded-lg shadow-lg text-center z-20">
									<p className="text-2xl font-bold mb-2">Are you sure?</p>
									<div className="logout-button pt-10">
										<button
											onClick={logoutHandler}
											className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-primary hover:text-fazzpay-primary hover:bg-fazzpay-secondary disabled:bg-[#DADADA] disabled:text-[#88888F]"
										>
											Yes
										</button>
									</div>
									<div className="cancel-button pt-10">
										<button
											onClick={logoutCloseHandler}
											className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-error hover:text-fazzpay-error hover:bg-fazzpay-secondary"
										>
											No
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</section>
	);
}
