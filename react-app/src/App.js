import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom"
import { authenticate } from "./services/auth";
import { Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import LoginSigninPage from "./components/Auth/LoginSigninPage";
import HomePage from "./components/HomePage";
import { AuthProvider } from "./services/AuthProvider";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isFirstVisit, setIsFistVisit] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      console.log(user.errors);
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  return loaded && (
    <AuthProvider value={{ authenticated, setAuthenticated }}>
      <Flex direction="column" align="center" justify="center">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Flex justify="center" align="center" w="100%" h="93vh">
              <HomePage isFirstVisit={isFirstVisit} setIsFirstVisit={setIsFistVisit} />
            </Flex>
          </Route>
          <Route path="/signin">
            <Flex justify="center" align="center" w="100%" h="93vh">
              <LoginSigninPage />
            </Flex>
          </Route>
          {/* <Route path="/login">
              <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
            </Route>
            <Route path="/signup">
              <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
            </Route> */}
        </Switch>
      </Flex>
    </AuthProvider>
  );
}

export default App;
