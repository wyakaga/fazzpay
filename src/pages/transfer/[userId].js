import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

import { getDataById, checkPin } from "@/utils/https/user";
import { transfer } from "@/utils/https/transaction";
import { transactionAction } from "@/redux/slices/transaction";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

import defaultProfile from "@/assets/img/profile-placeholder.webp";

export default function TransferDetail() {
	const router = useRouter();
	const dispatch = useDispatch();

	const userId = router.query.userId;

	const token = useSelector((state) => state.auth.data.token);
	const id = useSelector((state) => state.auth.data.id);

	const persistedAmount = useSelector((state) => state.transaction.amount);
	const persistedNotes = useSelector((state) => state.transaction.notes);

	const now = DateTime.now().toFormat("MMMM dd, yyyy - HH.mm");

	const [balance, setBalance] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [image, setImage] = useState(null);
	const [amount, setAmount] = useState("");
	const [notes, setNotes] = useState("");
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [isModalPin, setIsModalPin] = useState(false);
	const [pins, setPins] = useState({ pin1: "", pin2: "", pin3: "", pin4: "", pin5: "", pin6: "" });

	console.log(userId);

	useEffect(() => {
		getDataById(userId, token)
			.then((res) => {
				setFirstName(res["data"]["data"]["firstName"]);
				setLastName(res["data"]["data"]["lastName"]);
				setPhoneNumber(res["data"]["data"]["noTelp"]);
				setImage(res["data"]["data"]["image"]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [userId, token]);

	useEffect(() => {
		getDataById(id, token).then((res) => {
			setBalance(res["data"]["data"]["balance"]);
		});
	}, [id, token]);

	const onAmountChange = (e) => {
		const value = e.target.value.replace(/^Rp/, "");
		if (value === "") {
			setAmount("");
		} else {
			const newValue = parseInt(value.replace(/\D/g, ""));
			if (!isNaN(newValue)) {
				const formattedValue = `Rp${newValue.toLocaleString("id-ID")}`;
				setAmount(formattedValue);
			}
		}
	};

	const onNotesChange = (e) => {
		setNotes(e.target.value);
	};

	const clickHandler = (e) => {
		e.preventDefault();

		const parsedAmount = Number(amount.replace(/^Rp/, "").replace(/\./g, ""));

		if (amount) dispatch(transactionAction.saveAmount(parsedAmount));
		if (notes) dispatch(transactionAction.saveNotes(notes));

		setIsConfirmed(true);
	};

	const closeModalHandler = () => {
		setIsModalPin(false);
		setPins({ pin1: "", pin2: "", pin3: "", pin4: "", pin5: "", pin6: "" });
	};

	const onChangePin = (e) => {
		setPins((pins) => {
			return { ...pins, [e.target.name]: e.target.value };
		});
	};

	const transferHandler = (e) => {
		e.preventDefault();

		let arrayPin = Object.keys(pins).map((key) => pins[key]);
		const intPin = parseInt(arrayPin.join(""));

		toast.promise(checkPin(intPin, token), {
			pending: "Please wait...",
			success: {
				render() {
					setPins({ pin1: "", pin2: "", pin3: "", pin4: "", pin5: "", pin6: "" });
					transfer(userId, persistedAmount, persistedNotes, token)
						.then(() => {
							dispatch(transactionAction.saveTime(now));
							dispatch(transactionAction.saveId(userId));
							router.push("/transfer/success");
						})
						.catch((err) => {
							console.log(err);
							router.push("/transfer/failed");
						});
					return "Pin is valid";
				},
			},
			error: {
				render({ data }) {
					return data["response"]["data"]["msg"];
				},
			},
		});
	};

	const details = [
		{
			title: "Amount",
			content: persistedAmount,
		},
		{
			title: "Balance Left",
			content: balance,
		},
		{
			title: "Date & Time",
			content: now,
		},
		{
			title: "Notes",
			content: persistedNotes,
		},
	];

	return (
		<>
			<Layout
				title={isConfirmed === true ? "Confirm Transfer" : `Transfer to ${firstName} ${lastName}`}
			>
				<Header />
				<div className="container">
					<div className="flex gap-x-6 py-32 px-5 md:px-28">
						<Sidebar />
						<div className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-6 py-5 px-10 bg-white rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.5)]">
							<section className="top flex flex-col gap-y-5">
								<div>
									<p className="font-bold text-lg text-fazzpay-dark">
										{isConfirmed === true ? "Transfer to" : "Transfer Money"}
									</p>
								</div>
								<div className="flex items-center gap-x-5 bg-fazzpay-secondary shadow-[0px_4px_20px_rgba(0,0,0,0.2)] p-3 rounded-[10px]">
									<div className="relative h-[70px] w-[70px]">
										<Image
											alt="user profile"
											fill={true}
											src={
												image ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${image}` : defaultProfile
											}
											className="rounded-md"
										/>
									</div>
									<div className="flex flex-col gap-y-3">
										<p className="font-bold text-lg text-[#4D4B57]">{`${firstName} ${lastName}`}</p>
										<p className="text-[#7A7886]">
											{phoneNumber ? phoneNumber : "No Phone Number"}
										</p>
									</div>
								</div>
							</section>
							{isConfirmed === true ? (
								<section className="bottom flex flex-col gap-y-10">
									<div>
										<p className="font-bold text-lg text-fazzpay-dark">Details</p>
									</div>
									<div className="flex flex-col gap-y-5">
										{details.map((detail, index) => {
											return (
												<div
													key={index}
													className="flex flex-col gap-y-3 bg-fazzpay-secondary shadow-[0px_4px_20px_rgba(0,0,0,0.2)] p-3 rounded-[10px]"
												>
													<div>
														<p className="text-[#7A7886]">{detail.title}</p>
													</div>
													<div>
														<p className="font-bold text-[#514F5B] text-2xl">
															{detail.title === "Balance Left" || detail.title === "Amount"
																? `Rp${detail.content.toLocaleString("id-ID")}`
																: detail.content}
														</p>
													</div>
												</div>
											);
										})}
									</div>
									<div className="flex justify-end">
										<button
											onClick={() => setIsModalPin(true)}
											className="btn normal-case border-transparent w-1/6 bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary"
										>
											Continue
										</button>
									</div>
								</section>
							) : (
								<section className="bottom flex flex-col gap-y-10">
									<div>
										<p className="text-[#7A7886]">
											Type the amount you want to transfer and then <br /> press continue to the
											next steps.
										</p>
									</div>
									<div>
										<input
											type="text"
											placeholder="0.00"
											onChange={onAmountChange}
											value={amount}
											className="text-[2.625rem] text-center text-fazzpay-primary font-bold placeholder:text-center placeholder:text-[#B5BDCC] placeholder:font-bold focus:outline-none appearance-none bg-transparent rounded-none w-full"
										/>
									</div>
									<div>
										<p className="text-fazzpay-dark font-bold text-center">{`Rp${balance.toLocaleString(
											"id-ID"
										)} Available`}</p>
									</div>
									<div className="px-60">
										<div className="relative">
											<svg
												width="11"
												height="11"
												viewBox="0 0 11 11"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className={`absolute top-[10px] ${
													notes ? "stroke-fazzpay-primary" : "stroke-[#A9A9A999]"
												} h-[19.83px] w-[19.83px]`}
											>
												<g clip-path="url(#clip0_63_384)">
													<path
														d="M7.79199 1.37481C7.91237 1.25443 8.05528 1.15895 8.21256 1.0938C8.36984 1.02865 8.53842 0.995117 8.70866 0.995117C8.8789 0.995117 9.04747 1.02865 9.20475 1.0938C9.36204 1.15895 9.50495 1.25443 9.62533 1.37481C9.7457 1.49519 9.84119 1.6381 9.90634 1.79538C9.97149 1.95267 10.005 2.12124 10.005 2.29148C10.005 2.46172 9.97149 2.63029 9.90634 2.78758C9.84119 2.94486 9.7457 3.08777 9.62533 3.20815L3.43783 9.39565L0.916992 10.0831L1.60449 7.56231L7.79199 1.37481Z"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</g>
												<defs>
													<clipPath id="clip0_63_384">
														<rect width="11" height="11" fill="white" />
													</clipPath>
												</defs>
											</svg>
											<input
												type="text"
												placeholder="Add some notes"
												value={notes}
												onChange={onNotesChange}
												className={`placeholder:text-[#A9A9A9CC] text-fazzpay-dark border-b-[1.5px] ${
													notes ? "border-fazzpay-primary" : "border-[#A9A9A999]"
												} hover:border-gray-400 focus:outline-none appearance-none bg-transparent rounded-none h-10 pl-10 w-full`}
											/>
										</div>
									</div>
									<div className="flex justify-end">
										<button
											onClick={(e) => clickHandler(e)}
											className="btn normal-case border-transparent w-1/6 bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary"
										>
											Continue
										</button>
									</div>
								</section>
							)}
						</div>
					</div>
					<Dialog
						open={isModalPin}
						onClose={closeModalHandler}
						className={`fixed z-10 bg-black/70 inset-0 overflow-y-auto`}
					>
						<div className="flex items-center justify-center min-h-screen px-4 md:px-0">
							<div className="bg-fazzpay-secondary w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg z-20">
								<div className="flex flex-col gap-y-10">
									<div className="flex flex-col gap-y-5">
										<div className="flex items-center justify-between">
											<p className="font-bold text-2xl text-fazzpay-dark">Enter PIN to Transfer</p>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												onClick={() => closeModalHandler()}
												className="bi bi-x-lg h-6 w-6 fill-fazzpay-dark cursor-pointer"
												viewBox="0 0 16 16"
											>
												<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
											</svg>
										</div>
										<p className="text-fazzpay-dark/60">
											Enter your 6 digits PIN for confirmation to <br /> continue transfering money.
										</p>
									</div>
									<div className="flex justify-center items-center gap-3 md:gap-6">
										<div
											className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${
												pins.pin1 ? "border-fazzpay-primary" : "border-fazzpay-accent"
											} border border-solid rounded-lg`}
										>
											<input
												type="text"
												name="pin1"
												value={pins.pin1}
												onChange={onChangePin}
												maxLength={1}
												className={`w-3/4 h-3/4 text-center outline-none border-b border-solid ${
													pins.pin1 ? "border-b-transparent" : "border-b-fazzpay-accent"
												} text-base md:text-3xl font-bold`}
											/>
										</div>
										<div
											className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${
												pins.pin2 ? "border-fazzpay-primary" : "border-fazzpay-accent"
											} border border-solid rounded-lg`}
										>
											<input
												type="text"
												name="pin2"
												value={pins.pin2}
												onChange={onChangePin}
												maxLength={1}
												className={`w-3/4 h-3/4 text-center outline-none border-b border-solid ${
													pins.pin2 ? "border-b-transparent" : "border-b-fazzpay-accent"
												} text-base md:text-3xl font-bold`}
											/>
										</div>
										<div
											className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${
												pins.pin3 ? "border-fazzpay-primary" : "border-fazzpay-accent"
											} border border-solid rounded-lg`}
										>
											<input
												type="text"
												name="pin3"
												value={pins.pin3}
												onChange={onChangePin}
												maxLength={1}
												className={`w-3/4 h-3/4 text-center outline-none border-b border-solid ${
													pins.pin3 ? "border-b-transparent" : "border-b-fazzpay-accent"
												} text-base md:text-3xl font-bold`}
											/>
										</div>
										<div
											className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${
												pins.pin4 ? "border-fazzpay-primary" : "border-fazzpay-accent"
											} border border-solid rounded-lg`}
										>
											<input
												type="text"
												name="pin4"
												value={pins.pin4}
												onChange={onChangePin}
												maxLength={1}
												className={`w-3/4 h-3/4 text-center outline-none border-b border-solid ${
													pins.pin4 ? "border-b-transparent" : "border-b-fazzpay-accent"
												} text-base md:text-3xl font-bold`}
											/>
										</div>
										<div
											className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${
												pins.pin5 ? "border-fazzpay-primary" : "border-fazzpay-accent"
											} border border-solid rounded-lg`}
										>
											<input
												type="text"
												name="pin5"
												value={pins.pin5}
												onChange={onChangePin}
												maxLength={1}
												className={`w-3/4 h-3/4 text-center outline-none border-b border-solid ${
													pins.pin5 ? "border-b-transparent" : "border-b-fazzpay-accent"
												} text-base md:text-3xl font-bold`}
											/>
										</div>
										<div
											className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${
												pins.pin6 ? "border-fazzpay-primary" : "border-fazzpay-accent"
											} border border-solid rounded-lg`}
										>
											<input
												type="text"
												name="pin6"
												value={pins.pin6}
												onChange={onChangePin}
												maxLength={1}
												className={`w-3/4 h-3/4 text-center outline-none border-b border-solid ${
													pins.pin6 ? "border-b-transparent" : "border-b-fazzpay-accent"
												} text-base md:text-3xl font-bold`}
											/>
										</div>
									</div>
									<div className="submit-button pt-10 flex justify-end">
										<button
											onClick={(e) => transferHandler(e)}
											className="btn normal-case w-1/4 border-transparent text-fazzpay-secondary bg-fazzpay-primary hover:text-fazzpay-primary hover:bg-fazzpay-secondary disabled:bg-[#DADADA] disabled:text-[#88888F]"
										>
											Continue
										</button>
									</div>
								</div>
							</div>
						</div>
					</Dialog>
				</div>
				<Footer />
			</Layout>
		</>
	);
}
