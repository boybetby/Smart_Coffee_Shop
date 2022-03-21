import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { useContext } from 'react';
import { ReportContext } from '../../contexts/reportContext';
import moment from 'moment'


export const LatestOrders = (props) =>{  
  const {
    reportState: { ordersReport }
  } = useContext(ReportContext)

  return(
    <Card {...props}>
      <CardHeader title="Latest Orders" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order Ref
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersReport.slice(0,6).map((order) => (
                <TableRow
                  hover
                  key={order._id}
                >
                  <TableCell>
                    {order._id.slice(0, 10) + (order._id.length > 5 ? "..." : "")}
                  </TableCell>
                  <TableCell>
                    {order.customer}
                  </TableCell>
                  <TableCell>
                    {/* {Sugar.Date.format(order.createAt, '{d} {Month}, {hh}:{mm}')} */}
                    {moment(order.createAt).format('MMMM DD YYYY, hh:mm A')}
                    {/* {order.createAt} */}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={(order.type === 'DELIVERY' && 'success')
                      || (order.type === 'OFFLINE' && 'warning')
                      || 'error'}
                    >
                      {order.type}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  )
};
