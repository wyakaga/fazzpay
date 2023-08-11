import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback, useMemo, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { updateName, updateImage, deleteImage } from "@/utils/https/user";
import { logout } from "@/utils/https/auth";
import { authAction } from "@/redux/slices/auth";
import { userAction } from "@/redux/slices/user";
import { transactionAction } from "@/redux/slices/transaction";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";
import TokenHandler from "@/utils/wrapper/tokenHandler";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

import "react-loading-skeleton/dist/skeleton.css";

import defaultPic from "@/assets/img/profile-placeholder.webp";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const controller = useMemo(() => new AbortController(), []);

  const userId = useSelector((state) => state.auth.data.id);
  const token = useSelector((state) => state.auth.data.token);
  const userData = useSelector((state) => state.user.data);

  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { payload } = await dispatch(
        userAction.getUserThunk({ userId, token, controller })
      );
      setData(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, userId, token, controller]);

  useEffect(() => {
    fetchUserData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [fetchUserData]);

  const setUserImg = (allowImagePreview) => {
    if (allowImagePreview && imagePreview) {
      return imagePreview;
    }

    if (userData && userData["image"]) {
      return `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${userData["image"]}`;
    }

    if (data && data["image"]) {
      return `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${data["image"]}`;
    }

    return defaultPic;
  };

  const setFirstName = () => {
    if (userData && userData["firstName"]) {
      return `${userData["firstName"]}`;
    }

    if (data && data["firstName"]) {
      return `${data["firstName"]}`;
    }

    return "Anonymous";
  };

  const setLastName = () => {
    if (userData && userData["lastName"]) {
      return `${userData["lastName"]}`;
    }

    if (data && data["lastName"]) {
      return `${data["lastName"]}`;
    }

    return "Anonymous";
  };

  const setPhoneNumber = () => {
    if (userData && userData["noTelp"]) {
      return `${userData["noTelp"]}`;
    }

    if (data && data["noTelp"]) {
      return `${data["noTelp"]}`;
    }

    return "No Phone Number";
  };

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

    const isValidFileUploaded = (file) => {
      const validExtensions = ["png", "jpeg", "jpg", "webp"];
      const fileExtension = file.type.split("/")[1];
      return validExtensions.includes(fileExtension);
    };

    const maxSize = 2 * 1024 * 1024;

    const file = e.target.files[0];

    if (!isValidFileUploaded(file)) {
      e.target.value = null;
      return toast.error("File should be in PNG, JPEG, JPG or WEBP!");
    }

    if (file.size > maxSize) {
      e.target.value = null;
      return toast.error("File exceeds maximum size");
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const updateImageHandler = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("image", image);

    toast.promise(updateImage(body, userId, token, controller), {
      pending: {
        render() {
          e.target.disabled = true;
          return "Please wait...";
        },
      },
      success: {
        render() {
          e.target.disabled = false;
          setImage(null);
          setImagePreview(null);
          setIsModalOpen(false);
          fetchUserData();
          return "Image successfully updated";
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

  const deleteImageHandler = (e) => {
    e.preventDefault();

    toast.promise(deleteImage(userId, token, controller), {
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

    toast.promise(updateName(form, userId, token, controller), {
      pending: {
        render() {
          e.target.disabled = true;
          return "Please wait...";
        },
      },
      success: {
        render() {
          e.target.disabled = false;
          setForm({ firstName: "", lastName: "" });
          setIsModalOpen(false);
          fetchUserData();
          return "Name succesfully changed";
        },
      },
      error: {
        render({ data }) {
          e.target.disabled = false;
          setForm({ firstName: "", lastName: "" });
          if (data["response"]) return data["response"]["data"]["msg"];
          return "Something went wrong";
        },
      },
    });
  };

  const logoutHandler = (e) => {
    e.preventDefault();

    toast.promise(logout(token), {
      pending: {
        render() {
          e.target.disabled = true;
          return "Please wait...";
        },
      },
      success: {
        render() {
          e.target.disabled = false;
          router.push("/");
          dispatch(authAction.remove());
          dispatch(userAction.reset());
          dispatch(transactionAction.reset());
          return "Succesfully logged out";
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
        <Layout title={"Your profile"}>
          <Header />
          <div className="container">
            <div className="flex gap-x-6 pb-32 pt-56 px-5 md:px-28 bg-[#fafcff]">
              {/* left side start */}
              <Sidebar />
              {/* left side end */}
              {/* right side start */}
              <section className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-6 bg-fazzpay-secondary rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.5)] p-10">
                <section className="top flex flex-col justify-center items-center gap-y-4">
                  {isLoading ? (
                    <SkeletonTheme baseColor="#DDDDDD" highlightColor="#FFFFFF">
                      <div className="w-24 h-[6.375rem]">
                        <Skeleton width={"100%"} height={"100%"} />
                      </div>
                    </SkeletonTheme>
                  ) : (
                    <div>
                      <Image
                        alt="profile picture"
                        src={setUserImg(false)}
                        height={80}
                        width={80}
                        priority={true}
                        className="rounded-md h-auto w-auto"
                      />
                    </div>
                  )}
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
                  {isLoading ? (
                    <SkeletonTheme baseColor="#DDDDDD" highlightColor="#FFFFFF">
                      <div className="w-1/3">
                        <Skeleton
                          containerClassName="leading-none block"
                          width={"100%"}
                          height={32}
                        />
                      </div>
                    </SkeletonTheme>
                  ) : (
                    <div>
                      <p className="font-bold text-2xl text-[#4D4B57]">{`${setFirstName()} ${setLastName()}`}</p>
                    </div>
                  )}
                  {isLoading ? (
                    <SkeletonTheme baseColor="#DDDDDD" highlightColor="#FFFFFF">
                      <div className="w-1/3">
                        <Skeleton
                          containerClassName="leading-none block"
                          width={"100%"}
                          height={24}
                        />
                      </div>
                    </SkeletonTheme>
                  ) : (
                    <div>
                      <p className="text-[#7A7886]">{setPhoneNumber()}</p>
                    </div>
                  )}
                </section>
                <section className="bottom flex flex-col justify-between gap-y-8 ">
                  <div className="group cursor-pointer select-none">
                    <div
                      onClick={() =>
                        router.push("/profile/personal-information")
                      }
                      className="flex items-center justify-between bg-[#E5E8ED] group-hover:bg-fazzpay-primary group-hover:text-fazzpay-secondary duration-300 rounded-[0.625rem] py-2 px-6"
                    >
                      <p className="text-[#4D4B57] group-hover:text-fazzpay-secondary duration-300 font-bold">
                        Personal Information
                      </p>
                      <i className="bi bi-arrow-right text-[#7E7D84] group-hover:text-fazzpay-secondary group-hover:transform group-hover:translate-x-2/4 duration-300 text-[1.75rem]"></i>
                    </div>
                  </div>
                  <div className="group cursor-pointer select-none">
                    <div
                      onClick={() => router.push("/profile/change-password")}
                      className="flex items-center justify-between bg-[#E5E8ED] group-hover:bg-fazzpay-primary group-hover:text-fazzpay-secondary duration-300 rounded-[0.625rem] py-2 px-6 cursor-pointer"
                    >
                      <p className="text-[#4D4B57] group-hover:text-fazzpay-secondary duration-300 font-bold">
                        Change Password
                      </p>
                      <i className="bi bi-arrow-right text-[#7E7D84] group-hover:text-fazzpay-secondary group-hover:transform group-hover:translate-x-2/4 duration-300 text-[1.75rem]"></i>
                    </div>
                  </div>
                  <div className="group cursor-pointer select-none">
                    <div
                      onClick={() => router.push("/profile/change-pin")}
                      className="flex items-center justify-between bg-[#E5E8ED] group-hover:bg-fazzpay-primary group-hover:text-fazzpay-secondary duration-300 rounded-[0.625rem] py-2 px-6 cursor-pointer"
                    >
                      <p className="text-[#4D4B57] group-hover:text-fazzpay-secondary duration-300 font-bold">
                        Change PIN
                      </p>
                      <i className="bi bi-arrow-right text-[#7E7D84] group-hover:text-fazzpay-secondary group-hover:transform group-hover:translate-x-2/4 duration-300 text-[1.75rem]"></i>
                    </div>
                  </div>
                  <div
                    onClick={(e) => dialogOpenHandler(e)}
                    className="group cursor-pointer select-none"
                  >
                    <div className="bg-[#E5E8ED] group-hover:bg-fazzpay-primary group-hover:text-fazzpay-secondary duration-300 rounded-[0.625rem] py-4 px-6 cursor-pointer">
                      <p className="text-[#4D4B57] group-hover:text-fazzpay-secondary duration-300 font-bold">
                        Logout
                      </p>
                    </div>
                  </div>
                </section>
              </section>
              {/* right side end */}
            </div>
            <Transition appear show={isModalOpen} as={Fragment}>
              <Dialog
                as="div"
                onClose={modalCloseHandler}
                className="relative z-[51]"
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed bg-gray-700/80 inset-0 overflow-y-auto" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="bg-fazzpay-secondary lg:w-1/2 w-3/4 p-16 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] text-center z-[52] relative">
                        <Dialog.Title className="text-2xl font-bold mb-8">
                          Change Profile
                        </Dialog.Title>
                        <div className="form-wrapper flex flex-col gap-y-8">
                          <div className="flex flex-col items-center gap-y-5">
                            <div className="relative h-[80px] w-[80px]">
                              <Image
                                alt="profile picture"
                                src={setUserImg(true)}
                                fill={true}
                                className="rounded-md"
                              />
                              <div
                                onClick={() =>
                                  document.querySelector(".input-field").click()
                                }
                                className="absolute top-[56px] right-[-10px]"
                              >
                                <div className="group relative flex">
                                  <div className="flex cursor-pointer bg-fazzpay-primary hover:bg-[#405BED] text-fazzpay-secondary h-[30px] w-[30px] justify-center items-center rounded-full duration-300">
                                    <i className="bi bi-pencil"></i>
                                  </div>
                                  <span className="absolute top-0 -right-32 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-fazzpay-secondary whitespace-nowrap group-hover:scale-100 group-active:scale-0 group-hover:delay-[1500ms]">
                                    Choose picture
                                  </span>
                                </div>
                              </div>
                              <input
                                type="file"
                                className="input-field"
                                hidden
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onChange={(e) => onImageUpload(e)}
                              />
                            </div>
                            <div className="flex gap-x-3">
                              <div className="change-image-button">
                                <button
                                  disabled={!image}
                                  onClick={updateImageHandler}
                                  className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-primary hover:text-fazzpay-primary hover:bg-fazzpay-secondary disabled:bg-[#DADADA] disabled:text-[#88888F] duration-300"
                                >
                                  Change Image
                                </button>
                              </div>
                              <div className="delete-image-button">
                                <button
                                  onClick={(e) => deleteImageHandler(e)}
                                  className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-dark hover:text-fazzpay-dark hover:bg-fazzpay-secondary duration-300"
                                >
                                  Delete Image
                                </button>
                              </div>
                            </div>
                          </div>
                          <form
                            onSubmit={updateNameHandler}
                            className="flex flex-col gap-y-10"
                          >
                            <div className="relative w-full ease-in-out transition-all duration-300">
                              <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={onChangeForm}
                                placeholder="Enter your firstname"
                                className={`placeholder:text-[#A9A9A9CC] text-fazzpay-dark border-b-[1.5px] ${
                                  form.firstName
                                    ? "border-fazzpay-primary"
                                    : "border-[#A9A9A999]"
                                } hover:border-gray-400 focus:outline-none appearance-none bg-transparent rounded-none h-10 pl-10 w-full`}
                              />
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`absolute top-[6px] h-6 ${
                                  form.firstName
                                    ? "stroke-fazzpay-primary"
                                    : "stroke-[#A9A9A9CC]"
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
                                  form.lastName
                                    ? "border-fazzpay-primary"
                                    : "border-[#A9A9A999]"
                                } hover:border-gray-400 focus:outline-none appearance-none bg-transparent rounded-none h-10 pl-10 w-full`}
                              />
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`absolute top-[6px] h-6 ${
                                  form.lastName
                                    ? "stroke-fazzpay-primary"
                                    : "stroke-[#A9A9A9CC]"
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
                            <div className="change-name-button">
                              <button
                                disabled={!form.firstName && !form.lastName}
                                onClick={updateNameHandler}
                                className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-primary hover:text-fazzpay-primary hover:bg-fazzpay-secondary disabled:bg-[#DADADA] disabled:text-[#88888F] duration-300"
                              >
                                Change Name
                              </button>
                            </div>
                          </form>
                          <div
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-0 right-0"
                          >
                            <div className="group relative flex">
                              <div className="flex cursor-pointer bg-fazzpay-error hover:bg-[#EB2F08] text-fazzpay-secondary h-[40px] w-[40px] justify-center items-center rounded-full duration-300">
                                <i className="bi bi-x-lg text-xl"></i>
                              </div>
                              <span className="absolute top-12 -right-2 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-fazzpay-secondary whitespace-nowrap group-hover:scale-100 group-active:scale-0 group-hover:delay-[1500ms]">
                                Close
                              </span>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
            <Transition appear show={isDialogOpen} as={Fragment}>
              <Dialog
                as="div"
                onClose={dialogCloseHandler}
                className="relative z-[51]"
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed bg-gray-700/80 inset-0 overflow-y-auto" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="bg-fazzpay-secondary w-1/2 p-16 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] text-center z-[52] relative">
                        <Dialog.Title className="text-2xl font-bold mb-2">
                          Are you sure?
                        </Dialog.Title>
                        <div className="logout-button pt-10">
                          <button
                            onClick={logoutHandler}
                            className="btn normal-case w-full border-transparent text-fazzpay-secondary bg-fazzpay-primary hover:text-fazzpay-primary hover:bg-fazzpay-secondary"
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
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
          <Footer />
        </Layout>
      </PrivateRoute>
    </>
  );
}

export default TokenHandler(Profile);
