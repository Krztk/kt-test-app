import { RequestInterceptors } from "features/auth/components/RequestInterceptors/RequestInterceptors";
import { AuthProvider } from "features/auth/context/AuthProvider";
import { queryClient } from "lib/react-query";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <RequestInterceptors>
            <AppRoutes />
          </RequestInterceptors>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
