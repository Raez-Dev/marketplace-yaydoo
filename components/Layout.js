import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
  ThemeProvider,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import useStyles from '../utils/styles';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  const classes = useStyles();

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  const productsClickHandler = () => {
    setAnchorEl(null);
    router.push('/products');
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - MarketPlace-Yaydoo` : 'MarketPlace-Yaydoo'}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>
                  MarketPlace Yaydoo
                </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.fullName}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={productsClickHandler}>
                      Products
                    </MenuItem>

                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>Copyright Yaydoo</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
