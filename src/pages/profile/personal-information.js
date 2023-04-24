import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getDataById } from "@/utils/https/user";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";

export default function PersonalInformation() {
	const userId = useSelector((state) => state.auth.data.id);
	const token = useSelector((state) => state.auth.data.token);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getDataById(userId, token)
			.then((res) => {
				setFirstName(res["data"]["data"]["firstName"]);
				setEmail(res["data"]["data"]["email"]);
				setLastName(res["data"]["data"]["lastName"]);
				setPhoneNumber(res["data"]["data"]["noTelp"]);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [userId, token]);

	return (
		<>
			<PrivateRoute>
				<Layout title={"Your personal information"}>
					<Header />
					{isLoading && <Loader />}
					<div className="container">
						<div className="flex gap-x-6 pb-32 pt-56 px-5 md:px-28 bg-[#fafcff]">
							{/* left side start */}
							<Sidebar />
							{/* left side end */}
							{/* right side start */}
							<section className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-10 bg-fazzpay-secondary rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.5)] p-10">
								<section className="top flex flex-col gap-y-4">
									<div>
										<p className="font-bold text-lg text-fazzpay-dark">Personal Information</p>
									</div>
									<div>
										<p className="text-[#7A7886]">
											We got your personal information from the sign <br /> up process. If you want
											to make changes on <br /> your information, contact our support.
										</p>
									</div>
								</section>
								<section className="bottom flex flex-col justify-between gap-y-8 ">
									<div className="flex flex-col bg-fazzpay-secondary rounded-[0.625rem] py-2 px-6 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] gap-y-2">
										<p className="text-[#7A7886]">First Name</p>
										<p className="font-bold text-[1.375rem] text-[#514F5B]">
											{firstName ? firstName : "Anonymous"}
										</p>
									</div>
									<div className="flex flex-col bg-fazzpay-secondary rounded-[0.625rem] py-2 px-6 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] gap-y-2">
										<p className="text-[#7A7886]">Last Name</p>
										<p className="font-bold text-[1.375rem] text-[#514F5B]">
											{lastName ? lastName : "Anonymous"}
										</p>
									</div>
									<div className="flex flex-col bg-fazzpay-secondary rounded-[0.625rem] py-2 px-6 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] gap-y-2">
										<p className="text-[#7A7886]">Verified E-mail</p>
										<p className="font-bold text-[1.375rem] text-[#7A7886]">
											{email ? email : "anon@anon.com"}
										</p>
									</div>
									<div className="flex items-center justify-between bg-fazzpay-secondary rounded-[0.625rem] py-2 px-6 shadow-[0px_4px_20px_rgba(0,0,0,0.3)]">
										<div className="flex flex-col gap-y-2">
											<p className="text-[#7A7886]">Phone Number</p>
											<p className="font-bold text-[1.375rem] text-[#514F5B]">
												{phoneNumber ? phoneNumber : "No Phone Number"}
											</p>
										</div>
										<div>
											<Link
												href={"/profile/update-phone"}
												className="font-semibold text-fazzpay-primary cursor-pointer"
											>
												Manage
											</Link>
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
