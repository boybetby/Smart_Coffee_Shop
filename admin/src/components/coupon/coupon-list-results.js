import { useState, useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import CouponModal from './couponModal';

export const CouponListResults = ({ coupons, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [modalShow, setModalShow] = useState(false);
  const [couponDetail, setCouponDetail] = useState();

  const handleClick = useCallback((coupon) => {
    setCouponDetail(coupon)
    setModalShow(true)
  }, [couponDetail])


  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = coupons.map((coupon) => coupon._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
  };

  return (
    <>
      {couponDetail ? (<CouponModal 
          show={modalShow}
          onHide={() => setModalShow(false)}
          coupon={couponDetail}
      />) : (<div></div>)}

      {/* coupon */}
      <h4 style={{marginTop: "30px"}}>Public</h4>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === coupons.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0
                        && selectedCustomerIds.length < coupons.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    Id
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Apply to
                  </TableCell>
                  <TableCell>
                    Usage
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.public.slice(page * limit, page * limit + limit).map((coupon) => (
                  <TableRow
                    hover
                    key={coupon._id}
                    selected={selectedCustomerIds.indexOf(coupon.id) !== -1}
                    onClick={() => handleClick(coupon)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(coupon._id) !== -1}
                        onChange={(event) => handleSelectOne(event, coupon._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell width={"200px"}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {coupon._id}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell width={"300px"}>
                      {coupon.couponName}
                    </TableCell>
                    <TableCell>
                      {coupon.applyTo}
                    </TableCell>
                    <TableCell>
                      {coupon.usage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={coupons.public.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      
      {/* user coupon */}
      <h4 style={{marginTop: "30px"}}>Account</h4>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === coupons.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0
                        && selectedCustomerIds.length < coupons.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    Id
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Apply to
                  </TableCell>
                  <TableCell>
                    Usage
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.account.slice(page * limit, page * limit + limit).map((coupon) => (
                  <TableRow
                    hover
                    key={coupon._id}
                    selected={selectedCustomerIds.indexOf(coupon.id) !== -1}
                    onClick={() => handleClick(coupon)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(coupon._id) !== -1}
                        onChange={(event) => handleSelectOne(event, coupon._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell width={"200px"}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {coupon._id.trim()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell width={"300px"}>
                      {coupon.couponName}
                    </TableCell>
                    <TableCell>
                      {coupon.applyTo}
                    </TableCell>
                    <TableCell>
                      {coupon.usage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={coupons.account.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

CouponListResults.propTypes = {
  coupons: PropTypes.object.isRequired
};
