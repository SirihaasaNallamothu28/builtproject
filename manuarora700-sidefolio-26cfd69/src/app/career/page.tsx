"use client";
import React, { useState } from "react";

interface CareerEvent {
    id: number;
    title: string;
    type: "resume review" | "interview workshop";
    format: "in person" | "online" | "video recording";
    location: string;
    description: string;
    date: string;
}

type FilterType = "all" | "resume review" | "interview workshop";
type FilterFormat = "all" | "in person" | "online" | "video recording";

const CareerEventsFinder: React.FC = () => {
    const events: CareerEvent[] = [
        {
            id: 1,
            title: "Resume Review Workshop",
            type: "resume review",
            format: "in person",
            location: "University Career Center, Room 204",
            description: "Get your resume reviewed by industry professionals. Bring a printed copy of your resume and receive personalized feedback to make it stand out to employers.",
            date: "April 15, 2025"
        },
        {
            id: 2,
            title: "Technical Interview Prep",
            type: "interview workshop",
            format: "online",
            location: "Zoom (link sent after registration)",
            description: "Learn essential strategies to ace your technical interviews. We'll cover common questions, whiteboarding techniques, and problem-solving approaches.",
            date: "April 20, 2025"
        },
        {
            id: 3,
            title: "Mock Interviews with Industry Experts",
            type: "interview workshop",
            format: "in person",
            location: "Engineering Building, Floor 3",
            description: "Practice your interviewing skills with professionals from top tech companies. Receive immediate feedback and actionable tips to improve.",
            date: "April 22, 2025"
        },
        {
            id: 4,
            title: "Resume Clinic for Tech Roles",
            type: "resume review",
            format: "video recording",
            location: "Pre-recorded session",
            description: "Watch our career advisors review sample resumes and learn how to highlight your technical skills effectively for tech industry applications.",
            date: "Available anytime"
        },
        {
            id: 5,
            title: "Virtual Resume Review Session",
            type: "resume review",
            format: "online",
            location: "Microsoft Teams",
            description: "Join our 1-hour online session where career counselors will provide feedback on your resume structure, content, and formatting.",
            date: "April 25, 2025"
        }
    ];

    const [selectedType, setSelectedType] = useState<FilterType>("all");
    const [selectedFormat, setSelectedFormat] = useState<FilterFormat>("all");

    const filteredEvents = events.filter(event => {
        const matchesType = selectedType === "all" || event.type === selectedType;
        const matchesFormat = selectedFormat === "all" || event.format === selectedFormat;
        return matchesType && matchesFormat;
    });

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="bg-gray-200 text-black p-[1.5rem]">
                <h1 className="text-[2rem] font-bold">Career Events Finder</h1>
                <p className="mt-[0.5rem] text-[1rem]">Find resume reviews and interview workshops to boost your career</p>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto p-[1.5rem]">
                {/* Filters */}
                <section
                    aria-label="Filter Events"
                    className="bg-gray-100 p-[1rem] rounded-md mb-[2rem]"
                >
                    <h2 className="text-[1.25rem] font-semibold mb-[1rem]">Filter Events</h2>
                    <div className="flex flex-wrap gap-[1rem]">
                        <div>
                            <label htmlFor="typeFilter" className="block mb-[0.5rem] text-[1rem] font-medium">Event Type</label>
                            <select
                                id="typeFilter"
                                aria-label="Filter by event type"
                                className="border border-black rounded p-[0.5rem] text-[1rem]"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value as FilterType)}
                            >
                                <option value="all">All Types</option>
                                <option value="resume review">Resume Review</option>
                                <option value="interview workshop">Interview Workshop</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="formatFilter" className="block mb-[0.5rem] text-[1rem] font-medium">Format</label>
                            <select
                                id="formatFilter"
                                aria-label="Filter by format"
                                className="border border-black rounded p-[0.5rem] text-[1rem]"
                                value={selectedFormat}
                                onChange={(e) => setSelectedFormat(e.target.value as FilterFormat)}
                            >
                                <option value="all">All Formats</option>
                                <option value="in person">In Person</option>
                                <option value="online">Online</option>
                                <option value="video recording">Video Recording</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Events List */}
                <section aria-label="Event Results" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem]">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <article
                                key={event.id}
                                className="border border-black rounded-md shadow-sm hover:shadow-md transition-shadow"
                                aria-labelledby={`event-${event.id}-title`}
                            >
                                <div className="bg-gray-300 p-[1rem]">
                                    <h3 id={`event-${event.id}-title`} className="text-[1.125rem] font-bold">
                                        {event.title}
                                    </h3>
                                </div>
                                <div className="p-[1rem]">
                                    <div className="flex flex-wrap items-center gap-[0.5rem] mb-[0.75rem]">
                                        <span className="bg-gray-200 text-black px-[0.5rem] py-[0.25rem] rounded text-[0.875rem]">
                                            {event.type}
                                        </span>
                                        <span className="bg-gray-200 text-black px-[0.5rem] py-[0.25rem] rounded text-[0.875rem]">
                                            {event.format}
                                        </span>
                                    </div>
                                    <p className="mb-[0.5rem] text-[0.95rem]"><strong>Date:</strong> {event.date}</p>
                                    <p className="mb-[0.75rem] text-[0.95rem]"><strong>Location:</strong> {event.location}</p>
                                    <p className="mb-[1rem] text-[0.95rem] text-black">{event.description}</p>
                                    <a
                                        href="#"
                                        role="button"
                                        className="inline-block text-center border border-black text-black py-[0.5rem] px-[1rem] rounded hover:bg-gray-200 transition"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div
                            className="col-span-full text-center p-[2rem] text-gray-600"
                            role="status"
                            aria-live="polite"
                        >
                            No events found matching your filters.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default CareerEventsFinder;



