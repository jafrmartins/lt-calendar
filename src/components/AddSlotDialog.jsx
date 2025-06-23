import React, { useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Button } from "./Button";
import { useSnack } from "./SnackProvider";
import { Formik } from "formik";
import { formatDatetime } from "../librarires/Date";
 
export function AddSlotDialog({ open, setOpen, date=[new Date().getDate(), new Date().getMonth(), new Date().getFullYear()]  }) {

  const { createSnack } = useSnack();
  const handleOpen = () => {
    
    setOpen(!open)
    
  };

  useEffect(() => {

    if(!open) {
      const snackMessage = `Click a ${date[0]}/${date[1]}/${date[2]}`  
      createSnack(snackMessage, 'success');
    }

  }, [open])

  useEffect(() => {

  }, [date])
 
  return (
    <Formik
      initialValues={{ date }}
      enableReinitialize={true}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
        {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Dialog open={open} handler={handleOpen}>
          
          <DialogBody>
            
              <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                  Registar Slots para Consultas
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Introduza os Detalhes da Slot
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Clínico
                    </Typography>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Data de Início
                    </Typography>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="lg"
                      type="datetime-local"
                      name={'startDateTime'}
                      value={values.startDateTime || formatDatetime(new Date(values.date[2], values.date[1], values.date[0]+1).toISOString())}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Data de Fim
                    </Typography>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="lg"
                      type="datetime-local"
                      name={'endDateTime'}
                      value={values.endDateTime || formatDatetime(new Date(values.date[2], values.date[1], values.date[0]+1).toISOString())}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </form>
              </Card>

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
        )}
      </Formik>
  );
}