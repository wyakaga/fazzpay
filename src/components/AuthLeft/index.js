import Image from "next/image";
import Link from "next/link";

import hero from "@/assets/img/auth-bg.webp";
import innerHero from "@/assets/img/duo-phone.webp";

export default function AuthLeft() {
	return (
		<>
			<div className="hidden bg-no-repeat bg-cover bg-center auth-hero w-7/12 lg:flex justify-center">
        <div className="py-10 font-nunitoSans">
          <Link href="/" className=" text-fazzpay-secondary text-[29px] font-bold">
            FazzPay
          </Link>
          <Image className="" src={innerHero} alt="" />
          <div className="flex flex-col gap-y-5">
            <p className=" text-fazzpay-secondary text-[24px] font-bold bottom-[6rem]">
              App that Covering Banking Needs.
            </p>
            <p className=" text-fazzpay-secondary text-[16px] font-normal -bottom-[2rem]">
              FazzPay is an application that focussing in banking needs for all users <br />
              in the world. Always updated and always following world trends. <br />
              5000+ users registered in FazzPay everyday with worldwide <br />
              users coverage.
            </p>
          </div>
        </div>
			</div>
		</>
	);
}
