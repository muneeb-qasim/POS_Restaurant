import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Row, Col} from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';

import { useHistory} from 'react-router-dom';
import ButtonMain from 'components/CustomButtons/Button.js';
import saleApi from '../api/Order';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  row: {
    marginTop: '8%',
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const history = useHistory();

  const [totSaleDay, setTotSaleDay] = React.useState();
  const [totBills, setTotBills] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    (async () => {
      const token = localStorage.getItem('jwt');
      const bearerToken = 'Bearer ' + token;
      const result = await saleApi.getTotSale(bearerToken);
      //  console.log(result.data[0].count);
      setTotSaleDay(result.data[0].total);
      setTotBills(result.data[0].count);
    })();
  }, [totBills, totSaleDay]);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem
        onClick={() => {
          localStorage.clear();
          history.push('/Login');
        }}
      >
        LogOut
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            POS Restaurant
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div className={classes.row}>
        <Row className="justify-content-md-center">
          <Col md={{span: 3}}>
            <Card className={classes.root}>
              <CardActionArea>
                <Icon style={{fontSize: 80, color: '#DC143C'}}>moving</Icon>
                <CardContent>
                  <Typography
                    gutterBottom
                    align="center"
                    variant="h3"
                    component="h2"
                  >
                    {totSaleDay}
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                    color="textSecondary"
                    component="p"
                  >
                    {' '}
                    Total Sale of the Day
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions style={{justifyContent: 'center'}}>
                <ButtonMain
                  color="danger"
                  onClick={() => history.push('/BillReport')}
                  round
                >
                  View
                </ButtonMain>
              </CardActions>
            </Card>
          </Col>
          <Col md={{span: 3, offset: 1}}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent>
                  <Icon style={{fontSize: 80, color: '#CCCC00'}}>loyalty</Icon>
                  <Typography
                    gutterBottom
                    align="center"
                    variant="53"
                    component="h2"
                  >
                    New Order
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    component="p"
                  >
                    Click below for New Orders
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions style={{justifyContent: 'center'}}>
                <ButtonMain
                  onClick={() => history.push('/NewOrder')}
                  color="warning"
                  round
                >
                  New Order
                </ButtonMain>
              </CardActions>
            </Card>
          </Col>
          <Col md={{span: 3, offset: 1}}>
            <Card className={classes.root}>
              <CardActionArea>
                <Icon style={{fontSize: 80, color: '#DC143C'}}>
                  receipt_long
                </Icon>
                <CardContent>
                  <Typography
                    gutterBottom
                    align="center"
                    variant="h3"
                    component="h2"
                  >
                    {totBills}
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    component="p"
                  >
                    Total Bills
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions style={{justifyContent: 'center'}}>
                <ButtonMain
                  onClick={() => history.push('/BillReport')}
                  color="danger"
                  round
                >
                  View
                </ButtonMain>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
