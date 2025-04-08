import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, useTheme } from '@mui/material';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

/**
 * A component for displaying recent sales data in a line chart
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Sales data to display
 * @param {boolean} props.loading - Whether the chart is in loading state
 * @returns {JSX.Element} - Recent sales chart component
 */
const RecentSalesChart = ({ data, loading }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    // If loading or no data, don't render the chart
    if (loading || !data || data.length === 0) return;

    // Format dates and amounts for the chart
    const dates = data.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    const amounts = data.map(item => item.amount);

    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get chart context
    const ctx = chartRef.current.getContext('2d');

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Revenue',
            data: amounts,
            backgroundColor: theme.palette.primary.main + '20', // 20% opacity
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: theme.palette.primary.main,
            pointBorderColor: theme.palette.background.paper,
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context) => `$${context.parsed.y}`
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `$${value}`
            }
          }
        }
      }
    });

    // Clean up chart instance on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, loading, theme]);

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height={300} />;
  }

  return (
    <Box sx={{ height: 300, position: 'relative' }}>
      <canvas ref={chartRef} />
    </Box>
  );
};

RecentSalesChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ),
  loading: PropTypes.bool
};

RecentSalesChart.defaultProps = {
  data: [],
  loading: false
};

export default RecentSalesChart;
