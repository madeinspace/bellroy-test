import { RobotProvider } from './components/RobotContext';
import Grid from './components/Grid';
import Controls from './components/Controls';
import Footer from "./components/Footer"

const App = () => {
  return (
    <div className="App">
      <RobotProvider>
          <Grid />
          <Controls />
          <Footer />
      </RobotProvider>
    </div>
  );
};

export default App;
