import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

import { getData, topUp, history } from "@/utils/https/transaction";
import { getDataById } from "@/utils/https/user";
import { userAction } from "@/redux/slices/user";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Chart from "@/components/Chart";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";

import defaultProfile from "@/assets/img/profile-placeholder.webp";

export default function Home() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [totalIncome, setTotalIncome] = useState(null);
	const [totalExpense, setTotalExpense] = useState(null);
	const [balance, setBalance] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isTopUpActive, setIsTopUpActive] = useState(false);
	const [amount, setAmount] = useState("");
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const userId = useSelector((state) => state.auth.data.id);
	const token = useSelector((state) => state.auth.data.token);
	const telephoneNumber = useSelector((state) => state.user.phoneNumber);

	useEffect(() => {
		setIsLoading(true);
		getData(userId, token)
			.then((res) => {
				setTotalIncome(res["data"]["data"]["totalIncome"]);
				setTotalExpense(res["data"]["data"]["totalExpense"]);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [userId, token]);

	useEffect(() => {
		getDataById(userId, token).then((res) => {
			setBalance(res["data"]["data"]["balance"]);
			setPhoneNumber(res["data"]["data"]["noTelp"]);
			dispatch(userAction.savePhone(res["data"]["data"]["noTelp"]));
		});
	}, [userId, token, dispatch]);

	useEffect(() => {
		history(1, 4, "WEEK", token)
			.then((res) => {
				setUsers(res["data"]["data"]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	const defaultValue = 0;
	const defaultPhoneNumber = "No Phone Number";

	const toTopUpHandler = () => {
		telephoneNumber === null ? router.push("/profile/update-phone") : setIsTopUpActive(true);
	};

	const topUpCloseHandler = () => {
		setIsTopUpActive(false);
	};

	const onAmountChange = (e) => {
		setAmount(e.target.value);
	};

	const topUpHandler = (e) => {
		e.preventDefault();

		toast.promise(topUp(amount, token), {
			pending: "Please wait...",
			success: {
				render({ data }) {
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
					return data["response"]["data"]["msg"];
				},
			},
		});
	};

	return (
		<>
			<PrivateRoute>
				<Layout title={"Home"}>
					<Header />
					{isLoading && <Loader />}
					<div className="container">
						<div className="flex gap-x-6 pb-32 pt-56 px-5 md:px-28">
							{/* left side start */}
							<Sidebar />
							{/* left side end */}
							{/* right side start */}
							<section className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-6">
								<section className="top bg-fazzpay-primary flex items-center justify-between p-10 rounded-[20px]">
									<div className="left">
										<p className="text-[#E0E0E0] text-lg">Balance</p>
										<p className="text-fazzpay-secondary text-[2.5rem] font-bold">{`Rp${
											balance
												? balance.toLocaleString("id-ID")
												: defaultValue.toLocaleString("id-ID")
										}`}</p>
										<p className="text-[#DFDCDC] text-sm font-semibold">
											{phoneNumber ? phoneNumber : defaultPhoneNumber}
										</p>
									</div>
									<div className="right hidden lg:flex flex-col w-1/6 gap-y-4">
										<button
											onClick={() => router.push("/transfer")}
											className="transfer btn normal-case bg-[#8294f6] border-fazzpay-secondary hover:bg-fazzpay-primary/70 hover:border-[#B5B0ED]"
										>
											<div className="flex items-center gap-x-4">
												<svg
													width="28"
													height="28"
													viewBox="0 0 28 28"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													className="stroke-[#B5B0ED]"
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
												<p className="text-fazzpay-secondary font-bold text-lg">Transfer</p>
											</div>
										</button>
										<button
											onClick={() => toTopUpHandler()}
											className="top-up btn normal-case bg-[#8294f6] border-fazzpay-secondary hover:bg-fazzpay-primary/70 hover:border-[#B5B0ED]"
										>
											<div className="flex items-center gap-x-4">
												<svg
													width="28"
													height="28"
													viewBox="0 0 28 28"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													className="stroke-[#B5B0ED]"
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
												<p className="text-fazzpay-secondary font-bold text-lg">Top Up</p>
											</div>
										</button>
									</div>
								</section>
								<div className="buttons lg:hidden flex justify-between w-full h-20">
									<button
										onClick={() => router.push("/transfer")}
										className="transfer w-[47%] h-full btn normal-case bg-[#8294f6] border-fazzpay-secondary hover:bg-fazzpay-primary/70 hover:border-[#B5B0ED]"
									>
										<div className="flex items-center gap-x-4">
											<svg
												width="28"
												height="28"
												viewBox="0 0 28 28"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className="stroke-[#B5B0ED]"
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
											<p className="text-fazzpay-secondary font-bold text-lg">Transfer</p>
										</div>
									</button>
									<button
										onClick={() => toTopUpHandler()}
										className="top-up w-[47%] h-full btn normal-case bg-[#8294f6] border-fazzpay-secondary hover:bg-fazzpay-primary/70 hover:border-[#B5B0ED]"
									>
										<div className="flex items-center gap-x-4">
											<svg
												width="28"
												height="28"
												viewBox="0 0 28 28"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className="stroke-[#B5B0ED]"
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
											<p className="text-fazzpay-secondary font-bold text-lg">Top Up</p>
										</div>
									</button>
								</div>
								<section className="bottom flex gap-x-6 lg:justify-between">
									<div className="left hidden bg-fazzpay-secondary rounded-[25px] shadow-[0px_4px_20px_rgba(0,0,0,0.5)] w-4/6 p-10 lg:flex flex-col gap-y-10">
										<div className="top-side flex justify-between">
											<div className="left-side">
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
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M22.1667 14.0003L14 22.167L5.83333 14.0003"
														stroke="#1EC15F"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												<p className="text-[#6A6A6A] text-sm">Income</p>
												<p className="text-fazzpay-dark text-lg font-bold">{`Rp${
													totalIncome
														? totalIncome.toLocaleString("id-ID")
														: defaultValue.toLocaleString("id-ID")
												}`}</p>
											</div>
											<div className="right-side">
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
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M5.83334 13.9997L14 5.83301L22.1667 13.9997"
														stroke="#FF5B37"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												<p className="text-[#6A6A6A] text-sm">Expense</p>
												<p className="text-fazzpay-dark text-lg font-bold">{`Rp${
													totalExpense
														? totalExpense.toLocaleString("id-ID")
														: defaultValue.toLocaleString("id-ID")
												}`}</p>
											</div>
										</div>
										<div className="bottom-side flex justify-center">
											<Chart />
										</div>
									</div>
									<div className="right w-full lg:w-2/6 bg-fazzpay-secondary rounded-[25px] shadow-[0px_4px_20px_rgba(0,0,0,0.5)] md:p-5 p-3 flex flex-col gap-y-10">
										<div className="title flex items-center justify-between">
											<p className="font-bold text-lg text-fazzpay-dark">Transaction History</p>
											<p
												onClick={() => router.push("/home/history")}
												className="font-semibold text-sm text-fazzpay-primary cursor-pointer"
											>
												See all
											</p>
										</div>
										{users.length === 0 ? (
											<div className="content-wrapper h-1/2 flex justify-center items-center">
												<p className="text-3xl font-bold">No Transaction Yet</p>
											</div>
										) : (
											<div className="content-wrapper flex flex-col gap-y-8">
												{users.map((user, idx) => {
													return (
														<div key={idx} className="flex items-center justify-between">
															<div className="flex items-center gap-x-5">
																<div>
																	<Image
																		alt="user"
																		height={56}
																		width={56}
																		src={
																			user.image
																				? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${user.image}`
																				: defaultProfile
																		}
																		className="rounded-md h-auto w-auto"
																	/>
																</div>
																<div>
																	<p className="text-[#4D4B57] font-bold">{`${user.firstName} ${user.lastName}`}</p>
																	<p className="text-[#7A7886] text-sm capitalize">{user.type}</p>
																</div>
															</div>
															<p
																className={`${
																	user.type !== "send" ? "text-[#1EC15F]" : "text-fazzpay-error"
																} font-bold text-lg`}
															>{`${user.type !== "send" ? "+" : "-"}Rp${user.amount.toLocaleString(
																"id-ID"
															)}`}</p>
														</div>
													);
												})}
											</div>
										)}
									</div>
								</section>
							</section>
							{/* right side end */}
						</div>
						<Dialog
							open={isTopUpActive}
							onClose={topUpCloseHandler}
							className="fixed z-10 bg-black/70 inset-0 overflow-y-auto"
						>
							<div className="flex items-center justify-center min-h-screen px-4 md:px-0">
								<div className="bg-fazzpay-secondary w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg z-20">
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
								</div>
							</div>
						</Dialog>
					</div>
					<Footer />
				</Layout>
			</PrivateRoute>
		</>
	);
}
