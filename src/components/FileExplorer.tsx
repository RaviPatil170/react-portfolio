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
        const isFolder = !!node.children && node.children.length > 0;

        return (
          <div
            key={node.id}
            className="file-explorer-node"
            style={{ marginLeft: 8 }} // tiny base indent, you can remove if you want
            onClick={(e) => handleClick(e, node.id)}
          >
            <div
              className={
                "file-explorer-label " +
                (isFolder ? "file-explorer-folder" : "file-explorer-file")
              }
            >
              {isFolder && (
                <span className="file-explorer-toggle-icon">
                  {node.childShown ? "[-]" : "[+]"}
                </span>
              )}
              <span className="file-explorer-name">{node.name}</span>
            </div>

            {isFolder && node.childShown && (
              <div className="file-explorer-children">
                <FileExplorer data={node.children!} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
