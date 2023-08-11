import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { updatePin, checkPin } from "@/utils/https/user";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";
import TokenHandler from "@/utils/wrapper/tokenHandler";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

function ChangePin() {
	const controller = useMemo(() => new AbortController(), []);

	const userId = useSelector((state) => state.auth.data.id);
	const token = useSelector((state) => state.auth.data.token);

	const [pins, setPins] = useState({ pin1: "", pin2: "", pin3: "", pin4: "", pin5: "", pin6: "" });
	const [isPinValid, setIsPinValid] = useState(false);

	let arrayPin = Object.keys(pins).map((key) => pins[key]);
	const intPin = parseInt(arrayPin.join(""));

	const onChangePin = (e) => {
		setPins((pins) => {
			return { ...pins, [e.target.name]: e.target.value };
		});
	};

	const checkPinHandler = (e) => {
		e.preventDefault();

		toast.promise(checkPin(intPin, token, controller), {
			pending: "Please wait...",
			success: {
				render() {
					setIsPinValid(true);
					setPins({ pin1: "", pin2: "", pin3: "", pin4: "", pin5: "", pin6: "" });
					return "Pin is valid";
				},
			},
			error: {
				render({ data }) {
					if (data["response"]) return data["response"]["data"]["msg"];
					return "Something went wrong";
				},
			},
		});
	};

	const createPinHandler = (e) => {
		e.preventDefault();

		toast.promise(updatePin(intPin, userId, token, controller), {
			pending: "Please wait",
			success: {
				render() {
					setIsPinValid(false);
					setPins({ pin1: "", pin2: "", pin3: "", pin4: "", pin5: "", pin6: "" });
					return "Pin successfully changed";
				},
			},
			error: {
				render({ data }) {
					if (data["response"]) return data["response"]["data"]["msg"];
					return "Something went wrong";
				},
			},
		});
	};

	return (
		<>
			<PrivateRoute>
				<Layout title={"Change PIN"}>
					<Header />
					<div className="container">
						<div className="flex gap-x-6 pb-32 pt-56 px-5 md:px-28 bg-[#fafcff]">
							{/* left side start */}
							<Sidebar />
							{/* left side end */}
							{/* right side start */}
							<section className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-28 bg-fazzpay-secondary rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.5)] p-10">
								<section className="top flex flex-col gap-y-4">
									<div>
										<p className="font-bold text-lg text-fazzpay-dark">Change PIN</p>
									</div>
									<div>
										<p className="text-[#7A7886]">
											{isPinValid === true ? (
												<>Type your new 6 digits security PIN to use in Fazzpay.</>
											) : (
												<>
													Enter your current 6 digits Fazzpay PIN below <br /> to continue to the
													next steps.
												</>
											)}
										</p>
									</div>
								</section>
								<section className="bottom xl:px-40">
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
												onClick={isPinValid === true ? createPinHandler : checkPinHandler}
												className="btn normal-case border-transparent w-full bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary disabled:bg-[#DADADA] disabled:text-[#88888F]"
											>
												{isPinValid === true ? "Change PIN" : "Continue"}
											</button>
										</div>
									</div>
								</section>
							</section>
							{/* right side end */}
						</div>
					</div>
					<Footer />
				</Layout>
			</PrivateRoute>
		</>
	);
}

export default TokenHandler(ChangePin);