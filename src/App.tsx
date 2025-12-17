import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TodoExample from "./components/TodoExample";
import Nestedcheckbox from "./components/Nestedcheckbox";
import { checkboxesData, fileSystemData } from "./utils/utilData";
import FileExplorer from "./components/FileExplorer";
import NestedCheckboxExample from "./components/NestedCheckboxExample";
import FileExplorerExample from "./components/FileExplorerExample";
import GridLights from "./components/GridLights";
import StarRating from "./components/StarRating";
import TicTacToe from "./components/TicTacToe";
import VirtualisedList from "./components/VirtualisedList";

type ExampleId =
  | "todo"
  | "nested-checkbox"
  | "file-system"
  | "grid-light"
  | "star-rating"
  | "tictactoe"
  | "virtualised-list";
// extend this union as you add more

const EXAMPLES: { id: ExampleId; title: string; description: string }[] = [
  { id: "todo", title: "Todo List", description: "Basic CRUD todo app" },
  {
    id: "nested-checkbox",
    title: "Nested Checkbox",
    description: "A checkbox component with nested options",
  },
  {
    id: "file-system",
    title: "File System Explorer",
    description: "A file system explorer component",
  },
  {
    id: "grid-light",
    title: "Grid Light ",
    description: "Grid light",
  },
  {
    id: "star-rating",
    title: "star rating ",
    description: "star rating component",
  },
  {
    id: "tictactoe",
    title: "Tic tac toe",
    description: "Tic tac toe game",
  },
  {
    id: "virtualised-list",
    title: "Virtualised list",
    description: "virtualised-list example",
  },
  // add more later
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [rating, setRating] = useState(3);
  const [selectedExample, setSelectedExample] = useState<ExampleId>("todo");

  const renderExample = () => {
    switch (selectedExample) {
      case "todo":
        return <TodoExample />;
      // case "counter":
      //   return <CounterExample />;
      case "nested-checkbox":
        return <NestedCheckboxExample></NestedCheckboxExample>;
      case "file-system":
        return <FileExplorerExample />;
      case "grid-light":
        return <GridLights></GridLights>;
      case "star-rating":
        return <StarRating max={5} value={rating} onChange={setRating} />;
      case "tictactoe":
        return <TicTacToe></TicTacToe>;
      case "virtualised-list":
        return <VirtualisedList></VirtualisedList>;
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
