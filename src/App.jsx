import { RobotProvider } from './components/RobotContext';
import Grid from './components/Grid';
import Controls from './components/Controls';
import Footer from "./components/Footer"
import {useState, useEffect} from "react"
import Loader from './components/Loader'


async function getSize() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(5);
    }, 1000);
  });
}

const App = () => {

  const [gridSize, setGridSize] = useState(null);

  useEffect(() => {
    const fetchSize = async () => {
      const theSize = await getSize();
      setGridSize(theSize);
    };

    fetchSize();
  }, []);

  if (gridSize === null) {
    return <Loader />;
  }


  return (
    <div className="App">
      <RobotProvider gridSize={gridSize}>
          <Grid />
          <Controls />
          <Footer />
      </RobotProvider>
    </div>
  );
};

export default App;
