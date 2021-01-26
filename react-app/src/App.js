import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom"
import { authenticate } from "./services/auth";
import { Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import LoginSigninPage from "./components/auth/LoginSigninPage";
import HomePage from "./components/HomePage";
import { addUser } from "./reducers/userReducer";
import { useDispatch } from "react-redux";
import SplashPage from "./components/SplashPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isFirstVisit, setIsFistVisit] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        dispatch(addUser(user));
      } else {
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path="/home">
          <NavBar />
          <Flex justify="center" align="center" w="100%" h="100%">
            <HomePage isFirstVisit={isFirstVisit} setIsFirstVisit={setIsFistVisit} />
          </Flex>
        </Route>
        <Route path="/signin">
          <NavBar />
          <Flex justify="center" align="center" w="100%" h="100%">
            <LoginSigninPage />
          </Flex>
        </Route>
        <Route path='/settings'>
          <div>Test route here</div>
        </Route>
      </Switch>
    </Flex>
  );
}

export default App;


