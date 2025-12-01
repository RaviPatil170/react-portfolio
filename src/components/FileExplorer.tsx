import { useEffect, useState } from "react";

export type FileNode = {
  id: number;
  name: string;
  children?: FileNode[]; // ✅ optional
  childShown?: boolean; // ✅ added childShown property
};

export default function FileExplorer({ data }: { data: FileNode[] }) {
  const [fileSystemData, setFileSystemData] = useState(data);
  useEffect(() => {
    const newData = fileSystemData.map((el) => {
      el.childShown = false; // ✅ fixed property access
      return el;
    });
    setFileSystemData(newData);
  }, []);

  function handleClick(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    const newData = fileSystemData.map((node) => {
      if (node.id === id) {
        node.childShown = !node.childShown;
      }
      return node;
    });
    setFileSystemData(newData);
  }

  return (
    <div>
      {fileSystemData.map((node) => {
        return (
          <div
            style={{ marginLeft: 20 }}
            key={node.id}
            onClick={(e) => handleClick(e, node.id)}
          >
            <div
              style={
                node.children
                  ? { font: "bold", color: "green", cursor: "pointer" }
                  : undefined
              }
            >
              {node.name}
              {node.children &&
                (node.children.length > 0 && node.childShown ? (
                  <span>[-]</span>
                ) : (
                  <span>[+]</span>
                ))}
            </div>
            {node.children && (
              <div>
                {node.childShown && (
                  <FileExplorer data={node.children}></FileExplorer>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
