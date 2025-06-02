import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Mail, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Contact } from "@/types/contactType";
import ContactService from "@/services/requests/ContactService";

const ManageContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await ContactService.getAll();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const readMessage = async (id: string) => {
    try {
      await ContactService.partialUpdate(id, { isRead: true });
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === id ? { ...contact, isRead: true } : contact
        )
      );
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await ContactService.delete(id);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      contact.fullName.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.subject.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Contacts</h1>
        <Input
          className="w-xs dark:text-black"
          placeholder="Search Contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="rounded-lg border shadow-sm overflow-x-auto">
  <Table className="min-w-[800px]">
    <TableHeader>
      <TableRow>
        <TableHead>Full Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Subject</TableHead>
        <TableHead>Messages</TableHead>
        <TableHead>Submitted At</TableHead>
        <TableHead className="text-center">Status</TableHead>
        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell className="font-medium">{contact.fullName}</TableCell>
            <TableCell className="break-words">{contact.email}</TableCell>
            <TableCell className="whitespace-nowrap">{contact.subject}</TableCell>
            <TableCell className="max-w-[200px] break-words line-clamp-3">
            {contact.message}
            </TableCell>
            <TableCell>
              {new Date(contact.submittedAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-center">
              {contact.isRead ? (
                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full">
                  Read
                </span>
              ) : (
                <span className="inline-block px-3 py-1 text-sm font-semibold text-red-800 bg-red-200 rounded-full">
                  Unread
                </span>
              )}
            </TableCell>
            <TableCell className="text-center space-x-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="cursor-pointer" variant="ghost" size="icon">
                    <Mail />
                  </Button>
                </DialogTrigger>
                <Button
                  onClick={() => readMessage(contact.id)}
                  className="cursor-pointer"
                  variant="ghost"
                  size="icon"
                >
                  <Check />
                </Button>
                <Button
                  onClick={() => deleteMessage(contact.id)}
                  className="cursor-pointer"
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Messages from {contact.fullName}</DialogTitle>
                    <DialogDescription>
                      Received on {new Date(contact.submittedAt).toLocaleString()}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-2 py-4 max-w-md bg-white">
                    <div className="flex flex-col">
                      <label className="font-semibold text-gray-700 mb-1">Email:</label>
                      <p className="text-gray-900 break-words">{contact.email}</p>
                    </div>
                    <div className="flex flex-col mt-4">
                      <label className="font-semibold text-gray-700 mb-1">Message:</label>
                      <p className="text-gray-800 whitespace-pre-wrap">{contact.message}</p>
                    </div>
                  </div>
                  {!contact.isRead && (
                    <DialogFooter>
                      <Button onClick={() => readMessage(contact.id)} type="submit">
                        Mark as read
                      </Button>
                    </DialogFooter>
                  )}
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
            No contacts found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>

    </div>
  );
};

export default ManageContacts;
