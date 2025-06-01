import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle, Mail } from 'lucide-react';
import { Link } from 'react-router';

const faqs = [
    {
        question: 'What documents do I need to rent a car?',
        answer:
            'You will need a valid driver\'s license, a credit card in your name, and a valid ID or passport. For international renters, an International Driving Permit may be required depending on your country of origin.',
    },
    {
        question: 'Is there a minimum age requirement to rent a car?',
        answer:
            'Yes, the minimum age to rent a car is typically 21 years old. However, for luxury or premium vehicles, the minimum age requirement may be 25 years. Drivers under 25 may also be subject to a young driver surcharge.',
    },
    {
        question: 'How do I modify or cancel my reservation?',
        answer:
            'You can modify or cancel your reservation through your account on our website or by calling our customer service. Cancellations made at least 48 hours before the pick-up time are usually free of charge. Late cancellations may incur a fee.',
    },
    {
        question: 'Are there any mileage restrictions?',
        answer:
            'Most of our standard rentals come with unlimited mileage. However, some specialty vehicles or long-term rentals may have mileage restrictions. Any mileage limitations will be clearly stated in your rental agreement.',
    },
    {
        question: 'Can I pick up the car at one location and return it to another?',
        answer:
            'Yes, we offer one-way rentals between many of our locations. However, a one-way fee may apply. The fee varies based on the distance between locations and vehicle type.',
    },
    {
        question: 'What is your fuel policy?',
        answer:
            'Our vehicles are provided with a full tank of fuel, and we expect them to be returned with a full tank. If the vehicle is not returned with a full tank, you will be charged for the missing fuel plus a refueling service fee.',
    },
];

const FAQSection = () => {
    return (
        <section id="faq" className="py-15 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions about our car rental services and policies.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
                        <HelpCircle className="h-10 w-10 mx-auto mb-4 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">
                            Still have questions?
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            If you couldn't find the answer to your question, please contact our customer support team.
                        </p>
                        <Link to={"/contact"}>
                            <Button className="gap-2">
                                <Mail className="h-4 w-4" />
                                Contact Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;