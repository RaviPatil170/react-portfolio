import React, { useState } from "react";

type NestedCheckboxItem = {
  id: number;
  name: string;
  children?: NestedCheckboxItem[];
  checked: boolean;
};

export default function NestedCheckboxTree({
  initialData,
}: {
  initialData: NestedCheckboxItem[];
}) {
  const [data, setData] = useState<NestedCheckboxItem[]>(initialData);

  function handleChange(id: number, checked: boolean) {
    // 1. Update clicked node and all its children
    const updated = setComponentCheckedState(data, id, checked);
    // 2. Update parents based on children
    const fullyUpdated = setParentwithChildCheckedState(updated);
    setData(fullyUpdated);
  }

  const renderNodes = (nodes: NestedCheckboxItem[], level = 0) => {
    return nodes.map((node) => (
      <div
        key={node.id}
        className="nested-checkbox-item"
        style={{ marginLeft: level * 20 }}
      >
        <label>
          <input
            type="checkbox"
            checked={node.checked}
            onChange={(e) => handleChange(node.id, e.target.checked)}
          />
          {node.name}
        </label>
        {node.children && node.children.length > 0 && (
          <div>{renderNodes(node.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return <div>{renderNodes(data)}</div>;
}
function setComponentCheckedState(
  data: NestedCheckboxItem[],
  id: number,
  checked: boolean
): NestedCheckboxItem[] {
  return data.map((node) => {
    if (node.id === id) {
      const newChildren = node.children
        ? setAllChildrenCheckedState(node.children, checked)
        : undefined;
      return {
        ...node,
        checked,
        children: newChildren,
      };
    }

    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: setComponentCheckedState(node.children, id, checked),
      };
    }

    return node;
  });
}
function setAllChildrenCheckedState(
  children: NestedCheckboxItem[],
  checked: boolean
): NestedCheckboxItem[] {
  return children.map((child) => ({
    ...child,
    checked,
    children: child.children
      ? setAllChildrenCheckedState(child.children, checked)
      : undefined,
  }));
}
function setParentwithChildCheckedState(
  data: NestedCheckboxItem[]
): NestedCheckboxItem[] {
  return data.map((node) => {
    if (node.children && node.children.length > 0) {
      const updatedChildren = setParentwithChildCheckedState(node.children);

      const total = updatedChildren.length;
      const checkedCount = updatedChildren.filter((c) => c.checked).length;

      const newChecked = checkedCount === total;

      return {
        ...node,
        checked: newChecked,
        children: updatedChildren,
      };
    }

    return node;
  });
}
