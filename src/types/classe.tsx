export default interface Class {
    id?: string,
    studentID: string,
    price: number,
    count: number,
    date: string;
    comment?: string,
    isPaid: boolean,
    AmountPaid?: string,
    isActive: boolean,
    create?: Date;
    update?: Date;
}