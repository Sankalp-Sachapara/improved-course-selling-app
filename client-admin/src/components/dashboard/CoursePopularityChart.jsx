import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, useTheme } from '@mui/material';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

/**
 * A component for displaying course popularity in a pie chart
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Course data to display
 * @param {boolean} props.loading - Whether the chart is in loading state
 * @returns {JSX.Element} - Course popularity chart component
 */
const CoursePopularityChart = ({ data, loading }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    // If loading or no data, don't render the chart
    if (loading || !data || data.length === 0) return;

    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get chart context
    const ctx = chartRef.current.getContext('2d');

    // Colors for different courses
    const backgroundColors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      // Add more colors for additional courses
      '#8884d8',
      '#82ca9d',
      '#ffc658',
      '#ff8042',
      '#a4de6c'
    ];

    // Prepare data
    const labels = data.map(course => course.name);
    const values = data.map(course => course.students);

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors.slice(0, data.length),
            borderColor: theme.palette.background.paper,
            borderWidth: 2,
            hoverOffset: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 15,
              padding: 10,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} students (${percentage}%)`;
              }
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
    return <Skeleton variant="circular" width="100%" height={300} />;
  }

  return (
    <Box sx={{ height: 300, position: 'relative' }}>
      <canvas ref={chartRef} />
    </Box>
  );
};

CoursePopularityChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      students: PropTypes.number.isRequired
    })
  ),
  loading: PropTypes.bool
};

CoursePopularityChart.defaultProps = {
  data: [],
  loading: false
};

export default CoursePopularityChart;
