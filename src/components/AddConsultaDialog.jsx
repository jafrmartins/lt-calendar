import React, { useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Card,
} from "@material-tailwind/react";
import { Button } from "./Button";
import { useSnack } from "./SnackProvider";
import { Formik } from "formik";
import { formatDatetime } from "../libraries/Date";
 
export function AddConsultaDialog({ open, setOpen, values, date=[new Date().getDate(), new Date().getMonth(), new Date().getFullYear()] }) {

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

  }, [date, values])
 
  return (
    <Formik
      initialValues={{...{ date, ...values } }}
      enableReinitialize={true}
      validate={values => {
        const errors = {};
        
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
                  Registar Consultas
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Introduza os Detalhes da Consulta
                </Typography>
                <form className="mt-8 mb-2">
                  <div className="mb-1 flex flex-col gap-6">
                    <Input
                      label="Nº Cliente"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nic}
                      name="nic"
                      size="lg"
                      
                    />
                    <Input
                      label="Data de Início"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="lg"
                      type="datetime-local"
                      name={'startDateTime'}
                      value={values.startDateTime || formatDatetime(new Date(values.date[2], values.date[1], values.date[0]))}
                      
                    />
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="lg"
                      label="Data de Fim"
                      type="datetime-local"
                      name={'endDateTime'}
                      value={values.endDateTime || formatDatetime(new Date(values.date[2], values.date[1], values.date[0]+1))}
                      
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