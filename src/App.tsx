import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TodoExample from "./components/TodoExample";
// later you can import more examples like:
// import CounterExample from "./examples/CounterExample";

type ExampleId = "todo"; // extend this union as you add more

const EXAMPLES: { id: ExampleId; title: string; description: string }[] = [
  { id: "todo", title: "Todo List", description: "Basic CRUD todo app" },
  // add more later
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedExample, setSelectedExample] = useState<ExampleId>("todo");

  const renderExample = () => {
    switch (selectedExample) {
      case "todo":
        return <TodoExample />;
      // case "counter":
      //   return <CounterExample />;
      default:
        return <div>Select an example from the left.</div>;
    }
  };

  return (
    <div className="app-root">
      <Sidebar
        open={isSidebarOpen}
        toggle={() => setIsSidebarOpen((prev) => !prev)}
        examples={EXAMPLES}
        selectedId={selectedExample}
        onSelect={(id) => setSelectedExample(id)}
      />

      <main className="app-main">
        <header className="app-header">
          {!isSidebarOpen && (
            <button
              className="sidebar-toggle"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
          )}
          <h1>My React Playground / Portfolio</h1>
          <p>Collection of small projects I build daily.</p>
        </header>

        <section className="app-content">{renderExample()}</section>
      </main>
    </div>
  );
}
