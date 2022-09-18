import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './trpc';

const queryClient = new QueryClient();

function AppContent() {
  const [count, setCount] = useState(0);
  const test = trpc.useQuery(['getTodos']);

  return (
    <div className='App'>
      <div>status: {test.status}</div>
      {test.isSuccess && (
        <ul>
          {test.data.map((item) => {
            return <li key={item.id}>{item.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

function App() {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:8080/trpc',
    })
  );
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
