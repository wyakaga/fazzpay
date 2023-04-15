export default function Header() {
  return (
    <>
      <div className="navbar lg:px-28 px-4 py-6 font-nunitoSans bg-fazzpay-primary/80 fixed top-0 left-0 z-50">
        <div className="navbar-start">
          <p className="text-3xl text-fazzpay-secondary font-bold">FazzPay</p>
        </div>
        <div className="navbar-end flex flex-row lg:gap-x-5 gap-x-2">
          <div className="btn lg:w-1/6 normal-case bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary">Login</div>
          <div className="btn lg:w-1/6 normal-case bg-fazzpay-primary text-fazzpay-secondary hover:bg-fazzpay-secondary hover:text-fazzpay-primary">Sign Up</div>
        </div>
      </div>
    </>
  )
}