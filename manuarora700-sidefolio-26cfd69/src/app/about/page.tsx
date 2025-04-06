'use client';
import { useState } from 'react';

// Custom Card Component
const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

// Fake data for Slack members
const fakeMembers = [
  {
    id: '1',
    real_name: 'John Doe',
    profile: {
      image_192: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    id: '2',
    real_name: 'Jane Smith',
    profile: {
      image_192: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
  {
    id: '3',
    real_name: 'Alex Johnson',
    profile: {
      image_192: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
  },
  {
    id: '4',
    real_name: 'Sara Lee',
    profile: {
      image_192: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  },
];

const SlackMembers = () => {
  const [members] = useState(fakeMembers); // Set the fake data

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {members.map((member) => (
        <Card key={member.id} className="hover:scale-105 transition-transform">
          <img
            src={member.profile.image_192}
            alt={member.real_name}
            className="rounded-full w-24 h-24 mx-auto"
          />
          <h3 className="text-center text-lg font-semibold mt-4">{member.real_name}</h3>
        </Card>
      ))}
    </div>
  );
};

export default SlackMembers;
