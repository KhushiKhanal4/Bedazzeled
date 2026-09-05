import { WorkspaceProvider } from "./context/WorkspaceContext";
import { ObjectGallery } from "./components/ObjectGallery";
import { Workspace } from "./components/Workspace";
import { StickerLibrary } from "./components/StickerLibrary";
import "./App.css";

export default function App() {
  return (
    <WorkspaceProvider>
      <div className="app">
        <ObjectGallery />
        <Workspace />
        <StickerLibrary />
      </div>
    </WorkspaceProvider>
  );
}
