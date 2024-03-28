export default interface Student {
    id?: string,
    firstName: string,
    lastName: string,
    isActive?: boolean,
    registerAt?: Date,
    updateAt?: Date,
    description?: string,
    color?: string,
    price?: number,
    discountPercentage?: number,
    totalPrice?: number,
    dayInTheWeek?: Array<number>;
    createdAt?:Date;
    updatedAt?:Date;
    balance:number;
    classMinutes: number;
}