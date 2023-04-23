import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

import { getDataById, updateName, updateImage, deleteImage } from "@/utils/https/user";
import { logout } from "@/utils/https/auth";
import { authAction } from "@/redux/slices/auth";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Layout from "@/components/Layout";

import defaultPic from "@/assets/img/profile-placeholder.webp";

export default function Profile() {
	const router = useRouter();
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.auth.data.id);
	const token = useSelector((state) => state.auth.data.token);

	const [data, setData] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [form, setForm] = useState({ firstName: "", lastName: "" });

	useEffect(() => {
		getDataById(userId, token).then((res) => {
			setData(res["data"]["data"]);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const modalOpenHandler = (e) => {
		e.preventDefault();

		setIsModalOpen(true);
	};

	const modalCloseHandler = () => {
		setIsModalOpen(false);
		setFirstName("");
		setLastName("");
	};

	const dialogOpenHandler = (e) => {
		e.preventDefault();

		setIsDialogOpen(true);
	};

	const dialogCloseHandler = () => {
		setIsDialogOpen(false);
	};

	const onImageUpload = (e) => {
		e.preventDefault();

		const file = e.target.files[0];
		setImage(file);
		setImagePreview(URL.createObjectURL(file));
	};

	const updateImageHandler = (e) => {
		e.preventDefault();

		const body = new FormData();
		body.append("image", image);

		toast.promise(updateImage(body, userId, token), {
			pending: "Please wait...",
			success: {
				render() {
					setIsModalOpen(false);
					router.reload();
					return "Image successfully updated";
				},
			},
			error: {
				render({ data }) {
					return data["response"]["data"]["msg"];
				},
			},
		});
	};

	const deleteImageHandler = (e) => {
		e.preventDefault();

		toast.promise(deleteImage(userId, token), {
			pending: "Please wait...",
			success: {
				render() {
					setImage(null);
					setImagePreview(null);
					setIsModalOpen(false);
					router.reload();

					return "Image succesfully deleted";
				},
			},
			error: {
				render({ data }) {
					return data["response"]["data"]["msg"];
				},
			},
		});
	};

	const onChangeForm = (e) => {
		setForm((form) => {
			return { ...form, [e.target.name]: e.target.value };
		});
	};

	const updateNameHandler = (e) => {
		e.preventDefault();

		toast.promise(updateName(form, userId, token), {
			pending: "Please wait...",
			success: {
				render() {
					setIsModalOpen(false);
					router.reload();
					return "Name succesfully changed";
				},
			},
			error: {
				render({ data }) {
					return data["response"]["data"]["msg"];
				},
			},
		});
	};

	const logoutHandler = (e) => {
		e.preventDefault();

		toast.promise(logout(token), {
			pending: "Please wait...",
			success: {
				render() {
					router.push("/");
					dispatch(authAction.remove());
					return "Succesfully logged out";
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
		<>
			<Layout title={"Your profile"}>
				<Header />
				<div className="container">
					<div className="flex gap-x-6 py-40 px-5 md:px-28 bg-[#fafcff]">
						{/* left side start */}
						<Sidebar />
						{/* left side end */}
						{/* right side start */}
						<section className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-6 bg-fazzpay-secondary rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.5)] p-10">
							<section className="top flex flex-col justify-center items-center gap-y-4">
								<div>
									<Image
										alt="profile picture"
										src={
											data["image"]
												? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${data["image"]}`
												: defaultPic
										}
										height={80}
										width={80}
										className="rounded-md"
									/>
								</div>
								<div
									onClick={(e) => modalOpenHandler(e)}
									className="flex items-center gap-x-4 cursor-pointer"
								>
									<svg
										width="11"
										height="11"
										viewBox="0 0 11 11"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_63_384)">
											<path
												d="M7.79199 1.37481C7.91237 1.25443 8.05528 1.15895 8.21256 1.0938C8.36984 1.02865 8.53842 0.995117 8.70866 0.995117C8.8789 0.995117 9.04747 1.02865 9.20475 1.0938C9.36204 1.15895 9.50495 1.25443 9.62533 1.37481C9.7457 1.49519 9.84119 1.6381 9.90634 1.79538C9.97149 1.95267 10.005 2.12124 10.005 2.29148C10.005 2.46172 9.97149 2.63029 9.90634 2.78758C9.84119 2.94486 9.7457 3.08777 9.62533 3.20815L3.43783 9.39565L0.916992 10.0831L1.60449 7.56231L7.79199 1.37481Z"
												stroke="#7A7886"
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
									<p className="text-[#7A7886]">Edit</p>
								</div>
								<div>
									<p className="font-bold text-2xl text-[#4D4B57]">{`${
										data["firstName"] ? data["firstName"] : "Anonymous"
									} ${data["lastName"] ? data["lastName"] : "Anonymous"}`}</p>
								</div>
								<div>
									<p className="text-[#7A7886]">
										{data["noTelp"] ? data["noTelp"] : "+62 813-9387-7946"}
									</p>
								</div>
							</section>
							<section className="bottom flex flex-col justify-between gap-y-8 ">
								<div className="group cursor-pointer">
									<div
										onClick={() => router.push("/profile/personal-information")}
										className="flex items-center justify-between bg-[#E5E8ED] group-hover:bg-fazzpay-primary group-hover:text-fazzpay-secondary rounded-[0.625rem] py-2 px-6"
									>
										<p className="text-[#4D4B57] group-hover:text-fazzpay-secondary font-bold">
											Personal Information
										</p>
										<i className="bi bi-arrow-right text-[#7E7D84] group-hover:text-fazzpay-secondary text-[1.75rem]"></i>
									</div>
								</div>
								<div className="group cursor-pointer">
									<div
										onClick={() => router.push("/profile/change-password")}
										className="flex items-center justify-between bg-[#E5E8ED] group-hover:bg-fazzpay-primary group-hover:text-fazzpay-secondary rounded-[0.625rem] py-2 px-6 cursor-pointer"
									>
										<p className="text-[#4D4B57] group-hover:text-fazzpay-secondary font-bold">
											Change Password
										</p>
										<i className="bi bi-arrow-right text-[#7E7D84] group-hover:text-fazzpay-secondary text-[1.75rem]"></i>
									</div>
								</div>
								<div className="group cursor-pointer">
									<div
										onClick={() => router.push("/profile/change-pin")}
										className="flex items-center justify-between bg-[#E5E8ED] group-hover:bg-fazzpay-primary group-hover:text-fazzpay-secondary rounded-[0.625rem] py-2 px-6 cursor-pointer"
									>
										<p className="text-[#4D4B57] group-hover:text-fazzpay-secondary font-bold">
											Change PIN
										</p>
										<i className="bi bi-arrow-right text-[#7E7D84] group-hover:text-fazzpay-secondary text-[1.75rem]"></i>
									</div>
								</div>
								<div onClick={(e) => dialogOpenHandler(e)} className="group cursor-pointer">
									<div className="bg-[#E5E8ED] group-hover:bg-fazzpay-primary group-hover:text-fazzpay-secondary rounded-[0.625rem] py-4 px-6 cursor-pointer">
										<p className="text-[#4D4B57] group-hover:text-fazzpay-secondary font-bold">
											Logout
										</p>
									</div>
								</div>
							</section>
						</section>
						{/* right side end */}
					</div>
					<Dialog
						open={isModalOpen}
						onClose={modalCloseHandler}
						className="fixed z-10 bg-white/70 inset-0 overflow-y-auto"
					>
						<div className="flex items-center justify-center lg:min-h-[120vh] min-h-[180vh]">
							<div className="bg-fazzpay-secondary w-1/2 p-16 rounded-lg shadow-lg text-center z-20">
								<p className="text-2xl font-bold mb-2">Change Profile</p>
								<div className="form-wrapper flex flex-col gap-y-8">
									<div className="flex flex-col items-center gap-y-5">
										<div className="relative h-[80px] w-[80px]">
											<Image
												alt="profile picture"
												src={
													data["image"]
														? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${data["image"]}`
														: imagePreview
														? imagePreview
														: defaultPic
												}
												fill={true}
												className="rounded-md"
											/>
											<svg
												viewBox="-3 -3 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												onClick={() => document.querySelector(".input-field").click()}
												className="absolute top-[56px] right-[-10px] stroke-fazzpay-secondary bg-fazzpay-primary rounded-full h-6 w-6 cursor-pointer"
											>
												<g clipPath="url(#clip0_63_384)">
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
												type="file"
												className="input-field"
												multiple
												hidden
												onChange={(e) => onImageUpload(e)}
											/>
										</div>
										<div className="flex gap-x-3">
											<div className="change-image-button">
												<button
													disabled={!image}
													onClick={updateImageHandler}
													className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-primary hover:text-fazzpay-primary hover:bg-fazzpay-secondary disabled:bg-[#DADADA] disabled:text-[#88888F]"
												>
													Change Image
												</button>
											</div>
											<div className="delete-image-button">
												<button
													onClick={(e) => deleteImageHandler(e)}
													className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-dark hover:text-fazzpay-dark hover:bg-fazzpay-secondary"
												>
													Delete Image
												</button>
											</div>
										</div>
									</div>
									<form className="flex flex-col gap-y-10">
										<div className="relative w-full ease-in-out transition-all duration-300">
											<input
												type="text"
												name="firstName"
												value={form.firstName}
												onChange={onChangeForm}
												placeholder="Enter your firstname"
												className={`placeholder:text-[#A9A9A9CC] text-fazzpay-dark border-b-[1.5px] ${
													form.firstName ? "border-fazzpay-primary" : "border-[#A9A9A999]"
												} hover:border-gray-400 focus:outline-none appearance-none bg-transparent rounded-none h-10 pl-10 w-full`}
											/>
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className={`absolute top-[6px] h-6 ${
													form.firstName ? "stroke-fazzpay-primary" : "stroke-[#A9A9A9CC]"
												}`}
											>
												<path
													d="M4 20C4 17 8 17 10 15C11 14 8 14 8 9C8 5.667 9.333 4 12 4C14.667 4 16 5.667 16 9C16 14 13 14 14 15C16 17 20 17 20 20"
													strokeOpacity="0.6"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
										<div className="relative w-full ease-in-out transition-all duration-300">
											<input
												type="text"
												name="lastName"
												value={form.lastName}
												onChange={onChangeForm}
												placeholder="Enter your lastname"
												className={`placeholder:text-[#A9A9A9CC] text-fazzpay-dark border-b-[1.5px] ${
													form.lastName ? "border-fazzpay-primary" : "border-[#A9A9A999]"
												} hover:border-gray-400 focus:outline-none appearance-none bg-transparent rounded-none h-10 pl-10 w-full`}
											/>
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className={`absolute top-[6px] h-6 ${
													form.lastName ? "stroke-fazzpay-primary" : "stroke-[#A9A9A9CC]"
												}`}
											>
												<path
													d="M4 20C4 17 8 17 10 15C11 14 8 14 8 9C8 5.667 9.333 4 12 4C14.667 4 16 5.667 16 9C16 14 13 14 14 15C16 17 20 17 20 20"
													strokeOpacity="0.6"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
									</form>
									<div className="change-name-button pt-10">
										<button
											disabled={!form.firstName || !form.lastName}
											onClick={updateNameHandler}
											className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-primary hover:text-fazzpay-primary hover:bg-fazzpay-secondary disabled:bg-[#DADADA] disabled:text-[#88888F]"
										>
											Change Name
										</button>
									</div>
									<div className="cancel-button pt-10">
										<button
											onClick={() => setIsModalOpen(false)}
											className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-error hover:text-fazzpay-error hover:bg-fazzpay-secondary"
										>
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</Dialog>
					<Dialog
						open={isDialogOpen}
						onClose={dialogCloseHandler}
						className="fixed z-10 bg-white/70 inset-0 overflow-y-auto"
					>
						<div className="flex items-center justify-center min-h-screen">
							<div className="bg-fazzpay-secondary w-1/2 p-16 rounded-lg shadow-lg text-center z-20">
								<p className="text-2xl font-bold mb-2">Are you sure?</p>
								<div className="logout-button pt-10">
									<button
										onClick={logoutHandler}
										className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-primary hover:text-fazzpay-primary hover:bg-fazzpay-secondary disabled:bg-[#DADADA] disabled:text-[#88888F]"
									>
										Yes
									</button>
								</div>
								<div className="cancel-button pt-10">
									<button
										onClick={() => setIsDialogOpen(false)}
										className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-error hover:text-fazzpay-error hover:bg-fazzpay-secondary"
									>
										No
									</button>
								</div>
							</div>
						</div>
					</Dialog>
				</div>
			</Layout>
		</>
	);
}
