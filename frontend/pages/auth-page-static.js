import React from "react";
import MyLoader from "../components/loader";
import { withSessionHOC } from "../src/services/auth/session.decorator";

function AuthPageStatic(props) {
  // return props?.loading ? ( <div style={{ flex: 1, height: "1000px" , backgroundColor: "red" }}>Aguarde...</div> ) : (
  return props?.loading ? MyLoader() : (
    <div>
      <h1>
        Auth Page Static
      </h1>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre> 
    </div>
  )
}

export default withSessionHOC(AuthPageStatic);
