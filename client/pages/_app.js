import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../components/Header';

const AppComponent = ({Component, pageProps,currentUser}) => {
   return (
   <div>
      <Header currentUser={currentUser}/>
      <Component {...pageProps} />
   </div>
   )
}

AppComponent.getInitialProps = async (appContext) => {


   
   const {data} = await buildClient(appContext.ctx).get('/api/users/currentUser');
   let pageProps={};
   if (appContext.Component.getInitialProps){
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
   }
   console.log("pge",pageProps,"page end");
  
   return {
      pageProps,
      ...data
   }
   
}

export default  AppComponent;