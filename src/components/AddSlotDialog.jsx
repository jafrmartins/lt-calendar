import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Button } from "./Button";
 
export function AddSlotDialog({ open, setOpen}) {

  const handleOpen = () => setOpen(!open);
 
  return (
    <>
        {//bg-gradient-to-r from-green-100 to-green-300 
        }
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Registar Slots</DialogHeader>
        <DialogBody>
          FORM HERE
        </DialogBody>
        <DialogFooter className="w-full justify-between">
          <Button onClick={handleOpen}>
              Cancelar
          </Button>
          <Button onClick={handleOpen}>
            Guardar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}