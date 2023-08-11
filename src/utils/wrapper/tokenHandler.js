import React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import { authAction } from "@/redux/slices/auth";
import { userAction } from "@/redux/slices/user";
import { transactionAction } from "@/redux/slices/transaction";

function TokenHandler(WrappedComponent) {
  const Auth = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.data.token);

    React.useEffect(() => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          dispatch(authAction.remove());
          dispatch(userAction.reset());
          dispatch(transactionAction.reset());
          router.push("/login");
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return <WrappedComponent {...props} />;
  };

  return Auth;
}

export default TokenHandler;
