import { useState } from "react";
import { ContinuousCalendar } from "./components/ContinuousCalendar";
import { useSnack } from "./components/SnackProvider";
import { AddConsultaDialog } from "./components/AddConsultaDialog";
import { AddSlotDialog } from "./components/AddSlotDialog";

function App() {

  const { createSnack } = useSnack();

  const onClickHandler = (day, month, year) => {
    const snackMessage = `Click a ${day}/${month}/${year}`
    createSnack(snackMessage, 'success');
    setOpenConsulta(true)
    
  }
  const [openConsulta, setOpenConsulta] = useState(false);
  const [openSlots, setOpenSlots] = useState(false);
 
  return (<>
    <div className="relative flex h-screen max-h-screen w-full flex-col gap-4 items-center justify-center">
      <div className="relative h-full overflow-auto w-full">
        <ContinuousCalendar onClick={onClickHandler} setOpenSlotDialog={setOpenSlots} openSlotDialog={openSlots} />
      </div>
    </div>

    <AddConsultaDialog open={openConsulta} setOpen={setOpenConsulta} />
    <AddSlotDialog open={openSlots} setOpen={setOpenSlots} />

    </>);

}

export default App
