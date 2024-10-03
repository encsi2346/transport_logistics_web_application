/*export enum InvoiceStatus { //Számla állapota
    CREATED_BY = 'created_by',
    PAID = 'paid',
    WAITING_FOR_PAYMENT = 'waiting_for_payment',
    DELETED = 'deleted',
}
*/

const InvoiceStatus = Object.freeze({
    CREATED_BY: 'created_by',
    PAID: 'paid',
    WAITING_FOR_PAYMENT: 'waiting_for_payment',
    DELETED: 'deleted',
});