import { Calendar } from "./components/Calendar";

function App() {

  
  return (<>
    <div className="relative flex h-screen max-h-screen w-full flex-col gap-4 items-center justify-center">
      <div className="relative h-full overflow-auto w-full">
        <Calendar />
      </div>
    </div>

    

    </>);

}

export default App
