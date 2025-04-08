import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Chip,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { format } from 'date-fns';

/**
 * Component to display recent course enrollments in a table
 * 
 * @param {Object} props - Component props
 * @param {Array} props.enrollments - List of enrollment data to display
 * @param {boolean} props.loading - Whether the data is loading
 * @returns {JSX.Element} Recent enrollments table component
 */
const RecentEnrollments = ({ enrollments, loading }) => {
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Box>
        {[...Array(5)].map((_, index) => (
          <Skeleton 
            key={index} 
            variant="rectangular" 
            width="100%" 
            height={53}
            sx={{ mb: 0.5, borderRadius: 1 }}
          />
        ))}
      </Box>
    );
  }

  if (enrollments.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          No recent enrollments found
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table aria-label="recent enrollments table">
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrollments.map((enrollment) => (
            <TableRow
              key={enrollment.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link
                  component={RouterLink}
                  to={`/students/${enrollment.studentId || '1'}`}
                  color="inherit"
                  underline="hover"
                >
                  {enrollment.student}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  component={RouterLink}
                  to={`/courses/${enrollment.courseId || '1'}`}
                  color="inherit"
                  underline="hover"
                >
                  {enrollment.course}
                </Link>
              </TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={formatDate(enrollment.date)}
                  sx={{ 
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.08)' 
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Typography 
                  variant="body2" 
                  fontWeight="500"
                  color="success.main"
                >
                  {formatCurrency(enrollment.amount)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

RecentEnrollments.propTypes = {
  enrollments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      student: PropTypes.string.isRequired,
      courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      course: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ),
  loading: PropTypes.bool
};

RecentEnrollments.defaultProps = {
  enrollments: [],
  loading: false
};

export default RecentEnrollments;
