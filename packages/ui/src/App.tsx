import { Button } from "./components/button/Button";

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <h1 className="text-accent text-2xl">Example app</h1>
      <p>This is a paragraph</p>
      <Button>Click me</Button>
    </div>
  );
}

export default App;
