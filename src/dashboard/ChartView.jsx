import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './ChartView.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartView({ transactions }) {
    // 1. Filter out income, keep only expenses
    const expenses = transactions.filter(t => t.type === 'expense');

    // 2. Group expenses by description (acting as our category for now)
    // 2. Group expenses by Category instead of description!
    const groupedData = expenses.reduce((acc, t) => {
        // Look at t.category instead of t.description
        const key = t.category || 'Uncategorized'; 
        
        acc[key] = (acc[key] || 0) + Math.abs(t.amount);
        return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const dataValues = Object.values(groupedData);

    // 3. Set up the Chart.js data object
    const data = {
        // If there are no expenses, show a gray "No data" slice
        labels: labels.length > 0 ? labels : ['No expenses yet'],
        datasets: [
            {
                data: dataValues.length > 0 ? dataValues : [1],
                backgroundColor: dataValues.length > 0 ? [
                    '#2ecc71', // Green
                    '#3498db', // Blue
                    '#e74c3c', // Red
                    '#f1c40f', // Yellow
                    '#9b59b6', // Purple
                    '#e67e22', // Orange
                    '#1abc9c'  // Teal
                ] : ['#ECEFF2'], // Gray for empty state
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    // 4. Configure the chart's appearance
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%', // This controls how thin the donut ring is
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true, // Uses circles instead of boxes in the legend
                    padding: 20,
                    color: '#516778',
                    font: {
                        family: "'dm-sans', sans-serif",
                        size: 13
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        if (dataValues.length === 0) return ' No data';
                        const value = context.raw;
                        return ` ₦${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    }
                },
                padding: 12,
                backgroundColor: 'rgba(25, 30, 36, 0.9)',
                bodyFont: {
                    family: "'dm-sans', sans-serif",
                    size: 14
                }
            }
        }
    };

    return (
        <div className="chart-view-container">
            <div className="chart-header">
                <h2>Spending by Category</h2>
            </div>
            <div className="donut-wrapper">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
}

export default ChartView;