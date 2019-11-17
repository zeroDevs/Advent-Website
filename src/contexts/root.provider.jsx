import React from "react";

import { UserProvider } from "./user/user.context";

export default ({ children }) => <UserProvider>{children}</UserProvider>;
