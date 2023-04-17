import { useState } from "react";
import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { forgotPwd } from "@/utils/https/auth";

import AuthLeft from "@/components/AuthLeft";

export default function ResetPwd() {
	const [email, setEmail] = useState("");

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const forgotPwdHandler = (e) => {
		e.preventDefault();

		toast.promise(forgotPwd(email), {
			pending: "Please wait...",
			success: "Check your email inbox",
			error: {
				render({ data }) {
					return data["response"]["data"]["msg"];
				},
			},
		});
	};

	return (
		<div className="container">
			<div className="flex">
				<AuthLeft />
				<div className="lg:w-5/12 font-nunitoSans p-20 flex flex-col gap-y-20">
					<div className="title lg:hidden flex justify-center">
						<p className="font-bold text-3xl text-fazzpay-primary">FazzPay</p>
					</div>
					<div className="form-title flex flex-col gap-y-10">
						<p className="font-bold text-2xl text-fazzpay-dark">
							Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.
						</p>
						<p className="text-fazzpay-dark/60">
							To reset your password, you must type your e-mail and we will send a link to your
							email and you will be directed to the reset password screens.
						</p>
					</div>
					<div className="form-wrapper flex flex-col gap-y-16">
						<form className="flex flex-col gap-y-10">
							{/* //TODO: when error the icon and input border became fazzpay-error otherwise fazzpay-primary */}
							<div className="relative w-full ease-in-out transition-all duration-300">
								<input
									type="email"
									name="email"
									value={email}
									onChange={onChangeEmail}
									placeholder="Enter your e-mail"
									className={`placeholder:text-[#A9A9A9CC] text-fazzpay-dark border-b-[1.5px] ${
										email ? "border-fazzpay-primary" : "border-[#A9A9A999]"
									} hover:border-gray-400 focus:outline-none appearance-none bg-transparent rounded-none h-10 pl-10 w-full`}
								/>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className={`absolute top-[6px] h-6 ${
										email ? "stroke-fazzpay-primary" : "stroke-[#A9A9A9CC]"
									}`}
								>
									<path
										d="M22 5H2V19H22V5Z"
										strokeOpacity="0.6"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M3 6L12 13L21 6"
										strokeOpacity="0.6"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</form>
						<div className="confirm-button pt-10">
							{/* //TODO: if all input fields are filled then the text became fazzpay-secondary and the background became fazzpay-primary */}
							<button
								disabled={!email}
								onClick={forgotPwdHandler}
								className="btn normal-case border-transparent w-full py-5 bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary disabled:bg-[#DADADA] disabled:text-[#88888F]"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer position="top-right" autoClose={3000} transition={Flip} theme="colored" />
		</div>
	);
}
