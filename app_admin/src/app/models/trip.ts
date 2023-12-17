// Represents the data coming from API endpoint
export interface Trip {
    _id: string,    // MongoDB primary key
    code: string,
    name: string,
    length: string,
    start: Date,
    resort: string,
    perPerson: string,
    image: string,
    description: string
}