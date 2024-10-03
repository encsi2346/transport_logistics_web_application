/*export enum AnswerObjectType { //Megrendelés típusok
    PERSONAL = 'personal',
    B = 'b', //TODO: beosztáscsere
    OVERTIME = 'overtime',
    SHORTER_WORKDAY = 'shorter workday',
    OTHER = 'other'
}
*/
const AnswerObjectType = Object.freeze({
    PERSONAL: 'personal',
    B: 'b',
    OVERTIME: 'overtime',
    SHORTER_WORKDAY: 'shorter workday',
    OTHER: 'other',
});