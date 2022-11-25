import React from 'react';
import nookies from 'nookies';
import { withSession } from '../src/services/auth/session.decorator';
// import { tokenService } from '../src/services/auth/tokenService';

function AuthPageSSR(props) {
  return  (
    <div>
      <h1>
        Auth Page Server Side Render
      </h1>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre> 
    </div>
  )
}

export default AuthPageSSR;

// COM DECORATORS
export const getServerSideProps = withSession((ctx) => {
  return {
    props: { 
      session: ctx.req.session
    }
  }
})

// SEM DECORATORS
// export async function getServerSideProps(ctx) {
//   try {
//     const session = await authService.getSession(ctx);
//     console.log('session', session);
  
//     return {
//       props: {
//         session: session,
//       },
//     }
//   } catch (e) {
//     return { 
//       redirect: {
//         permanent: false,
//         destination: '/?error=401'
//       }
//     }
//   }
// }
