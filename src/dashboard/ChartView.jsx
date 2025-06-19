import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title  } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const ChartView = ({ transactions }) => {
    const amounts = transactions.map((t) => t.amount);
    const income = amounts.filter((amt) => amt > 0).reduce((a, b) => a + b, 0);
    const expense = amounts.filter((amt) => amt < 0).reduce((a, b) => a + b, 0);

    const data = {
        labels: ["income", "expenses"],
        datasets: [
            {
                label: "₦ amount",
                data: [income, Math.abs(expense)],
                backgroundColor: ["#2ecc71", "#e74c3c"],
                borderRadius: 8,
            },
        ],
    };

    return (
        <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
            <Bar data={data} />
        </div>
    );
};

export default ChartView;