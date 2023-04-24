import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { getDataById } from "@/utils/https/user";
import { PhoneCheck } from "@/utils/wrapper/phoneCheck";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";

import defaultProfile from "@/assets/img/profile-placeholder.webp";

export default function SuccesTransfer() {
	const router = useRouter();

	const amount = useSelector((state) => state.transaction.amount);
	const notes = useSelector((state) => state.transaction.notes);
	const time = useSelector((state) => state.transaction.time);
	const userId = useSelector((state) => state.transaction.receiverId);

	const token = useSelector((state) => state.auth.data.token);
	const id = useSelector((state) => state.auth.data.id);

	const [balance, setBalance] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getDataById(userId, token)
			.then((res) => {
				setFirstName(res["data"]["data"]["firstName"]);
				setLastName(res["data"]["data"]["lastName"]);
				setPhoneNumber(res["data"]["data"]["noTelp"]);
				setImage(res["data"]["data"]["image"]);
			})
			.catch((err) => {
				console.log(err);
			}).finally(() => setIsLoading(false));
	}, [userId, token]);

	useEffect(() => {
		getDataById(id, token).then((res) => {
			setBalance(res["data"]["data"]["balance"]);
		});
	}, [id, token]);

	const details = [
		{
			title: "Amount",
			content: `Rp${amount.toLocaleString("id-ID")}`,
		},
		{
			title: "Balance Left",
			content: `Rp${balance.toLocaleString("id-ID")}`,
		},
		{
			title: "Date & Time",
			content: time,
		},
		{
			title: "Notes",
			content: notes,
		},
	];

	return (
		<>
			<PrivateRoute>
				<PhoneCheck>
					<Layout title={"Transfer Success"}>
						<Header />
						{isLoading && <Loader />}
						<div className="container">
							<div className="flex gap-x-6 pb-32 pt-56 px-5 md:px-28">
								<Sidebar />
								<div className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-6 py-5 px-10 bg-white rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.5)]">
									<div className="top flex justify-center">
										<div className="flex flex-col items-center">
											<i className="bi bi-check-circle-fill text-[#1EC15F] text-[4.375rem]"></i>
											<p className="font-bold text-[#4D4B57] text-[1.375rem]">Transfer Success</p>
										</div>
									</div>
									<div className="bottom">
										<div className="flex flex-col gap-y-10">
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
																	{detail.content}
																</p>
															</div>
														</div>
													);
												})}
											</div>
											<div className="flex flex-col gap-y-5">
												<div>
													<p className="font-bold text-lg text-fazzpay-dark">Transfer to</p>
												</div>
												<div className="flex items-center gap-x-5 bg-fazzpay-secondary shadow-[0px_4px_20px_rgba(0,0,0,0.2)] p-3 rounded-[10px]">
													<div className="relative h-[70px] w-[70px]">
														<Image
															alt="user profile"
															fill={true}
															src={
																image
																	? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${image}`
																	: defaultProfile
															}
															sizes="70px"
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
											</div>
											<div className="flex justify-end gap-x-5">
												<button className="btn normal-case border-transparent w-1/4 bg-fazzpay-primary/20 text-fazzpay-primary hover:bg-fazzpay-secondary hover:text-fazzpay-primary flex gap-x-3">
													<i className="bi bi-download"></i>
													<p>Download PDF</p>
												</button>
												<button
													onClick={() => router.push("/home")}
													className="btn normal-case border-transparent w-1/6 bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary"
												>
													Back to Home
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Footer />
					</Layout>
				</PhoneCheck>
			</PrivateRoute>
		</>
	);
}
