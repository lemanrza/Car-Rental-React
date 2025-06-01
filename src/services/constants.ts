export const BASE_URL = "http://localhost:3000";
type endpoints = {
    cars: string,
    users: string,
    contacts: string,
    rentals: string,
}

export const endpoints: endpoints = {
    cars: "/cars",
    users: "/users",
    contacts: "/comtacts",
    rentals: "/rentals"
}