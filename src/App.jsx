import { RobotProvider } from './components/RobotContext';
import Grid from './components/Grid';
import Controls from './components/Controls';

const App = () => {
  return (
    <RobotProvider>
      <div className="App">
        <Grid />
        <Controls />
      </div>
    </RobotProvider>
  );
};

export default App;
