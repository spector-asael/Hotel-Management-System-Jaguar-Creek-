export const loadEmployeeBook = (req: any, res: any) => {
    res.render('employee/book/BookHotel');
}

export const loadEmployeeGuest = (req: any, res: any) => {
    res.render('employee/guest/guest');
}

export const loadEmployeeHotel = (req: any, res: any) => {
    res.render('employee/hotel/hotel');
}
export const loadEmployeeRoom = (req: any, res: any) => {
    res.render('employee/room/room');
}
export const loadEmployeeTransaction = (req: any, res: any) => {
    res.render('employee/transaction/transaction');
}