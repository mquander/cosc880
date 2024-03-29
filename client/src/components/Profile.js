import React from "react";
import '../App.css';
//import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
//import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
//import RemoveIcon from '@mui/icons-material/Remove';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState} from "react"; //, useEffect 
import {  useNavigate } from "react-router";
import { UserContext } from "../App";
import axios from "axios";
//import BasicComponent from "../BasicComponent";
//import { Navigate } from "react-router-dom";


const theme = createTheme();
var userData;  


function Profile() {
  const { user, setUser} = useContext(UserContext); console.log(user) //
  const [open, setOpen] = useState(false);
  //const { loggedInUser } = useContext(UserContext); console.log(loggedInUser)
//   const navigate = useNavigate();
//   const location = useLocation();
  const navigate = useNavigate();
  
  function removeCrypto(x){
    //user.loggedInUserData.watchList.cryptos.splice(x,1); 
    userData.watchList.cryptos.splice(x,1); 
    setUser({loggedInUserData: userData});
    var paramsObj = user.loggedInUserData
    axios.post("/update", {}, {params: paramsObj}).then(res => {
      console.log("watchlist updated (from Profile): ")
      //console.log(res)
      if(res.status < 400){
        //setUser({ loggedIn: true });
        setOpen(true);
        //alert("Updated crypto watchlist ok")
        // const navigate = useNavigate();
        // return navigate("/", { replace: true })
      }
    }).catch(error => {
      alert("Updated crypto watchlist failed")
      console.log(error.response.data)
      //alert(error.response.data)
    })
  }
  
  function removeIndex(x){
    userData.watchList.indexes.splice(x,1); 
    setUser({loggedInUserData: userData})
    var paramsObj = user.loggedInUserData

    axios.post("/update", {}, {params: paramsObj}).then(res => {
      console.log("watchlist updated (from Profile): ")
      //console.log(res)
      if(res.status < 400){
        //setUser({ loggedIn: true });
        setOpen(true);
        //alert("Updated index watchlist ok")
        // const navigate = useNavigate();
        // return navigate("/", { replace: true })
      }
    }).catch(error => {
      alert("Updated index watchlist failed")
      console.log(error.response.data)
      //alert(error.response.data)
    })
  }

  function deleteProfile(){
    // display confirm notification
    // https://mui.com/material-ui/react-dialog/  to confirm deleting account
    var confirmation = window.confirm("Confirm Account Deletion?")
    if(confirmation){
      var paramsObj = user.loggedInUserData
      axios.post("/delete", {}, {params: paramsObj}).then(res => {
      console.log("user "+user.loggedInUserData.fname+" deleted (from Profile): ")
      //console.log(res)
      setUser({loggedInUserData: ''})
      setUser({loggedIn: false})
      if(res.status < 400){
        
        //alert("User deleted ok")
        // const navigate = useNavigate();
         return navigate("/", { replace: true })
      }
      }).catch(error => {
        alert("User deleted failed")
        console.log(error.response.data)
       // alert(error.response.data)
      })
    }
    
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
//   useEffect(() => {
//     if(user.loggedIn){
//       userData = user.loggedInUserData;
//     }else{
//       //setUser({ loggedIn: false , loggedInUserData: {}});
//       console.log("in useEffect false Profile")
//       return navigate("/login", { replace: true })
//     }
    
// })

  if(user.loggedIn){
      userData = user.loggedInUserData;
  }else{
    console.log("in loggedIn==false Profile")
     //return  navigate("/login")
  }
  //console.log(userData)
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} >
            <Typography sx={{border: 1, borderColor: 'primary', py: 2, px: 1 }}  
              textAlign="left"
              margin="normal"
              fullwidth="true">
              First Name: {userData.fname}                           
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} >
            <Typography sx={{border: 1, borderColor: 'primary', py: 2, px: 1  }}
              textAlign="left"
              margin="normal"
              fullwidth="true">
              Last Name: {userData.lname}                         
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} >
            <Typography sx={{border: 1, borderColor: 'primary', py: 2, px: 1  }}
              textAlign="left"
              margin="normal"
              fullwidth="true">
              Email: {userData.email}                            
            </Typography>
            </Grid>
            <Grid  item xs={12} sm={12}  style={{ fontSize: '18px' , textAlign:"center"}}>
              Watchlist
            </Grid>
            <Grid item xs={12} sm={12} container direction="row">
            
              <Grid  container direction="column" wrap='nowrap' item xs={'auto'} sm={6}  style={{ fontSize: '18px' }}>
                <Typography sx={{border:  1, borderColor: 'primary', borderRadius: '16px', py: 2, px: 1  }}
                  textAlign="left"
                  margin="normal"
                  fullwidth="true">
                   <Typography component={"span"} sx={{textDecoration: 'underline'}} display="inline">Cryptos: </Typography> 
                   {userData.watchList.cryptos.map((a,i) =>  //  tempArray1
                             <li key={i}> {a} <Tooltip title="Delete item"><IconButton onClick={() => {removeCrypto(i);}}><RemoveCircleOutlineIcon size="small" sx={{ color: 'red' }}/></IconButton></Tooltip></li>
                            //<li key={i}>{a}</li>
                            )}  
                  
                  {/* <br/>Indexes: {userData.watchList.indexes.map((a,i) =>  //  tempArray1
                                //<li key={i}> {a}<IconButton><RemoveCircleOutlineIcon size="small" sx={{ color: 'red' }} onClick={() => {userData.watchList.indexes.splice(i,1); setUser({loggedInUserData: userData})}}/></IconButton></li>
                                <li key={i}>{a}</li>
                            )}                           */}
                </Typography>
              </Grid>

                <Grid container direction="column" wrap='nowrap' item xs={'auto'} sm={6}  style={{ fontSize: '18px' }}>

                <Typography  sx={{border: 1, borderColor: 'primary', borderRadius: '16px', py: 2, px: 1  }}
                  textAlign="left"
                  margin="normal"
                  fullwidth="true">
                  {/* Watchlist <br/>Cryptos: {userData.watchList.cryptos.map((a,i) =>  //  tempArray1
                                //<li key={i}> {a}<IconButton><RemoveCircleOutlineIcon size="small" sx={{ color: 'red' }} onClick={() => {userData.watchList.cryptos.splice(i,1); setUser({loggedInUserData: userData})}}/></IconButton></li>
                            <li key={i}>{a}</li>
                            )}   */}
                  
                  <Typography component="span" sx={{textDecoration: 'underline'}} display="inline">Indexes: </Typography>
                  {userData.watchList.indexes.map((a,i) =>  //  tempArray1
                                <li key={i}> {a} <Tooltip title="Delete item"><IconButton onClick={() => {removeIndex(i);}}><RemoveCircleOutlineIcon size="small" sx={{ color: 'red' }}/></IconButton></Tooltip></li>
                                //<li key={i}>{a}</li>
                            )}                          
                </Typography>


                </Grid>



            </Grid>
            </Grid>
            <Grid container>
              
            </Grid>
          </Box>
          <Button variant="outlined"  color="error" sx={{mt: 4}} onClick={()=>{deleteProfile()}} startIcon={<DeleteIcon/>}>
              Delete Account
          </Button>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert  variant="outlined" onClose={handleClose} severity="success" sx={{ width: '100%' , color: "green"}}>
              Successfully removed
            </Alert>
          </Snackbar>
          <Box sx={{marginBottom: 8}}></Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


// function CustomizedSnackbars() {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <Stack spacing={2} sx={{ width: '100%' }}>
//       <Button variant="outlined" onClick={handleClick}>
//         Open success snackbar
//       </Button>
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//           This is a success message!
//         </Alert>
//       </Snackbar>
//     </Stack>
//   );
// }
export default Profile;