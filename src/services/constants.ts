export const BASE_URL = "http://localhost:3000";
// export const BASE_URL="https://dto-d09t.onrender.com/"
type endpoints = {
    cars: string,
    users: string,
    contacts: string,
    rentals: string,
    reviews: string
}

export const endpoints: endpoints = {
    cars: "/cars",
    users: "/users",
    contacts: "/contacts",
    rentals: "/rentals",
    reviews: "/reviews"
}