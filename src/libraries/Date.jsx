import moment from "moment";

    
// 2025-06-24T23:00
export function formatDatetime(date) { 
    let m = moment(date);
    return m.format("YYYY-MM-DD")+"T"+m.format("HH:mm");
    
}