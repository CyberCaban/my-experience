import { appWindow } from "@tauri-apps/api/window";
import PascalTriangle from "./components/PascalTriangle";

function App() {
  return (
    <div className="flex flex-col items-center pt-10">
      <div
        className="fixed top-0 left-0 font-mono self-start w-full h-8 select-none bg-zinc-800 z-10 border-white border-t-2 border-x-2"
        data-tauri-drag-region
      >
        <h1 className="text-xl" data-tauri-drag-region>
          Pascal Triangle
        </h1>
        <div className="fixed top-0 right-0 h-8 flex items-center p-2 mr-0.5 mt-0.5 hover:bg-zinc-500" onClick={
          () => {
            appWindow.close();
          }
        }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            stroke="white"
            fill="white"
          >
            <path d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z"></path>
          </svg>
        </div>
        <div className="fixed bottom-0 left-0 w-full h-0.5 bg-white"></div>
      </div>
      <PascalTriangle />
    </div>
  );
}

export default App;
