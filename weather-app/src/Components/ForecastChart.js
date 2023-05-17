import { Bar } from "react-chartjs-2";

function ForecastChart({ chartData }) {
  return (
    <div className="ml-4 border-white border-y border-r" >
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default ForecastChart;