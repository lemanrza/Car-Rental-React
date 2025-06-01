import {
  BadgeCheck,
  Clock,
  HeartHandshake,
  Lock,
  MapPin,
  Sparkles,
  ThumbsUp,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const benefits = [
  {
    icon: <Clock className="h-8 w-8" />,
    title: 'Quick Booking Process',
    description:
      'Reserve your vehicle in minutes with our streamlined booking system.',
  },
  {
    icon: <BadgeCheck className="h-8 w-8" />,
    title: 'Quality Assured Vehicles',
    description:
      'Every car in our fleet is thoroughly inspected and maintained to high standards.',
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: 'Convenient Locations',
    description:
      'Pick up and drop off your rental at multiple locations across the city.',
  },
  {
    icon: <ThumbsUp className="h-8 w-8" />,
    title: 'Flexible Rental Options',
    description:
      'Choose from hourly, daily, weekly, or monthly rentals to suit your needs.',
  },
  {
    icon: <HeartHandshake className="h-8 w-8" />,
    title: 'Excellent Customer Support',
    description:
      '24/7 assistance available to address any concerns during your rental period.',
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: 'No Hidden Fees',
    description:
      'Transparent pricing with all costs clearly displayed before you book.',
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: 'Roadside Assistance',
    description:
      'Help is just a call away if you encounter any issues during your journey.',
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: 'Secure Payments',
    description:
      'Your payment information is protected with state-of-the-art encryption.',
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing exceptional car rental experiences with
            premium service and attention to detail.
          </p>
        </div>

        <div className="grid mx-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={cn(
                'p-6 rounded-lg transition-all duration-300',
                'hover:bg-muted/50 hover:shadow-md',
                'transform hover:-translate-y-1'
              )}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="mb-4 text-primary">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;