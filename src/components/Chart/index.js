import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { getData } from "@/utils/https/transaction";

function BarChart() {
	const chartContainer = useRef(null);
	const chartRef = useRef(null);

	const [listIncome, setListIncome] = useState([]);
	const [listExpense, setListExpense] = useState([]);

	const userId = useSelector((state) => state.auth.data.id);
	const token = useSelector((state) => state.auth.data.token);

	useEffect(() => {
		getData(userId, token).then((res) => {
			setListIncome(res["data"]["data"]["listIncome"]);
			setListExpense(res["data"]["data"]["listExpense"]);
		});
	}, [userId, token]);

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
							data: incomeData,
							backgroundColor: "#1ec15f",
						},
						{
							label: "Expense per day",
							data: expenseData,
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
