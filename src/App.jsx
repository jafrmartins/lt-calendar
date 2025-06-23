import { useEffect, useState } from "react";
import { ContinuousCalendar } from "./components/ContinuousCalendar";
import { useSnack } from "./components/SnackProvider";
import { AddConsultaDialog } from "./components/AddConsultaDialog";
import { AddSlotDialog } from "./components/AddSlotDialog";

function App() {

  
  const onClickHandler = (day, month, year) => {
    setOpenConsulta(true)
    setDate([day, month, year])
  }

  const [date, setDate] = useState([new Date().getDate(), new Date().getMonth(), new Date().getFullYear()] )

  const [openConsulta, setOpenConsulta] = useState(false);
  const [openSlots, setOpenSlots] = useState(false);

  return (<>
    <div className="relative flex h-screen max-h-screen w-full flex-col gap-4 items-center justify-center">
      <div className="relative h-full overflow-auto w-full">
        <ContinuousCalendar onClick={onClickHandler} setOpenSlotDialog={setOpenSlots} openSlotDialog={openSlots} />
      </div>
      <AddConsultaDialog date={date} open={openConsulta} setOpen={setOpenConsulta} />
      <AddSlotDialog date={date} open={openSlots} setOpen={setOpenSlots} />
    </div>

    

    </>);

}

export default App
