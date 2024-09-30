import axios from "axios";
import buildClient from "../api/buildClient";
 const LandingPage = ({currentUser}) => {
  console.log("im in compo",currentUser);
  
  return currentUser?(
    <h1>u r SIGN IN</h1>
  ):(
    <h1>u r NOT SIGN IN</h1>
  )
 
}

LandingPage.getInitialProps = async (context) => {
  // ingress-nginx-controller 
  console.log("index.ts");
  
 const {data} = await buildClient(context).get('/api/users/currentUser')
 return data;
}

export default LandingPage