import { RobotProvider } from './components/RobotContext';
import Grid from './components/Grid';
import Controls from './components/Controls';
import Footer from "./components/Footer"

const App = () => {
  return (
    <RobotProvider>
      <div className="App">
        <Grid />
        <Controls />
        <Footer />
      </div>
    </RobotProvider>
  );
};

export default App;
