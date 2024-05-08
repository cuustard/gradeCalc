var chart;
var userPercent = [];

document.addEventListener("DOMContentLoaded", function () {
	const courseWorkInput = document.getElementById("courseWorkMark");
	const examInput = document.getElementById("examMark");
	const courseWorkMarkSpan = document.getElementById("courseworkMarkSpan");
	const examMarkSpan = document.getElementById("examMarkSpan");
	const result = {};
	const courseWorkPercent = {};
	const examPercent = {};
	const totalPercent = {};

	courseWorkInput.addEventListener("input", calculateGrade);
	examInput.addEventListener("input", calculateGrade);

	["2017", "2018", "2019", "2020", "2021", "2022", "2023"].forEach((year) => {
		result[year] = document.getElementById(`result${year}`);
		courseWorkPercent[year] = document.getElementById(`courseWorkPercent${year}`);
		examPercent[year] = document.getElementById(`examPercent${year}`);
		totalPercent[year] = document.getElementById(`totalPercent${year}`);
	});

	const gradeRanges = {
		2017: [
			{ min: 284, grade: "A*" },
			{ min: 246, grade: "A" },
			{ min: 208, grade: "B" },
			{ min: 171, grade: "C" },
			{ min: 134, grade: "D" },
			{ min: 97, grade: "E" },
			{ min: 0, grade: "U" },
		],
		2018: [
			{ min: 276, grade: "A*" },
			{ min: 238, grade: "A" },
			{ min: 202, grade: "B" },
			{ min: 167, grade: "C" },
			{ min: 132, grade: "D" },
			{ min: 97, grade: "E" },
			{ min: 0, grade: "U" },
		],
		2019: [
			{ min: 285, grade: "A*" },
			{ min: 250, grade: "A" },
			{ min: 212, grade: "B" },
			{ min: 174, grade: "C" },
			{ min: 137, grade: "D" },
			{ min: 100, grade: "E" },
			{ min: 0, grade: "U" },
		],
		2020: [
			{ min: 202, grade: "A*" },
			{ min: 171, grade: "A" },
			{ min: 139, grade: "B" },
			{ min: 107, grade: "C" },
			{ min: 76, grade: "D" },
			{ min: 45, grade: "E" },
			{ min: 0, grade: "U" },
		],
		2021: [
			{ min: 191, grade: "A*" },
			{ min: 165, grade: "A" },
			{ min: 135, grade: "B" },
			{ min: 105, grade: "C" },
			{ min: 75, grade: "D" },
			{ min: 45, grade: "E" },
			{ min: 0, grade: "U" },
		],
		2022: [
			{ min: 264, grade: "A*" },
			{ min: 229, grade: "A" },
			{ min: 189, grade: "B" },
			{ min: 150, grade: "C" },
			{ min: 111, grade: "D" },
			{ min: 72, grade: "E" },
			{ min: 0, grade: "U" },
		],
		2023: [
			{ min: 286, grade: "A*" },
			{ min: 251, grade: "A" },
			{ min: 209, grade: "B" },
			{ min: 167, grade: "C" },
			{ min: 126, grade: "D" },
			{ min: 85, grade: "E" },
			{ min: 0, grade: "U" },
		],
	};

	calculateGrade();

	function getGrade(overallGrade, year) {
		return gradeRanges[year].find((range) => overallGrade >= range.min).grade;
	}
	function calculateGrade() {
		userPercent.length = 0;
		const courseWorkMarkValue = parseInt(courseWorkInput.value, 10);
		const examMarkValue = parseInt(examInput.value, 10);

		const courseWorkPercentValue = (courseWorkMarkValue / 70) * 100;
		const examPercentValue = (examMarkValue / 280) * 100;

		// Write the percentages to the elements with IDs 'courseworkPercent' and 'examPercent'
		document.getElementById("courseworkPercent").textContent = `${courseWorkPercentValue.toFixed(2)}%`;
		document.getElementById("examPercent").textContent = `${examPercentValue.toFixed(2)}%`;
		courseWorkMarkSpan.textContent = courseWorkMarkValue + "/70";
		examMarkSpan.textContent = examMarkValue + "/280";

		for (let year in result) {
			let overallGrade;
			if (year === "2020" || year === "2021") {
				overallGrade = examPercentValue * 2.8;
				totalPercent[year].textContent = `${examPercentValue.toFixed(2)}%`;
			} else {
				overallGrade = (courseWorkPercentValue * 0.2 + examPercentValue * 0.8) * 3.5;
				totalPercent[year].textContent = `${(courseWorkPercentValue * 0.2 + examPercentValue * 0.8).toFixed(
					2
				)}%`;
			}
			userPercent.push(parseFloat(totalPercent[year].textContent));
			result[year].textContent = getGrade(overallGrade, year);
		}
		if (chart) {
			chart.data.datasets[0].data = [...userPercent];
			chart.update("none");
		}
	}
});

// PLOTTING
// Define the data directly in JavaScript
var years = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
var grades = ["A*", "A", "B", "C", "D", "E", "U"];
var data = [
	[81.14, 78.86, 81.43, 72.14, 68.21, 75.43, 81.71],
	[70.29, 68.0, 71.43, 61.07, 58.93, 65.43, 71.71],
	[59.43, 57.71, 60.57, 49.64, 48.21, 54.0, 59.71],
	[48.86, 47.71, 49.71, 38.21, 37.5, 42.86, 47.71],
	[38.29, 37.71, 39.14, 27.14, 26.79, 31.71, 36.0],
	[27.71, 27.71, 28.57, 16.07, 16.07, 20.57, 24.29],
	[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
];

var ctx = document.getElementById("myChart").getContext("2d");

var colors = ["green", "lime ", "yellow", "orange", "orangered", "red", "darkred"];

chart = new Chart(ctx, {
	type: "line",
	data: {
		labels: years,
		datasets: [
			{
				label: "User Results",
				data: userPercent,
				fill: false,
				borderColor: "black",
				tension: 0,
			},
			...grades.map((grade, i) => ({
				label: grade,
				data: data[i],
				fill: false,
				borderColor: colors[i % colors.length],
				tension: 0,
			})),
		],
	},
	options: {
		responsive: false,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Grade Boundaries Over the Years vs Overall Grade (%)",
			},
		},
		scales: {
			y: {
				min: 0,
				max: 100,
			},
		},
	},
});