// "use client";
// import React, { useState } from 'react';

// // Define TypeScript interfaces for our data
// interface CareerEvent {
//     id: number;
//     title: string;
//     type: "resume review" | "interview workshop";
//     format: "in person" | "online" | "video recording";
//     location: string;
//     description: string;
//     date: string;
// }

// type FilterType = "all" | "resume review" | "interview workshop";
// type FilterFormat = "all" | "in person" | "online" | "video recording";

// const CareerEventsFinder: React.FC = () => {
//     // Sample data - replace with your actual data source
//     const events: CareerEvent[] = [
//         {
//             id: 1,
//             title: "Resume Review Workshop",
//             type: "resume review",
//             format: "in person",
//             location: "University Career Center, Room 204",
//             description: "Get your resume reviewed by industry professionals. Bring a printed copy of your resume and receive personalized feedback to make it stand out to employers.",
//             date: "April 15, 2025"
//         },
//         {
//             id: 2,
//             title: "Technical Interview Prep",
//             type: "interview workshop",
//             format: "online",
//             location: "Zoom (link sent after registration)",
//             description: "Learn essential strategies to ace your technical interviews. We'll cover common questions, whiteboarding techniques, and problem-solving approaches.",
//             date: "April 20, 2025"
//         },
//         {
//             id: 3,
//             title: "Mock Interviews with Industry Experts",
//             type: "interview workshop",
//             format: "in person",
//             location: "Engineering Building, Floor 3",
//             description: "Practice your interviewing skills with professionals from top tech companies. Receive immediate feedback and actionable tips to improve.",
//             date: "April 22, 2025"
//         },
//         {
//             id: 4,
//             title: "Resume Clinic for Tech Roles",
//             type: "resume review",
//             format: "video recording",
//             location: "Pre-recorded session",
//             description: "Watch our career advisors review sample resumes and learn how to highlight your technical skills effectively for tech industry applications.",
//             date: "Available anytime"
//         },
//         {
//             id: 5,
//             title: "Virtual Resume Review Session",
//             type: "resume review",
//             format: "online",
//             location: "Microsoft Teams",
//             description: "Join our 1-hour online session where career counselors will provide feedback on your resume structure, content, and formatting.",
//             date: "April 25, 2025"
//         }
//     ];

//     // Filter states with proper TypeScript types
//     const [selectedType, setSelectedType] = useState<FilterType>("all");
//     const [selectedFormat, setSelectedFormat] = useState<FilterFormat>("all");

//     // Filter events based on selection
//     const filteredEvents = events.filter(event => {
//         const matchesType = selectedType === "all" || event.type === selectedType;
//         const matchesFormat = selectedFormat === "all" || event.format === selectedFormat;
//         return matchesType && matchesFormat;
//     });

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Header */}
//             <header className="bg-[#038cfc] text-white p-6">
//                 <h1 className="text-3xl font-bold">Career Events Finder</h1>
//                 <p className="mt-2">Find resume reviews and interview workshops to boost your career</p>
//             </header>

//             {/* Filters */}
//             <div className="container mx-auto p-6">
//                 <div className="bg-gray-100 p-4 rounded-lg mb-6">
//                     <h2 className="text-xl font-semibold mb-4">Filter Events</h2>
//                     <div className="flex flex-wrap gap-4">
//                         <div>
//                             <label className="block text-gray-700 mb-2">Event Type</label>
//                             <select
//                                 className="border rounded p-2"
//                                 value={selectedType}
//                                 onChange={(e) => setSelectedType(e.target.value as FilterType)}
//                             >
//                                 <option value="all">All Types</option>
//                                 <option value="resume review">Resume Review</option>
//                                 <option value="interview workshop">Interview Workshop</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Format</label>
//                             <select
//                                 className="border rounded p-2"
//                                 value={selectedFormat}
//                                 onChange={(e) => setSelectedFormat(e.target.value as FilterFormat)}
//                             >
//                                 <option value="all">All Formats</option>
//                                 <option value="in person">In Person</option>
//                                 <option value="online">Online</option>
//                                 <option value="video recording">Video Recording</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Events Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredEvents.length > 0 ? (
//                         filteredEvents.map(event => (
//                             <div key={event.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//                                 <div className={`p-4 text-white font-bold ${event.type === "resume review" ? "bg-[#038cfc]" : "bg-blue-700"}`}>
//                                     {event.title}
//                                 </div>
//                                 <div className="p-4">
//                                     <div className="flex items-center mb-3">
//                                         <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm mr-2">{event.type}</span>
//                                         <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">{event.format}</span>
//                                     </div>
//                                     <p className="text-gray-600 mb-2">
//                                         <strong>Date:</strong> {event.date}
//                                     </p>
//                                     <p className="text-gray-600 mb-3">
//                                         <strong>Location:</strong> {event.location}
//                                     </p>
//                                     <p className="text-gray-800 mb-4">{event.description}</p>
//                                     <a href="#" className="block text-center bg-[#038cfc] text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
//                                         Learn More
//                                     </a>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="col-span-full text-center p-8 text-gray-500">
//                             No events found matching your filters. Please try different filter options.
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CareerEventsFinder;
