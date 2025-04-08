import PropTypes from 'prop-types';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';

/**
 * A component for displaying dashboard statistics
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Value to display
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.color - Icon and border color
 * @param {boolean} props.loading - Whether the card is in loading state
 * @returns {JSX.Element} - Dashboard card component
 */
const DashboardCard = ({ title, value, icon, color, loading = false }) => {
  return (
    <Card 
      className="dashboard-card" 
      sx={{ 
        height: '100%',
        borderTop: `4px solid ${color}`
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            
            {loading ? (
              <Skeleton variant="text" width={80} height={40} />
            ) : (
              <Typography variant="h4" component="div" fontWeight="bold">
                {value}
              </Typography>
            )}
          </Box>
          
          <Box 
            sx={{
              backgroundColor: `${color}15`, // 15% opacity
              borderRadius: '50%',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ color: color }}>
              {icon}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  loading: PropTypes.bool
};

DashboardCard.defaultProps = {
  color: '#3f51b5',
  loading: false
};

export default DashboardCard;
