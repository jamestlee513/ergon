import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { authenticate } from "./services/auth";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import { ThemeProvider } from "@emotion/react";
import { ColorModeProvider, CSSReset, Flex } from "@chakra-ui/react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      console.log(user.errors);
      if (!user.error) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  return loaded && (
        <Flex direction="column" align="center" justify="center">
          {/*  */}
          <Flex justify="center" align="center" w="100%" h="93vh">
            <BrowserRouter>
              <Switch>
                <Route exact path="/" authenticated={authenticated}>
                  {/* Home */}
                </Route>
                <Route path="/login">
                  <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
                </Route>
                <Route path="/signup">
                  <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
                </Route>
              </Switch>
            </BrowserRouter>
          </Flex>
        </Flex>
  );
}

export default App;
