// NestedCheckboxExample.tsx
import NestedCheckboxTree from "./Nestedcheckbox";

const initialData = [
  {
    id: 1,
    name: "Frontend",
    checked: false,
    children: [
      { id: 2, name: "React", checked: false },
      { id: 3, name: "TypeScript", checked: false },
      {
        id: 4,
        name: "UI Components",
        checked: false,
        children: [
          { id: 5, name: "Buttons", checked: false },
          { id: 6, name: "Forms", checked: false },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Backend",
    checked: false,
    children: [
      { id: 8, name: "Node.js", checked: false },
      { id: 9, name: "Databases", checked: false },
    ],
  },
];

export default function NestedCheckboxExample({
  initialDataProp,
}: {
  initialDataProp?: typeof initialData;
}) {
  return (
    <div className="example-card">
      <header className="example-header">
        <h2>Nested Checkbox Tree</h2>
        <p className="example-subtitle">
          Hierarchical checkbox component with parent–child sync. Checking a
          parent selects all children, and parents auto-update based on child
          state.
        </p>
        <ul className="example-meta">
          <li>✅ React + TypeScript</li>
          <li>✅ Recursive rendering</li>
          <li>✅ Immutable state updates</li>
        </ul>
      </header>

      <section className="example-body">
        <NestedCheckboxTree initialData={initialData} />
      </section>

      <footer className="example-footer">
        <p className="example-footer-text">
          This component is useful for permissions, category filters, or any
          hierarchical selection UI.
        </p>
      </footer>
    </div>
  );
}
