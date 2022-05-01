import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { Users as UsersIcon } from '../icons/users';
import { Selector as Coupon } from '../icons/selector';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';



export const DashboardSidebar = (props) => {
  const {
    authState: { user },
    logoutUser
  } = useContext(AuthContext)

  let items = [
    {
      href: '/',
      icon: (<ChartBarIcon fontSize="small" />),
      title: 'Dashboard'
    },
    {
      href: '/customers',
      icon: (<UsersIcon fontSize="small" />),
      title: 'Customers'
    },
    {
      href: '/users',
      icon: (<UsersIcon fontSize="small" />),
      title: 'Users'
    },
    {
      href: '/products',
      icon: (<ShoppingBagIcon fontSize="small" />),
      title: 'Products'
    },
    {
      href: '/coupon',
      icon: (<Coupon fontSize="small" />),
      title: 'Coupons'
    },
    {
      href: '/data',
      icon: (<LockIcon fontSize="small" />),
      title: "Customer's data management"
    },
    {
      href: '/account',
      icon: (<UserIcon fontSize="small" />),
      title: 'Account'
    },
    {
      href: '/settings',
      icon: (<LockIcon fontSize="small" />),
      title: "Change password"
    }
  ];
  
  
  if(!user) {
    items = [
      {
        href: '/login',
        icon: (<LockIcon fontSize="small" />),
        title: 'Login'
      }
    ];
  }
  else if(user.role === 'ADMIN') {
    items = [
      {
        href: '/',
        icon: (<ChartBarIcon fontSize="small" />),
        title: 'Dashboard'
      },
      {
        href: '/products',
        icon: (<ShoppingBagIcon fontSize="small" />),
        title: 'Products'
      },
      
      {
        href: '/account',
        icon: (<UserIcon fontSize="small" />),
        title: 'Account'
      },
      {
        href: '/settings',
        icon: (<LockIcon fontSize="small" />),
        title: "Change password"
      }
    ];
  } 

  const handleClick = () => {
    logoutUser()
  }
  
  let content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Coffee Admin
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  <a onClick={handleClick}>Logout</a>
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        
      </Box>
    </>
  );

  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );


  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
