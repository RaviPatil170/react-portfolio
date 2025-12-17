type ExampleId =
  | "todo"
  | "nested-checkbox"
  | "file-system"
  | "grid-light"
  | "star-rating"
  | "tictactoe"
  | "virtualised-list"; // keep in sync with App.tsx or move to a shared types file

interface ExampleMeta {
  id: ExampleId;
  title: string;
  description: string;
}

interface SidebarProps {
  open: boolean;
  toggle: () => void;
  examples: ExampleMeta[];
  selectedId: ExampleId;
  onSelect: (id: ExampleId) => void;
}

export default function Sidebar({
  open,
  toggle,
  examples,
  selectedId,
  onSelect,
}: SidebarProps) {
  return (
    <aside className={`sidebar ${open ? "sidebar--open" : "sidebar--closed"}`}>
      <div className="sidebar-header">
        {open && <h2>Examples</h2>}
        <button className="sidebar-toggle" onClick={toggle}>
          {open ? "⟨" : "☰"}
        </button>
      </div>

      {open && (
        <ul className="sidebar-list">
          {examples.map((ex) => (
            <li
              key={ex.id}
              className={`sidebar-item ${
                ex.id === selectedId ? "sidebar-item--active" : ""
              }`}
              onClick={() => onSelect(ex.id)}
            >
              <div className="sidebar-item-title">{ex.title}</div>
              <div className="sidebar-item-desc">{ex.description}</div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
