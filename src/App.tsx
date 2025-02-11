import React from 'react';
import { debounce } from './utils/debounce';

function App() {


  const logMessage = (msg: string) => console.log(msg);

  const debouncedLog = debounce(logMessage, 1000);
  
  debouncedLog("Привет!");
  setTimeout(() => debouncedLog("Как дела?"), 500);
  setTimeout(() => debouncedLog("Прошла 1 секунда"), 1500);




  return (
    <div className="App">
        Hello
        <img src="/assets/logo192.png" alt="logo" />
    </div>
  );
}

export default App;
