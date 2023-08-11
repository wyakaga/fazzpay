import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function BarChart({ listIncome, listExpense }) {

	const chartContainer = useRef(null);
	const chartRef = useRef(null);

	useEffect(() => {
		if (chartContainer && chartContainer.current) {
			if (chartRef.current !== null) {
				chartRef.current.destroy();
			}

			const incomeData = listIncome.map((result) => result.total);
			const expenseData = listExpense.map((result) => result.total);

			chartRef.current = new Chart(chartContainer.current, {
				type: "bar",
				data: {
					labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
					datasets: [
						{
							label: "Income per day",
							data: listIncome && incomeData,
							backgroundColor: "#1ec15f",
						},
						{
							label: "Expense per day",
							data: listExpense && expenseData,
							backgroundColor: "#ff8469",
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: "top",
						},
						title: {
							display: true,
							text: "Financial Data Per Day",
						},
					},
				},
			});
		}
	}, [chartContainer, listIncome, listExpense]);

	return <canvas ref={chartContainer} id="acquisitions"></canvas>;
}

export default BarChart;
