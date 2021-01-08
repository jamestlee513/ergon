import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { authenticate } from "./services/auth";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import { ThemeProvider } from "@emotion/react";
import { ColorModeProvider, CSSReset, Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import LoginSigninPage from "./components/Auth/LoginSigninPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
    <Flex direction="column" align="center" justify="center">
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Switch>
        <Route exact path="/">
          <Flex justify="center" align="center" w="100%" h="93vh">
            <div>Welcome home :^)</div>
          </Flex>
        </Route>
        <Route path="/signin">
          <Flex justify="center" align="center" w="100%" h="93vh">
            <LoginSigninPage authenticated={authenticated} setAuthenticated={setAuthenticated} />
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
  );
}

export default App;
