import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { history } from "@/utils/https/transaction";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";
import TokenHandler from "@/utils/wrapper/tokenHandler";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

import "react-loading-skeleton/dist/skeleton.css";

import defaultProfile from "@/assets/img/profile-placeholder.webp";

function History() {
  const router = useRouter();

  const controller = useMemo(() => new AbortController(), []);

  const token = useSelector((state) => state.auth.data.token);

  const [users, setUsers] = useState([]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetching = async () => {
    setIsLoading(true);
    router.replace({
      pathname: "/home/history",
      query: {
        page,
        filter: sort,
      },
    });
    try {
      const result = await history(page, 6, sort, token, controller);
      setUsers(result["data"]["data"]);
      setPagination(result["data"]["pagination"]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, token]);

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <PrivateRoute>
        <Layout title={"Your Transactions History"}>
          <Header />
          <div className="container">
            <div className="flex gap-x-6 pb-32 pt-56 px-5 md:px-28">
              <Sidebar />
              <div className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-6 py-5 px-10 bg-white rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.5)]">
                <section className="top flex justify-between">
                  <div>
                    <p className="font-bold text-lg text-fazzpay-dark">
                      Transaction History
                    </p>
                  </div>
                  <div>
                    <div className="relative">
                      <select
                        className="border border-transparent rounded-md text-fazzpay-dark h-10 px-5 bg-fazzpay-dark/10 hover:border-gray-400 focus:outline-none appearance-none"
                        name="filter"
                        id="filter"
                        onChange={sortHandler}
                      >
                        <option value=""> -- Select Filter -- </option>
                        <option value="WEEK">Week</option>
                        <option value="MONTH">Month</option>
                        <option value="YEAR">Year</option>
                      </select>
                    </div>
                  </div>
                </section>
                {isLoading ? (
                  <section className="bottom w-full">
                    <div className="min-h-[591px] w-full">
                      <div className="flex flex-col gap-y-8 w-full">
                        <SkeletonTheme
                          baseColor="#DDDDDD"
                          highlightColor="#FFFFFF"
                        >
                          {Array("", "", "", "", "", "").map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between w-full"
                              >
                                <div className="flex items-center gap-x-5 w-full">
                                  <div className="w-[4.25rem] h-[4.25rem]">
                                    <Skeleton width={"100%"} height={"100%"} />
                                  </div>
                                  <div className="w-full">
                                    <Skeleton width={"50%"} height={24} />
                                    <Skeleton width={"40%"} height={20} />
                                  </div>
                                </div>
                                <Skeleton width={150} height={28} />
                              </div>
                            );
                          })}
                        </SkeletonTheme>
                      </div>
                    </div>
                  </section>
                ) : !users.length && pagination.totalData === 0 ? (
                  <section className="bottom h-1/2 flex justify-center items-center">
                    <div>
                      <p className="lg:text-7xl font-bold">
                        No Transaction Yet
                      </p>
                    </div>
                  </section>
                ) : (
                  <section className="bottom">
                    <div className="history-cards min-h-[591px]">
                      <div className="content-wrapper flex flex-col gap-y-8">
                        {users.map((user, idx) => {
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-x-5">
                                <div>
                                  <Image
                                    alt="user"
                                    height={56}
                                    width={56}
                                    src={
                                      user.image
                                        ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${user.image}`
                                        : defaultProfile
                                    }
                                    className="rounded-md h-auto w-auto"
                                  />
                                </div>
                                <div>
                                  <p className="text-[#4D4B57] font-bold">{`${user.firstName} ${user.lastName}`}</p>
                                  <p className="text-[#7A7886] text-sm capitalize">
                                    {user.type}
                                  </p>
                                </div>
                              </div>
                              <p
                                className={`${
                                  user.type !== "send"
                                    ? "text-[#1EC15F]"
                                    : "text-fazzpay-error"
                                } font-bold text-lg`}
                              >{`${
                                user.type !== "send" ? "+" : "-"
                              }Rp${user.amount.toLocaleString("id-ID")}`}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="pagination self-center flex flex-col items-center gap-y-3">
                      <div className="btn-group grid grid-cols-2">
                        <button
                          onClick={() => setPage(page - 1)}
                          disabled={pagination.page === 1}
                          className="btn btn-outline border-fazzpay-primary text-fazzpay-primary disabled:border-transparent disabled:bg-slate-500 disabled:text-slate-600 hover:border-transparent hover:bg-fazzpay-primary hover:text-fazzpay-secondary"
                        >
                          prev
                        </button>
                        <button
                          onClick={() => setPage(page + 1)}
                          disabled={
                            pagination.page === pagination.totalPage ||
                            pagination.totalPage === 0
                          }
                          className="btn btn-outline border-fazzpay-primary text-fazzpay-primary disabled:border-transparent disabled:bg-slate-500 disabled:text-slate-600 hover:border-transparent hover:bg-fazzpay-primary hover:text-fazzpay-secondary"
                        >
                          next
                        </button>
                      </div>
                      <div>
                        <p className="text-fazzpay-dark">
                          Page{" "}
                          {pagination.totalPage === 0 ? 0 : pagination.page} of{" "}
                          {pagination.totalPage}{" "}
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </Layout>
      </PrivateRoute>
    </>
  );
}

export default TokenHandler(History);
