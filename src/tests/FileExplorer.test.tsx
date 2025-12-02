import type { FileNode } from "../components/FileExplorer";

import { fireEvent, render, screen } from "@testing-library/react";
import FileExplorer from "../components/FileExplorer";
const mockData: FileNode[] = [
  {
    id: 1,
    name: "src",
    childShown: false,
    children: [
      { id: 2, name: "index.tsx", childShown: false },
      { id: 3, name: "App.tsx", childShown: false },
    ],
  },
];

describe("FileExplorer Component", () => {
  it("parent component should render correctly", () => {
    render(<FileExplorer data={mockData} />);
    expect(screen.getByText("src")).toBeInTheDocument();
  });

  it("toggles children visiblity on click", () => {
    render(<FileExplorer data={mockData} />);
    const fileNode = screen.getByText("src");
    fireEvent.click(fileNode);
    expect(screen.getByText("index.tsx")).toBeInTheDocument();
  });
});
