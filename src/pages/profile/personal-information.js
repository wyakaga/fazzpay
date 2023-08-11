import Link from "next/link";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { userAction } from "@/redux/slices/user";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";
import TokenHandler from "@/utils/wrapper/tokenHandler";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

import "react-loading-skeleton/dist/skeleton.css";

function PersonalInformation() {
  const dispatch = useDispatch();

  const controller = useMemo(() => new AbortController(), []);

  const userId = useSelector((state) => state.auth.data.id);
  const token = useSelector((state) => state.auth.data.token);
  const userData = useSelector((state) => state.user.data);

  const [data, setData] = useState({});
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

  const setEmail = () => {
    if (userData && userData["email"]) {
      return `${userData["email"]}`;
    }

    if (data && data["email"]) {
      return `${data["email"]}`;
    }

    return "anon@anon.com";
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

  return (
    <>
      <PrivateRoute>
        <Layout title={"Your personal information"}>
          <Header />
          <div className="container">
            <div className="flex gap-x-6 pb-32 pt-56 px-5 md:px-28 bg-[#fafcff]">
              {/* left side start */}
              <Sidebar />
              {/* left side end */}
              {/* right side start */}
              <section className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-10 bg-fazzpay-secondary rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.5)] p-10">
                <section className="top flex flex-col gap-y-4">
                  <div>
                    <p className="font-bold text-lg text-fazzpay-dark">
                      Personal Information
                    </p>
                  </div>
                  <div>
                    <p className="text-[#7A7886]">
                      We got your personal information from the sign <br /> up
                      process. If you want to make changes on <br /> your
                      information, contact our support.
                    </p>
                  </div>
                </section>
                <section className="bottom flex flex-col justify-between gap-y-8 ">
                  {isLoading ? (
                    <SkeletonTheme baseColor="#DDDDDD" highlightColor="#FFFFFF">
                      {Array("", "", "", "").map((_, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col bg-fazzpay-secondary rounded-[0.625rem] py-2 px-6 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] gap-y-2"
                          >
                            <Skeleton
                              containerClassName="leading-none block"
                              width={"25%"}
                              height={24}
                            />
                            <Skeleton
                              containerClassName="leading-none block"
                              width={"35%"}
                              height={33}
                            />
                          </div>
                        );
                      })}
                    </SkeletonTheme>
                  ) : (
                    <>
                      <div className="flex flex-col bg-fazzpay-secondary rounded-[0.625rem] py-2 px-6 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] gap-y-2">
                        <p className="text-[#7A7886]">First Name</p>
                        <p className="font-bold text-[1.375rem] text-[#514F5B]">
                          {setFirstName()}
                        </p>
                      </div>
                      <div className="flex flex-col bg-fazzpay-secondary rounded-[0.625rem] py-2 px-6 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] gap-y-2">
                        <p className="text-[#7A7886]">Last Name</p>
                        <p className="font-bold text-[1.375rem] text-[#514F5B]">
                          {setLastName()}
                        </p>
                      </div>
                      <div className="flex flex-col bg-fazzpay-secondary rounded-[0.625rem] py-2 px-6 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] gap-y-2">
                        <p className="text-[#7A7886]">Verified E-mail</p>
                        <p className="font-bold text-[1.375rem] text-[#7A7886]">
                          {setEmail()}
                        </p>
                      </div>
                      <div className="flex items-center justify-between bg-fazzpay-secondary rounded-[0.625rem] py-2 px-6 shadow-[0px_4px_20px_rgba(0,0,0,0.3)]">
                        <div className="flex flex-col gap-y-2">
                          <p className="text-[#7A7886]">Phone Number</p>
                          <p className="font-bold text-[1.375rem] text-[#514F5B]">
                            {setPhoneNumber()}
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
                    </>
                  )}
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

export default TokenHandler(PersonalInformation);
