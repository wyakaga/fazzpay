export default function Loader() {
	return (
		<div>
			<div className="absolute font-nunitoSans bg-gray-700/80 z-10 h-full w-full flex items-center justify-center">
				<div className="flex items-center">
					<p className="text-8xl mr-4 text-fazzpay-secondary">Loading</p>
					<svg
						className="animate-spin h-20 w-20 text-fazzpay-primary"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="text-fazzpay-primary/25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="text-fazzpay-primary/75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</div>
			</div>
		</div>
	);
}
