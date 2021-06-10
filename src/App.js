import './App.css';
import AppStepper from './components/AppStepper';
import MultiForm from './components/MultiForm/';
import { StepProvider } from './contexts/StepContext/StepContext';

function App() {
  return (
    <div className="App">
      <StepProvider url={'https://cloud-storage-prices-moberries.herokuapp.com/prices'}>
        <AppStepper />
        <MultiForm />
      </StepProvider>
    </div>
  );
}

export default App;
