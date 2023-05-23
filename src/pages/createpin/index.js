import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { updatePin } from "@/utils/https/user";
import { authAction } from "@/redux/slices/auth";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";

import AuthLeft from "@/components/AuthLeft";
import Layout from "@/components/Layout";

export default function CreatePin() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [pins, setPins] = useState({ pin1: "", pin2: "", pin3: "", pin4: "", pin5: "", pin6: "" });

	const userId = useSelector((state) => state.auth.data.id);
	const token = useSelector((state) => state.auth.data.token);

	const onChangePin = (e) => {
		setPins((pins) => {
			return { ...pins, [e.target.name]: e.target.value };
		});
	};

	const createPinHandler = (e) => {
		e.preventDefault();

		let arrayPin = Object.keys(pins).map((key) => pins[key]);
		const intPin = parseInt(arrayPin.join(""));

		toast.promise(updatePin(intPin, userId, token), {
			pending: "Please wait",
			success: {
				render() {
					router.push("/");
					dispatch(authAction.remove());
					return "Succesfully created pin, please login again";
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
		<PrivateRoute>
			<Layout title={"Create PIN"}>
				<div className="container">
					<div className="flex">
						<AuthLeft />
						<div className="lg:w-5/12 font-nunitoSans p-20 flex flex-col gap-y-20">
							<div className="title lg:hidden flex justify-center">
								<p className="font-bold text-3xl text-fazzpay-primary">FazzPay</p>
							</div>
							<div className="form-title flex flex-col gap-y-10">
								<p className="font-bold text-2xl text-fazzpay-dark">
									Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created
									Yourself.
								</p>
								<p className="text-fazzpay-dark/60">
									Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it
									secret and don’t tell anyone about your FazzPay account password and the PIN.
								</p>
							</div>
							<div className="form-wrapper flex flex-col gap-y-20">
								<div className="flex justify-center items-center gap-3 md:gap-6">
									<div
										className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${
											pins.pin1 ? "border-fazzpay-primary" : "border-fazzpay-accent"
										} border border-solid rounded-lg`}
									>
										<input
											type="password"
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
											type="password"
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
											type="password"
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
											type="password"
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
											type="password"
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
											type="password"
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
								<div className="confirm-button pt-10">
									<button
										disabled={
											!pins.pin1 ||
											!pins.pin2 ||
											!pins.pin3 ||
											!pins.pin4 ||
											!pins.pin5 ||
											!pins.pin6
										}
										onClick={createPinHandler}
										className="btn normal-case border-transparent w-full bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary disabled:bg-[#DADADA] disabled:text-[#88888F]"
									>
										Confirm
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</PrivateRoute>
	);
}
