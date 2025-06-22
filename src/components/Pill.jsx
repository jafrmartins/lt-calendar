import { Chip } from "@material-tailwind/react";

export function Pill({ children, ...props }) {

    return <>
        <Chip className="rounded-full whitespace-nowrap text-black w-full rounded-lg bg-gradient-to-r from-green-200 to-green-100 p-1" {...props} value={children}>{children}</Chip>
    </>

}