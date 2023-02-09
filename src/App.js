import React from "react";
//import { Router, Route, Routes } from 'react-router-dom';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { HashRouter, Route, Routes } from 'react-router-dom';

import DataContext from '@contexts/DataContext.js';

import LandingPage from "@pages/LandingPage.js";
import LandingLayout from "@layouts/LandingLayout.js";
import ScrollToTop from "@components/util/ScrollToTop.js";

import { VARIABLES } from "@data/ENV.js";

//import { config as APP_CONFIG } from "../package.json";
//import { config } from "../package.json";
import PACKAGE_JSON from "../package.json";

import "./assets/css/App.css";


const App = () => {
   const [contextData, setContextData] = React.useState({  });

   React.useEffect(() => {
      console.log('##APP PACKAGEJSON');  
      console.log(PACKAGE_JSON['config']['port']);  
      console.log(PACKAGE_JSON['config']['API_HOST']);  
   })

   return (
      <DataContext.Provider value={{...contextData, setContextData}}>
      {/*
         <BrowserRouter basename={VARIABLES.BASENAME}>
      */}
         <BrowserRouter basename={PACKAGE_JSON['config']['BASENAME']}>
            <ScrollToTop>
               <Routes>
                  {/*<RouteWrapper exact path="/" component={LandingPage} layout={LandingLayout} />*/}
                  <Route exact path="/" element={<LandingLayout><LandingPage /></LandingLayout>} />

      {/*
                  <Route exact path="/" render={(props) =>
                     <LandingLayout {...props}>
                        <LandingPage {...props} />
                     </LandingLayout>
                  } />
      */}
               </Routes>
            </ScrollToTop>
        </BrowserRouter>
      </DataContext.Provider>
   )
   
};

function RouteWrapper({ component: Component, layout: Layout, ...rest}) {
   return (
      <Route {...rest} render={(props) =>
         <Layout {...props}>
            <Component {...props} />
         </Layout>
      } />
  )
}

export default App;