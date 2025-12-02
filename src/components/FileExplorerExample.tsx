// FileExplorerExample.tsx
import FileExplorer from "./FileExplorer";
type FileNode = {
  id: number;
  name: string;
  children?: FileNode[]; // ✅ optional
  childShown?: boolean; // ✅ added childShown property
};
const fileData: FileNode[] = [
  {
    id: 1,
    name: "src",
    childShown: false,
    children: [
      { id: 2, name: "main.tsx", childShown: false },
      { id: 3, name: "App.tsx", childShown: false },
      {
        id: 4,
        name: "components",
        childShown: false,
        children: [
          { id: 5, name: "Navbar.tsx", childShown: false },
          { id: 6, name: "Sidebar.tsx", childShown: false },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "public",
    childShown: false,
    children: [
      { id: 8, name: "index.html", childShown: false },
      { id: 9, name: "favicon.ico", childShown: false },
    ],
  },
];

export default function FileExplorerExample() {
  return (
    <div className="example-card">
      <header className="example-header">
        <h2>Recursive File Explorer</h2>
        <p className="example-subtitle">
          A collapsible file tree built with recursive components. Clicking a
          folder toggles its children, similar to an IDE file explorer.
        </p>
        <ul className="example-meta">
          <li>✅ React + TypeScript</li>
          <li>✅ Recursive rendering</li>
          <li>✅ Tree navigation UI</li>
        </ul>
      </header>

      <section className="example-body">
        <div className="file-explorer">
          <FileExplorer data={fileData} />
        </div>
      </section>

      <footer className="example-footer">
        <p className="example-footer-text">
          This pattern is useful for file systems, nested menus, and any
          hierarchical navigation structure.
        </p>
      </footer>
    </div>
  );
}
