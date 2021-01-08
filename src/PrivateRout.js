import React from "react";
import {Route,Redirect} from "react-router-dom"

function PrivateRout({ isAuth, component: Component,...rest} ) {
    return (
        <Route 
          {...rest}
          render={(props) => {
              if(isAuth){
                 return <Component />;
              }else{
                return ( <Redirect to={{ pathname:"/", state: { from:props.location } }} />);
              }  
          }}  
          exact
        />
    );
}

export default PrivateRout;