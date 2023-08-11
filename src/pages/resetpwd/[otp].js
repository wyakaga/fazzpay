import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

import { resetPwd } from "@/utils/https/auth";
import { PublicRoute } from "@/utils/wrapper/publicRoute";
import TokenHandler from "@/utils/wrapper/tokenHandler";

import AuthLeft from "@/components/AuthLeft";
import Layout from "@/components/Layout";

function NewPwd() {
	const { query } = useRouter();
	const router = useRouter();

	const otp = query.otp;

	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const onChangeNewPwd = (e) => {
		setNewPassword(e.target.value);
	};

	const onChangeConfirmPwd = (e) => {
		setConfirmPassword(e.target.value);
	};

	const resetPwdHandler = (e) => {
		e.preventDefault();

		toast.promise(resetPwd(otp, newPassword, confirmPassword), {
			pending: "Please wait...",
			success: {
				render() {
					router.push("/login");
					return "Succesfully change password";
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
		<PublicRoute>
			<Layout title={"Create New Password"}>
				<div className="container">
					<div className="flex">
						<AuthLeft />
						<div className="lg:w-5/12 font-nunitoSans p-20 flex flex-col gap-y-20">
							<div className="title lg:hidden flex justify-center">
								<p className="font-bold text-3xl text-fazzpay-primary">FazzPay</p>
							</div>
							<div className="form-title flex flex-col gap-y-10">
								<p className="font-bold text-2xl leading-relaxed text-fazzpay-dark">
									Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a
									Minutes.
								</p>
								<p className="text-fazzpay-dark/60 leading-relaxed">
									Now you can create a new password for your FazzPay account. Type your password
									twice so we can confirm your new passsword.
								</p>
							</div>
							<div className="form-wrapper flex flex-col gap-y-20">
								<form className="flex flex-col gap-y-10">
									<div className="relative w-full ease-in-out transition-all duration-300">
										<input
											type={visible1 ? "text" : "password"}
											placeholder="Create new password"
											name="newPassword"
											value={newPassword}
											onChange={onChangeNewPwd}
											className={`placeholder:text-[#A9A9A9CC] text-fazzpay-dark border-b-[1.5px] ${
												newPassword ? "border-fazzpay-primary" : "border-[#A9A9A999]"
											} hover:border-gray-400 focus:outline-none appearance-none bg-transparent rounded-none h-10 pl-10 w-full`}
										/>
										{visible1 ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="bi bi-eye-slash fill-[#A9A9A9CC] cursor-pointer h-6 w-6 absolute top-[6px] right-[10px]"
												viewBox="0 0 16 16"
												onClick={() => setVisible1(!visible1)}
											>
												<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
												<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
												<path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="bi bi-eye fill-[#A9A9A9CC] cursor-pointer h-6 w-6 absolute top-[6px] right-[10px]"
												viewBox="0 0 16 16"
												onClick={() => setVisible1(!visible1)}
											>
												<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
												<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
											</svg>
										)}
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={`absolute top-[6px] h-6 ${
												newPassword ? "stroke-fazzpay-primary" : "stroke-[#A9A9A9CC]"
											}`}
										>
											<path
												d="M19 11H5V21H19V11Z"
												strokeOpacity="0.6"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9"
												strokeOpacity="0.6"
												strokeWidth="2"
												strokeLinecap="square"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<div className="relative w-full ease-in-out transition-all duration-300">
										<input
											type={visible2 ? "text" : "password"}
											placeholder="Create new password"
											name="confirmPassword"
											value={confirmPassword}
											onChange={onChangeConfirmPwd}
											className={`placeholder:text-[#A9A9A9CC] text-fazzpay-dark border-b-[1.5px] ${
												confirmPassword ? "border-fazzpay-primary" : "border-[#A9A9A999]"
											} hover:border-gray-400 focus:outline-none appearance-none bg-transparent rounded-none h-10 pl-10 w-full`}
										/>
										{visible2 ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="bi bi-eye-slash fill-[#A9A9A9CC] cursor-pointer h-6 w-6 absolute top-[6px] right-[10px]"
												viewBox="0 0 16 16"
												onClick={() => setVisible2(!visible2)}
											>
												<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
												<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
												<path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="bi bi-eye fill-[#A9A9A9CC] cursor-pointer h-6 w-6 absolute top-[6px] right-[10px]"
												viewBox="0 0 16 16"
												onClick={() => setVisible2(!visible2)}
											>
												<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
												<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
											</svg>
										)}
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={`absolute top-[6px] h-6 ${
												confirmPassword ? "stroke-fazzpay-primary" : "stroke-[#A9A9A9CC]"
											}`}
										>
											<path
												d="M19 11H5V21H19V11Z"
												strokeOpacity="0.6"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9"
												strokeOpacity="0.6"
												strokeWidth="2"
												strokeLinecap="square"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								</form>
								<div className="resetpwd-button pt-10">
									<button
										disabled={!newPassword || !confirmPassword}
										onClick={resetPwdHandler}
										className="btn normal-case border-transparent w-full bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary disabled:bg-[#DADADA] disabled:text-[#88888F]"
									>
										Reset Password
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</PublicRoute>
	);
}

export default TokenHandler(NewPwd);
