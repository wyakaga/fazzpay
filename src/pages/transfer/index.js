import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { getUsers } from "@/utils/https/user";
import { PhoneCheck } from "@/utils/wrapper/phoneCheck";
import { PrivateRoute } from "@/utils/wrapper/privateRoute";
import TokenHandler from "@/utils/wrapper/tokenHandler";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

import "react-loading-skeleton/dist/skeleton.css";

import defaultProfile from "@/assets/img/profile-placeholder.webp";

function Transfer() {
  const router = useRouter();

  const controller = useMemo(() => new AbortController(), []);

  const token = useSelector((state) => state.auth.data.token);

  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetching = async () => {
    setIsLoading(true);
    try {
      router.replace({
        pathname: "/transfer",
        query: {
          page,
          search: searchValue,
        },
      });
      const result = await getUsers(page, 4, searchValue, token, controller);
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
  }, [page, searchValue, token]);

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const debouncedSearch = useMemo(() => debounce(onSearchChange, 1000), []);

  return (
    <>
      <PrivateRoute>
        <PhoneCheck>
          <Layout title={"Transfer"}>
            <Header />
            <div className="container">
              <div className="flex gap-x-6 pb-32 pt-56 px-5 md:px-28">
                <Sidebar />
                <div className="main-content font-nunitoSans w-full lg:w-3/4 flex flex-col gap-y-6 py-5 px-10 bg-white rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.5)]">
                  <section className="top flex flex-col gap-y-5">
                    <div>
                      <p className="font-bold text-lg text-fazzpay-dark">
                        Search Receiver
                      </p>
                    </div>
                    <div>
                      <div className="relative w-full ease-in-out transition-all duration-300">
                        <input
                          type="text"
                          name="searchbar"
                          onChange={debouncedSearch}
                          placeholder="Search receiver here"
                          className={`placeholder:text-[#3A3D4266] text-fazzpay-dark border-[1.5px] focus:outline-none appearance-none bg-[#3A3D421A] rounded-xl h-10 pl-10 w-full`}
                        />
                        <i className="bi bi-search absolute top-[10px] left-[10px] text-[#A9A9A9] font-bold"></i>
                      </div>
                    </div>
                    <div></div>
                  </section>
                  <section className="bottom flex flex-col gap-y-20">
                    <div className="flex flex-col gap-y-5 min-h-[760px] lg:min-h-[500px]">
                      {isLoading ? (
                        <SkeletonTheme
                          baseColor="#DDDDDD"
                          highlightColor="#FFFFFF"
                        >
                          {Array("", "", "", "").map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="bg-fazzpay-secondary rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.3)] p-5"
                              >
                                <div className="flex items-center gap-x-5">
                                  <div>
                                    <div className="relative h-[70px] w-[70px]">
                                      <Skeleton width={"100%"} height={"100%"}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-y-3 w-full">
                                    <Skeleton width={"60%"} height={28} />
                                    <Skeleton width={"50%"} height={24} />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </SkeletonTheme>
                      ) : (
                        users.map((user, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() =>
                                router.push(`/transfer/${user.id}`)
                              }
                              className="bg-fazzpay-secondary rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.3)] p-5 cursor-pointer"
                            >
                              <div className="flex items-center gap-x-5">
                                <div>
                                  <div className="relative h-[70px] w-[70px]">
                                    <Image
                                      alt="user image"
                                      src={
                                        user.image
                                          ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${user.image}`
                                          : defaultProfile
                                      }
                                      fill={true}
                                      sizes="70px"
                                      className="rounded-md"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col gap-y-3">
                                  <p className="font-bold text-lg text-[#4D4B57]">{`${user.firstName} ${user.lastName}`}</p>
                                  <p className="text-[#7A7886]">
                                    {user.noTelp
                                      ? user.noTelp
                                      : "No Phone Number"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
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
                </div>
              </div>
            </div>
            <Footer />
          </Layout>
        </PhoneCheck>
      </PrivateRoute>
    </>
  );
}

export default TokenHandler(Transfer);
