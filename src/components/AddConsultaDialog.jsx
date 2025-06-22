import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Button } from "./Button";
 
export function AddConsultaDialog({ open, setOpen}) {

  const handleOpen = () => setOpen(!open);
 
  return (
    <>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Registar Consulta</DialogHeader>
            <DialogBody>
                FORM HERE
            </DialogBody>
            <DialogFooter className="w-full justify-between">
              <Button onClick={handleOpen} variant={'text'}>
                  Cancelar
              </Button>
              <Button onClick={handleOpen} variant={'text'}>
                Guardar
              </Button>
            </DialogFooter>
        </Dialog>
    </>
  );
}