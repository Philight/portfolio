import React from "react";
//import { Router, Route, Routes } from 'react-router-dom';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { HashRouter, Route, Routes } from 'react-router-dom';

import LandingPage from "@pages/LandingPage.js";
import LandingLayout from "@layouts/LandingLayout.js";
import ScrollToTop from "@utils/ScrollToTop.js";

import { VARIABLES } from "@data/ENV.js";

import "./assets/css/App.css";

const App = () => {
   return (
      <BrowserRouter basename={VARIABLES.BASENAME}>
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