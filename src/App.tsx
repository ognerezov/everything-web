import React,{FC} from 'react';
import BookViewer from "./components/viewers/BookViewer";

interface AppProps {

}
const App :FC<AppProps>=() =>  {
  return (
      <div className="App">
        <BookViewer/>
      </div>
  );
};

export default App;
