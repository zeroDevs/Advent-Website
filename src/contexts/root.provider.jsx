import React from "react";

import { UserProvider } from "./user/user.context";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => <UserProvider>{children}</UserProvider>;
