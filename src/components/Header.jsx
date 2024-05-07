import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { SetRoofTopState } from '../redux/slices/rooftop-slice';

// const pages = ['ROOF-INSPECTION', 'CHECKLIST', 'CUSTOM-FORM', 'ABOUT'];
const formPages = ['ROOF-FORMS'/* , 'CHECKLIST-FORMS', 'CUSTOM-FORMS' */];

const Header = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.rooftop);
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }} disableGutters>
            <div style={{ display: 'flex' }}>
              <ArrowBackIcon style={{ paddingRight: '50px' }} onClick={() => navigate('/')}/>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',

                }}
              >
                HAMILTION ROOFING CO.
              </Typography>
            </div>
            {userId && <LogoutIcon onClick={() => {
              dispatch(SetRoofTopState({ field: 'userId', value: '' }));
              navigate('/signin');
            }} />}
          </Toolbar>
        </Container>
      </AppBar>
      {
        userId && <AppBar position="static" color="default" >
          <Toolbar sy={{ height: '10px' }} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(page.toLowerCase())}
                  sx={{ color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {formPages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(page.toLowerCase())}
                  sx={{ color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </div>
          </Toolbar>
        </AppBar>
      }
    </>
  );
}
export default Header;