import { Chip } from "@material-tailwind/react";
import { IconButton } from "./Button";
import { FaEdit, FaTrash, FaTrashAlt, FaWindowClose } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useMediaQuery } from "../libraries/MediaQueries";


export function CalendarEvent({ index, mobile, variant='calendar', onClickEdit, onClickDelete, children, ...props }) {

    const actions = (
        <>
            <IconButton onClick={onClickDelete} variant={'icon'} style={{ ...useMediaQuery("sm") ? { display: 'none', visibility: 'hidden'} : {padding: '2.5px'}}}>
                <FaXmark/>
            </IconButton>
        </>
    ) 

    return <Chip onClick={onClickEdit} className={`rounded-full whitespace-nowrap text-black w-full rounded-lg bg-gradient-to-r from-primary-100 to-primary-50  ${index > 0 ? 'mt-1' : ''}`} {...props} value={<div className="flex justify-between"><div>{children}</div><div>{actions}</div></div>}></Chip>

}