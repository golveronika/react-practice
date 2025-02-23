import { ReactQueryProvider } from "@providers/QueryProvider";
import CustomerPage from "@pages/CustomerPage/CustomerPage";
import { AppContextProvider } from "@providers/ContextProvider";

function App() {
  return (
    <AppContextProvider>
      <ReactQueryProvider>
        <CustomerPage />
      </ReactQueryProvider>
    </AppContextProvider>
  );
}

export default App;
