import type { Contact } from "@/types/contactType";
import instance from "../axios-instance";
import { endpoints } from "../constants";

const ContactService = {
    // GET all contacts
    getAll: async (): Promise<Contact[]> => {
        const response = await instance.get<Contact[]>(endpoints.contacts);
        return response.data;
    },

    // GET a single contact by ID
    getById: async (id: string): Promise<Contact> => {
        const response = await instance.get<Contact>(`${endpoints.contacts}/${id}`);
        return response.data;
    },

    // POST new contact 
    create: async (contactData: Omit<Contact, "id" | "submittedAt" | "isRead">): Promise<Contact> => {
        const newContact: Partial<Contact> = {
            ...contactData,
            isRead: false,
            submittedAt: new Date().toISOString(),
        };
        const response = await instance.post<Contact>(endpoints.contacts, newContact);
        return response.data;
    },

    // PUT full update
    update: async (id: string, updatedContact: Contact): Promise<Contact> => {
        const response = await instance.put<Contact>(`${endpoints.contacts}/${id}`, updatedContact);
        return response.data;
    },

    // PATCH partial update
    partialUpdate: async (id: string, updatedFields: Partial<Contact>): Promise<Contact> => {
        const response = await instance.patch<Contact>(`${endpoints.contacts}/${id}`, updatedFields);
        return response.data;
    },

    // DELETE contact
    delete: async (id: string): Promise<void> => {
        await instance.delete(`${endpoints.contacts}/${id}`);
    },
};

export default ContactService;
