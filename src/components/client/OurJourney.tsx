import { Calendar, Map, Award, Users } from 'lucide-react';

const milestones = [
    {
        year: '1995',
        title: 'Our Beginning',
        description: 'Started with just 5 cars in a small garage in downtown.',
        icon: Calendar
    },
    {
        year: '2005',
        title: 'Nationwide Expansion',
        description: 'Expanded to 15 locations across the country with a fleet of 500+ vehicles.',
        icon: Map
    },
    {
        year: '2015',
        title: 'Industry Recognition',
        description: 'Awarded "Best Car Rental Service" for 5 consecutive years.',
        icon: Award
    },
    {
        year: '2025',
        title: 'Global Presence',
        description: 'Now serving over 1 million customers annually across 3 continents.',
        icon: Users
    }
];

const CompanyStory = () => {
    return (
        <section className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
                    <p className="text-lg text-gray-600">
                        For over 25 years, we've been transforming the car rental industry with our commitment to quality, innovation, and customer satisfaction.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

                    <div className="space-y-12 md:space-y-0">
                        {milestones.map((milestone, index) => {
                            const Icon = milestone.icon;
                            return (
                                <div key={index} className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center">
                                    <div className={`md:col-span-1 ${index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}`}>
                                        <div className="bg-white p-6 rounded-lg shadow-md  transition-shadow mb-8 md:mb-0">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center md:justify-start gap-2">
                                                {index % 2 !== 0 && <Icon className="h-5 w-5 text-red-500" />}
                                                {milestone.title}
                                                {index % 2 === 0 && <Icon className="h-5 w-5 text-red-500 ml-auto" />}
                                            </h3>
                                            <p className="text-gray-600">{milestone.description}</p>
                                        </div>
                                    </div>

                                    <div className="absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:justify-center hidden">
                                        <div className="bg-red-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10">
                                            {milestone.year}
                                        </div>
                                    </div>

                                    <div className="text-red-500 font-bold text-xl mb-2 md:hidden">
                                        {milestone.year}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyStory;