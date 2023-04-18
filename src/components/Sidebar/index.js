export default function Sidebar() {
	return (
		<section className="nav-sidebar hidden lg:w-1/4 font-nunitoSans lg:grid grid-rows-2 bg-fazzpay-secondary rounded-[25px] shadow-[0px_4px_20px_rgba(0,0,0,0.5)] py-10 ">
			{/* //TODO: If tabs are active the style same as the hovered one */}
			<section className="top flex flex-col gap-y-10">
				<div className="dashboard flex gap-x-5 items-center cursor-pointer text-fazzpay-dark/80 hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary">
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
				<div className="transfer flex gap-x-5 items-center cursor-pointer text-fazzpay-dark/80 hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary">
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
				<div className="top-up flex gap-x-5 items-center cursor-pointer text-fazzpay-dark/80 hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary">
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
				<div className="profile flex gap-x-5 items-center cursor-pointer text-fazzpay-dark/80 hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary">
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
				<div className="logout flex gap-x-5 items center cursor-pointer text-fazzpay-dark/80 hover:text-fazzpay-primary hover:font-bold hover:border-l-[5px] hover:border-l-fazzpay-primary">
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
		</section>
	);
}