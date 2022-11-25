import React, { useEffect, useState } from "react";
import { authService } from "./authService";
import { useRouter } from "next/router";

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
  await timeout(1000);
  return fn(...args);
}

export function withSession(handleSession) {
  return async (ctx) => {
    try { 
      await sleep(() => {}, 1000);

      const session = await authService.getSession(ctx)

      const modifiedCtx = {
        ...ctx,
        req: { 
          ...ctx.req,
          session
        }
      };

      return handleSession(modifiedCtx);
    } catch (err) {
      return { 
        redirect: {
          permanent: false,
          destination: '/?error=401'
        }
      }      
    }
  }
}

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      authService.getSession()
      .then((respostaDoServidor) => {
        setSession(respostaDoServidor);
      })
      .catch((error) => {
        console.log(error);
        setError(error)
      })
      .finally(() => {
        setLoading(false);
      })
    }, 1000)
  }, []);

  return { 
    data: {
      session,
    },
    error,
    loading
  };
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const router = useRouter();
    const session = useSession();
    
    console.log(session);

    if (session === null || session?.error) {
      console.log(session?.error);
      router.push("/?error=401");
    }
    
    const modifiedProps = {
      ...props,
      session: session?.data?.session,
      loading: session?.loading ?? true
    };

    return (
      <Component {...modifiedProps} />
    )
  }
}
