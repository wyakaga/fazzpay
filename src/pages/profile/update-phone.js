import { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { updatePhone } from "@/utils/https/user";
import { userAction } from "@/redux/slices/user";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";
import TokenHandler from "@/utils/wrapper/tokenHandler";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

function ChangePwd() {
	const dispatch = useDispatch();

	const controller = useMemo(() => new AbortController(), []);

	const userId = useSelector((state) => state.auth.data.id);
	const token = useSelector((state) => state.auth.data.token);

	const [phoneNumber, setPhoneNumber] = useState("");

	const fetchUserData = useCallback(() => {
		try {
			dispatch(userAction.getUserThunk({ userId, token, controller }));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, userId, token, controller]);

	const onChangePhone = (e) => {
		setPhoneNumber(e.target.value);
	};

	const changePhoneHandler = (e) => {
		e.preventDefault();

		toast.promise(updatePhone(phoneNumber, userId, token, controller), {
			pending: {
				render() {
					e.target.disabled = true;
					return "Please wait..."
				}
			},
			success: {
				render() {
					e.target.disabled = false;
					setPhoneNumber("");
					fetchUserData();
					return "Phone number successfully changed";
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
		<>
			<PrivateRoute>
				<Layout title={"Edit phone number"}>
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
										<p className="font-bold text-lg text-fazzpay-dark">Edit Phone Number</p>
									</div>
									<div>
										<p className="text-[#7A7886]">
											Add at least one phone number for the transfer <br /> ID so you can start
											transfering your money to <br /> another user.
										</p>
									</div>
								</section>
								<section className="bottom xl:px-40">
									<div className="form-wrapper flex flex-col gap-y-1">
										<form onSubmit={changePhoneHandler} className="flex flex-col gap-y-10">
											<div className="relative w-full ease-in-out transition-all duration-300">
												<input
													type="text"
													placeholder="Enter your phone number"
													name="phoneNumber"
													value={phoneNumber}
													onChange={onChangePhone}
													className={`placeholder:text-[#A9A9A9CC] text-fazzpay-dark border-b-[1.5px] ${
														phoneNumber ? "border-fazzpay-primary" : "border-[#A9A9A999]"
													} hover:border-gray-400 focus:outline-none appearance-none bg-transparent rounded-none h-10 pl-20 w-full`}
												/>
												<div className="absolute top-[6px] h-6 flex gap-x-3 items-center">
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className={`${
															phoneNumber ? "stroke-fazzpay-primary" : "stroke-[#A9A9A9CC]"
														}`}
													>
														<path
															d="M21.9994 16.9201V19.9201C22.0006 20.1986 21.9435 20.4743 21.832 20.7294C21.7204 20.9846 21.5567 21.2137 21.3515 21.402C21.1463 21.5902 20.904 21.7336 20.6402 21.8228C20.3764 21.912 20.0968 21.9452 19.8194 21.9201C16.7423 21.5857 13.7864 20.5342 11.1894 18.8501C8.77327 17.3148 6.72478 15.2663 5.18945 12.8501C3.49942 10.2413 2.44769 7.27109 2.11944 4.1801C2.09446 3.90356 2.12732 3.62486 2.21595 3.36172C2.30457 3.09859 2.44702 2.85679 2.63421 2.65172C2.82141 2.44665 3.04925 2.28281 3.30324 2.17062C3.55722 2.05843 3.83179 2.00036 4.10945 2.0001H7.10945C7.59475 1.99532 8.06524 2.16718 8.43321 2.48363C8.80118 2.80008 9.04152 3.23954 9.10944 3.7201C9.23607 4.68016 9.47089 5.62282 9.80945 6.5301C9.94399 6.88802 9.97311 7.27701 9.89335 7.65098C9.8136 8.02494 9.62831 8.36821 9.35944 8.6401L8.08945 9.9101C9.513 12.4136 11.5859 14.4865 14.0894 15.9101L15.3594 14.6401C15.6313 14.3712 15.9746 14.1859 16.3486 14.1062C16.7225 14.0264 17.1115 14.0556 17.4694 14.1901C18.3767 14.5286 19.3194 14.7635 20.2794 14.8901C20.7652 14.9586 21.2088 15.2033 21.526 15.5776C21.8431 15.9519 22.0116 16.4297 21.9994 16.9201Z"
															strokeOpacity="0.6"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
													<p className="font-semibold text-[#3A3D42]">+62</p>
												</div>
											</div>
											<div className="updatePhone-button">
												<button
													disabled={!phoneNumber}
													onClick={changePhoneHandler}
													className="btn normal-case border-transparent w-full bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary disabled:bg-[#DADADA] disabled:text-[#88888F]"
												>
													Edit Phone Number
												</button>
											</div>
										</form>
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

export default TokenHandler(ChangePwd);
