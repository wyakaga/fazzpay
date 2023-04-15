import AuthLeft from "@/components/AuthLeft";

export default function CreatePin() {
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
							{/* //TODO: if filled the bottom border inside input will be none and the border of the input will be fazzpay-primary */}
							<div
								className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center border-fazzpay-accent border border-solid rounded-lg`}
							>
								<input
									type="text"
									name="pin1"
									maxLength={1}
									className={`w-3/4 h-3/4 text-center outline-none border-b border-solid border-b-fazzpay-accent text-base md:text-3xl font-bold`}
								/>
							</div>
							<div
								className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center border-fazzpay-accent border border-solid rounded-lg`}
							>
								<input
									type="text"
									name="pin2"
									maxLength={1}
									className={`w-3/4 h-3/4 text-center outline-none border-b border-solid border-b-fazzpay-accent text-base md:text-3xl font-bold`}
								/>
							</div>
							<div
								className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center border-fazzpay-accent border border-solid rounded-lg`}
							>
								<input
									type="text"
									name="pin3"
									maxLength={1}
									className={`w-3/4 h-3/4 text-center outline-none border-b border-solid border-b-fazzpay-accent text-base md:text-3xl font-bold`}
								/>
							</div>
							<div
								className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center border-fazzpay-accent border border-solid rounded-lg`}
							>
								<input
									type="text"
									name="pin4"
									maxLength={1}
									className={`w-3/4 h-3/4 text-center outline-none border-b border-solid border-b-fazzpay-accent text-base md:text-3xl font-bold`}
								/>
							</div>
							<div
								className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center border-fazzpay-accent border border-solid rounded-lg`}
							>
								<input
									type="text"
									name="pin5"
									maxLength={1}
									className={`w-3/4 h-3/4 text-center outline-none border-b border-solid border-b-fazzpay-accent text-base md:text-3xl font-bold`}
								/>
							</div>
							<div
								className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center border-fazzpay-accent border border-solid rounded-lg`}
							>
								<input
									type="text"
									name="pin6"
									maxLength={1}
									className={`w-3/4 h-3/4 text-center outline-none border-b border-solid border-b-fazzpay-accent text-base md:text-3xl font-bold`}
								/>
							</div>
						</div>
						<div className="confirm-button pt-10">
							{/* //TODO: if all input fields are filled then the text became fazzpay-secondary and the background became fazzpay-primary */}
							<button className="btn normal-case border-none w-full bg-[#DADADA] text-[#88888F]">
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
