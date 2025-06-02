import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import ContactService from "@/services/requests/ContactService";

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.fullName || !form.email || !form.subject || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await ContactService.create(form);
      toast("Message sent successfully");
      setForm({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message");
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mt-15 mx-auto">
      <h1 className="font-bold text-3xl mb-6">Contact Us</h1>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-4">Get In Touch</h3>
          <p className="text-sm">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
            Fill out the form and we'll get back to you as soon as possible.
          </p>

          <div className="flex flex-col gap-6 mt-6">
            <div className="flex items-center gap-3">
              <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center p-2">
                <Mail size={18} className="text-muted-foreground" />
              </div>
              <div className="text-sm">
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">rentGo@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center p-2">
                <Phone size={18} className="text-muted-foreground" />
              </div>
              <div className="text-sm">
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center p-2">
                <MapPin size={18} className="text-muted-foreground" />
              </div>
              <div className="text-sm">
                <h3 className="font-semibold">Address</h3>
                <p className="text-muted-foreground">123 Blog Street, Content City, 10001</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Card className="py-5">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription className="text-sm">
                  Fill out the form below and we'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && <p className="text-red-600">{error}</p>}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="fullName"
                    placeholder="Your name"
                    value={form.fullName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className="min-h-[120px]"
                    value={form.message}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <Button type="submit" className="w-35" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
