import Image from "next/image";
import { useRouter } from "next/router";

import { PublicRoute } from "@/utils/wrapper/publicRoute";

import Layout from "@/components/Layout";

import innerHero from "@/assets/img/hero-phone.webp";
import microsoft from "@/assets/img/microsoft-logo.webp";
import dropbox from "@/assets/img/dropbox-logo.webp";
import hm from "@/assets/img/hm-logo.webp";
import airbnb from "@/assets/img/airbnb-logo.webp";
import phone1 from "@/assets/img/phone1-section4.webp";
import phone2 from "@/assets/img/phone2-section4.webp";
import carousel1 from "@/assets/img/carousel1.webp";
import carousel2 from "@/assets/img/carousel2.webp";
import carousel3 from "@/assets/img/carousel3.webp";
import carousel4 from "@/assets/img/carousel4.webp";

import download from "@/assets/icons/download-icon.webp";
import phone from "@/assets/icons/phone-icon.webp";
import lock from "@/assets/icons/lock-icon.webp";

export default function Home({ reviews }) {
	const router = useRouter();

	const navigate = (to) => router.push(to);

	return (
		<PublicRoute>
			<Layout title={"Fazzpay: Simplify financial needs"}>
				{/* <Header /> */}
				<div className="container">
					{/* header start */}
					<div className="navbar lg:px-28 px-4 py-6 font-nunitoSans bg-fazzpay-primary/80 fixed top-0 left-0 z-50">
						<div className="navbar-start">
							<p className="text-3xl text-fazzpay-secondary font-bold">FazzPay</p>
						</div>
						<div className="navbar-end flex flex-row lg:gap-x-5 gap-x-2">
							<div
								className="btn lg:w-1/6 normal-case bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary"
								onClick={() => navigate("/login")}
							>
								Login
							</div>
							<div
								className="btn lg:w-1/6 normal-case bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary"
								onClick={() => navigate("signup")}
							>
								Sign Up
							</div>
						</div>
					</div>
					{/* header end */}
					{/* section1 start */}
					<section className="font-nunitoSans flex lg:flex-row flex-col items-center justify-center h-[260vh] w-screen bg-cover landing-hero mt-[-4rem] lg:h-[132.5vh] lg:mt-0">
						<div className="lg:w-1/2 lg:pl-28 lg:pb-[4rem]">
							<h1 className="text-fazzpay-secondary font-extrabold text-4xl leading-relaxed text-center mt-[-15rem] lg:mt-0 lg:text-left lg:text-6xl lg:leading-relaxed">
								Awesome App <br />
								For Saving Time.
							</h1>
							<p className="text-fazzpay-secondary font-normal pt-8 px-10 hidden lg:block lg:px-0 lg:pt-16 lg:text-lg lg:leading-loose">
								We bring you a mobile app for banking problems that <br />
								oftenly wasting much of your times.
							</p>
							<p className="block lg:hidden text-fazzpay-secondary font-normal pt-8 px-14 text-justify">
								We bring you a mobile app for banking problems that oftenly wasting much of your
								times.
							</p>
							<div className="flex lg:flex-row flex-col justify-center items-center w-full lg:block">
								<div className="btn normal-case bg-fazzpay-secondary text-fazzpay-primary hover:bg-fazzpay-primary hover:text-fazzpay-secondary px-12 mt-16">
									Try It Free
								</div>
								<div className="lg:hidden mb-[-30rem]">
									<Image alt="img" src={innerHero} priority={true} />
								</div>
							</div>
						</div>
						<div className="hidden lg:block lg:w-1/2 lg:mt-[5.5rem]">
							<Image alt="img" src={innerHero} priority={true} />
						</div>
					</section>
					{/* section1 end */}
					{/* section2 start */}
					<section className="flex items-center justify-between px-24 h-[18.75rem] w-screen bg-fazzpay-primary/10">
						<div>
							<Image alt="Microsoft Logo" src={microsoft} />
						</div>
						<div>
							<Image alt="Dropbox Log" src={dropbox} />
						</div>
						<div>
							<Image alt="H&M Logo" src={hm} />
						</div>
						<div>
							<Image alt="Airbnb Logo" src={airbnb} />
						</div>
					</section>
					{/* section2 end */}
					{/* section3 start */}
					<section className="font-nunitoSans bg-[#473AD1]/5 w-screen py-36 px-20">
						<div className="flex flex-wrap text-center">
							<p className="w-full md:text-6xl text-5xl font-extrabold">
								<span className="text-fazzpay-primary">About</span> the Application.
							</p>
							<p className="w-full text-lg font-normal pt-4">
								We have some great features from the application and it’s totally free <br />
								to use by all users around the world.
							</p>
						</div>
						<div className="flex lg:flex-row flex-col items-center justify-center lg:justify-between px-8 mt-[4rem] gap-y-8">
							<div className="w-[367px] h-[344px] bg-[#fffafa] border-2 rounded-[25px] shadow-xl flex flex-wrap items-center py-[2rem]">
								<Image alt="img" className="mx-auto" src={phone} />
								<h1 className="w-full text-center text-[24px] font-bold">24/7 Support</h1>
								<p className="w-full text-center text-[18px] font-normal">
									We have 24/7 contact support so you <br />
									can contact us whenever you want <br />
									and we will respond it.
								</p>
							</div>
							<div className="w-[367px] h-[344px] bg-[#fffafa] border-2 rounded-[25px] shadow-xl flex flex-wrap items-center py-[2rem]">
								<Image alt="img" className="mx-auto" src={lock} />
								<h1 className="w-full text-center text-[24px] font-bold">Data Privacy</h1>
								<p className="w-full text-center text-[18px] font-normal">
									We make sure your data is safe in our <br />
									database and we will encrypt any <br />
									data you submitted to us.
								</p>
							</div>
							<div className="w-[367px] h-[344px] bg-[#fffafa] border-2 rounded-[25px] shadow-xl flex flex-wrap items-center py-[2rem]">
								<Image alt="img" className="mx-auto" src={download} />
								<h1 className="w-full text-center text-[24px] font-bold">Easy Download</h1>
								<p className="w-full text-center text-[18px] font-normal">
									Fazzpay is 100% totally free to use it’s <br />
									now available on Google Play Store <br />
									and App Store.
								</p>
							</div>
						</div>
					</section>
					{/* section3 end */}
					{/* section4 start */}
					<section className="font-nunitoSans bg-fazzpay-primary/10 flex flex-wrap w-screen px-[2rem] md:pl-[3.5rem]">
						<div className="w-1/2 hidden lg:block">
							<Image alt="img" src={phone1} />
							<Image alt="img" className="-mt-[6rem]" src={phone2} />
						</div>
						<div className="lg:w-1/2 w-full flex flex-col items-center gap-y-10 lg:flex-wrap lg:justify-center">
							<p className="text-[60px] font-extrabold mt-[7rem]">
								All The <span className="text-fazzpay-primary">Great</span>
								<br />
								FazzPay Features.
							</p>
							<div className="flex flex-col gap-y-8">
								<div className="w-full bg-fazzpay-secondary border-2 shadow-lg px-[1rem] py-[2rem] rounded-[25px]">
									<h1 className="text-[20px] font-bold pb-[1rem]">
										<span className="text-fazzpay-primary">1.</span> Small Fee
									</h1>
									<p className="text-[18px] font-normal">
										We only charge 5% of every success transaction done in FazzPay app.
									</p>
								</div>
								<div className="w-full bg-fazzpay-secondary border-2 shadow-lg px-[1rem] py-[2rem] rounded-[25px]">
									<h1 className="text-[20px] font-bold pb-[1rem]">
										<span className="text-fazzpay-primary">2.</span> Data Secured
									</h1>
									<p className="text-[18px] font-normal">
										All your data is secured properly in our system and it’s encrypted.
									</p>
								</div>
								<div className="w-full bg-fazzpay-secondary border-2 shadow-lg px-[1rem] py-[2rem] rounded-[25px]">
									<h1 className="text-[20px] font-bold pb-[1rem]">
										<span className="text-fazzpay-primary">3.</span> User Friendly
									</h1>
									<p className="text-[18px] font-normal">
										FazzPay come up with modern and sleek design and not complicated.
									</p>
								</div>
							</div>
						</div>
					</section>
					{/* section4 end */}
					{/* section5 start */}
					<section className="text-center bg-[#473AD1]/5 font-nunitoSans w-screen px-3 py-24 md:pl-[4.5rem]">
						<p className="text-[60px] font-extrabold">
							What Users are <span className="text-fazzpay-primary">Saying.</span>
						</p>
						<p className="text-[18px] font-normal pt-4">
							We have some great features from the application and it’s totally free <br />
							to use by all users around the world.
						</p>
						{/* Carousel start */}
						<div className="carousel my-[4rem]">
							{reviews.map((review, idx) => {
								return (
									<div
										key={idx}
										id={`slide${idx}`}
										className="carousel-item relative w-full justify-center"
									>
										<div className="card w-[80%] h-full md:w-[55vw] rounded-[30px] bg-base-100 shadow-lg border-2">
											<figure className="px-10 pt-10">
												<Image
													src={review.image}
													alt="Reviewer"
													height={120}
													width={120}
													className="rounded-xl"
												/>
											</figure>
											<div className="card-body items-center text-center">
												<h2 className="card-title">{review.name}</h2>
												<p>Designer</p>
												<p>{review.comment}</p>
											</div>
										</div>
										<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
											<a
												href={idx === 0 ? `#slide3` : `#slide${idx - 1}`}
												className="btn border-none bg-fazzpay-secondary hover:bg-fazzpay-dark hover:text-fazzpay-secondary w-12 h-10 md:ml-[8rem]"
											>
												<i className="bi bi-arrow-left text-3xl"></i>
											</a>
											<a
												href={idx === 3 ? `#slide0` : `#slide${idx + 1}`}
												className="btn border-none bg-fazzpay-secondary hover:bg-fazzpay-dark hover:text-fazzpay-secondary w-12 h-10 md:mr-[8rem]"
											>
												<i className="bi bi-arrow-right text-3xl"></i>
											</a>
										</div>
									</div>
								);
							})}
						</div>
						{/* Carousel end */}
					</section>
					{/* section5 end */}
					{/* Footer start */}
					<footer className="px-[2rem] font-nunitoSans md:pl-28 pt-[5rem] bg-fazzpay-primary h-[438px] w-screen">
						<h1 className="text-fazzpay-secondary text-4xl font-bold">FazzPay</h1>
						<p className="text-fazzpay-secondary/75 mt-[2rem]">
							Simplify financial needs and saving <br />
							much time in banking needs with <br />
							one single app.
						</p>
						<div className="flex justify-between md:pr-[6rem] border-t mt-[4rem]">
							<p className="text-fazzpay-secondary/90 pt-[2rem]">
								2022 FazzPay. All right reserved.
							</p>
							<p className="text-fazzpay-secondary pt-[2rem]">+62 8228 4798 890</p>
						</div>
					</footer>
					{/* Footer end */}
				</div>
			</Layout>
		</PublicRoute>
	);
}

export async function getStaticProps() {
	const reviews = [
		{
			name: "Alex Hansinburg",
			comment:
				"“This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try this app and see the power!”",
			image: carousel1,
		},
		{
			name: "Sherina Chaw",
			comment:
				"“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”",
			image: carousel2,
		},
		{
			name: "Jessica Mera",
			comment:
				"“I use Fazzpay to manage all financial needs. It’s super easy to use and it’s 100% free app”",
			image: carousel3,
		},
		{
			name: "Robert Chandler",
			comment:
				"“Since I’m using this app, I’m not going to move to another similar app. Thank you Fazzpay!”",
			image: carousel4,
		},
	];

	return {
		props: { reviews },
	};
}
