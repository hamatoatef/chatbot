import { useState } from "react";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import styled from "styled-components";
import WelcamePage from "./components/WelcamePage";
import MessageContainer from "./components/MessageContainer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const Background = styled.div`
  background-color: black;
  width: 100%;
  height: 100vh; /* or any height you prefer */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

function App() {
  const [status, setStatus] = useState("ready");
  return (
    <Background>
      <QueryClientProvider client={queryClient}>
        {status === "ready" && <WelcamePage setStatus={setStatus} />}
        {status === "start" && <MessageContainer />}
      </QueryClientProvider>
    </Background>
  );
}

export default App;
