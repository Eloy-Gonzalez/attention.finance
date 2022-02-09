import React, { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  CssBaseline, 
  Box, 
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
  Link,
  Button,
  Modal } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider';
import axios from 'axios';
import WalletConnectIcon from './assets/walletconnect.svg';
import MetamaskIcon from './assets/metamask.svg';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://attentionfinance.andersa.repl.co/">
        Attention Finance
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

function Table(props) {
  return (
    <>
      <p>Balance account: { props.balance ? props.balance[0].account : 'Null' }</p>
      <span>{ props.balance ? props.balance[0].balance : '0' } ELA</span>
    </>
  )
}

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [currentAccount, setCurrentAccount] = React.useState('')
  const [isLogged, setIsLogged] = React.useState(false);
  const [balance, setBalance] = React.useState('');
  const [modalOpen, setmodalOpen] = React.useState(false);
  const handleOpen = () => setmodalOpen(true);
  const handleClose = () => setmodalOpen(false);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(`https://escscan.elaphant.app/api?module=account&action=balancemulti&address=${currentAccount}`);
      console.log(response.data);
      setBalance(response.data.result);
    }
    fetch();
  }, [currentAccount]);

	const shortAddr = () => {
		return `${currentAccount.substr(0,4)}...${currentAccount.substring(currentAccount.length - 4, currentAccount.length)}`
	}

	const SignInMetamask = async () => {
		//Detect Provider
		const provider = await detectEthereumProvider()
		const web3 = new Web3(provider)

		if(!provider) {
			alert("Metamash extension not found, Please install MetaMask extension");
		} else {
			const address = await ConnectWallet()
			if (address)
      console.log("User logged");
      console.log(address);
		}
	}

	const ConnectWallet = async () => {
    try {
      await window.ethereum.enable();
      const id = await window.ethereum.request({ method: 'eth_chainId' })
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
			setIsLogged(true)
      setCurrentAccount(accounts[0])
      console.log('Chainid', parseInt(id));
      console.log('Account', accounts[0]);
      return accounts[0]
    } catch(err) {
			if (err.code === 4001) {
				console.log('Please connect to MetaMask.')
			} else if(err.code === -32002) {
				console.log('Please unlock MetaMask.')
			} else {
				console.error(err);
			}
    }
  }

	const SignOut = async () => {
    setIsLogged(false)
    setCurrentAccount('')
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const modalStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
    cursor: 'pointer'
  };

  const SignInWalletConnector = async () => {
    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
    
      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
    
      // Delete connector
    });
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Attention Finance
            </Typography>
            <Button variant="primary" onClick={handleOpen}>Connect Wallet</Button>
						<Button onClick={SignOut} style={{visibility: isLogged ? "visible" : "hidden", color: 'white'}}>X</Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(80vh - 52px)',
                  }}
                >
                  {
                    currentAccount !== '' ?
                      <Table balance={balance} />
                      :
                      'Connect Wallet'
                  }
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">Select Wallet</Typography>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button style={modalStyles} variant="primary" onClick={SignInMetamask}>
              <img src={MetamaskIcon} alt="Metamask wallet" width="100px" />
              <Typography variant="h6" component="h2">Metamask</Typography>  
            </Button>
            <Button style={modalStyles} variant="primary" onClick={SignInWalletConnector}>
              <img src={WalletConnectIcon} alt="Wallet Connector" height="89px" />
              <Typography variant="h6" component="h2">WalletConnector</Typography>
            </Button>
          </div>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
