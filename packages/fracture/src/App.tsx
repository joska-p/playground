import { FractureCPU } from './components/FractureCPU';
import { FractureGPU } from './components/FractureGPU';

function App() {
  return (
    <div className="bg-background text-foreground grid min-h-screen grid-cols-2 gap-4">
      <FractureCPU />
      <FractureGPU />
    </div>
  );
}

export { App };
