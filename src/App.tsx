import { WorkspaceProvider } from "./context/WorkspaceContext";
import { Header } from "./components/Header";
import { ObjectDrawer } from "./components/ObjectDrawer";
import { Workspace } from "./components/Workspace";
import { StickerDrawer } from "./components/StickerDrawer";
import "./App.css";

export default function App() {
  return (
    <WorkspaceProvider>
      <div className="app">
        <Workspace />
        <Header />
        <ObjectDrawer />
        <StickerDrawer />
      </div>
    </WorkspaceProvider>
  );
}
