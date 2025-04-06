"use client";
import { useState } from "react";
import Link from "next/link";
type Job = {
  id: number;
  title: string;
  description: string;
  link: string;
  company: string;
  applicationDue: string; // ISO string format
};
const initialJobsData: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Join our team as a skilled frontend developer specializing in React.",
    link: "https://example.com/jobs/1",
    company: "Tech Corp",
    applicationDue: "2025-05-01T23:59",
  },
  {
    id: 2,
    title: "Backend Engineer",
    description:
      "Looking for an experienced Node.js engineer to build scalable systems.",
    link: "https://example.com/jobs/2",
    company: "Code Inc",
    applicationDue: "2025-05-10T23:59",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    description:
      "Creative designer needed to improve user experience for our products.",
    link: "https://example.com/jobs/3",
    company: "Design Studios",
    applicationDue: "2025-05-05T23:59",
  },
];
const JobRepoPage = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobsData);
  const [searchCompany, setSearchCompany] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] = useState<string>("");
  const [selectedEndDate, setSelectedEndDate] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    link: "",
    company: "",
    applicationDue: "",
  });
  const handleSearchCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchCompany(e.target.value);
  };
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStartDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEndDate(e.target.value);
  };
  const handleNewJobChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };
  const handleNewJobSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jobToAdd: Job = {
      id: jobs.length + 1,
      title: newJob.title,
      description: newJob.description,
      link: newJob.link,
      company: newJob.company,
      applicationDue: newJob.applicationDue,
    };
    setJobs([...jobs, jobToAdd]);
    setNewJob({
      title: "",
      description: "",
      link: "",
      company: "",
      applicationDue: "",
    });
    setShowForm(false);
  };
  const filteredJobs = jobs.filter((job) => {
    const jobDueDate = job.applicationDue.split("T")[0];
    const matchesCompany =
      searchCompany === "" ||
      job.company.toLowerCase().includes(searchCompany.toLowerCase());
    let matchesDateRange = true;
    if (selectedStartDate) {
      matchesDateRange = jobDueDate >= selectedStartDate;
    }
    if (matchesDateRange && selectedEndDate) {
      matchesDateRange = jobDueDate <= selectedEndDate;
    }
    return matchesCompany && matchesDateRange;
  });
  return (
    <div className="min-h-screen bg-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-black mb-8 mt-8">
          Job Repository
        </h1>
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-black mb-1"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={searchCompany}
                onChange={handleSearchCompanyChange}
                placeholder="Search by company"
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-black mb-1"
              >
                Application Due Start
              </label>
              <input
                type="date"
                id="startDate"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-black mb-1"
              >
                Application Due End
              </label>
              <input
                type="date"
                id="endDate"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
          </div>
        </div>
        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              style={{ boxShadow: "0 -4px 10px rgba(0,0,0,0.1)" }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-black mb-3">
                  {job.title}
                </h2>
                <p className="text-black mb-4">{job.description}</p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Application Due:</strong>{" "}
                  {new Date(job.applicationDue).toLocaleString()}
                </p>
                <Link
                  href={job.link}
                  className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Add New Job Button at the bottom */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            Add New Job
          </button>
        </div>
      </div>
      {/* Modal Popup for New Job Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowForm(false)}
          ></div>
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-lg z-10">
            <h2 className="text-2xl font-bold text-black mb-4">New Job</h2>
            <form onSubmit={handleNewJobSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newJob.title}
                    onChange={handleNewJobChange}
                    required
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={newJob.company}
                    onChange={handleNewJobChange}
                    required
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={newJob.link}
                    onChange={handleNewJobChange}
                    required
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleNewJobChange}
                    required
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Application Due
                  </label>
                  <input
                    type="datetime-local"
                    name="applicationDue"
                    value={newJob.applicationDue}
                    onChange={handleNewJobChange}
                    required
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Submit Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default JobRepoPage;


// import { Container } from "@/components/Container";
// import { Heading } from "@/components/Heading";
// import { Highlight } from "@/components/Highlight";
// import { Paragraph } from "@/components/Paragraph";
// import { Products } from "@/components/Products";
// import { Metadata } from "next";
// import Image from "next/image";

// export const metadata: Metadata = {
//   title: "Projects | John Doe",
//   description:
//     "John Doe is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
// };

// export default function Projects() {
//   return (
//     <Container>
//       <span className="text-4xl">⚡</span>
//       <Heading className="font-black mb-10">
//         {" "}
//         What I&apos;ve been working on
//       </Heading>

//       <Products />
//     </Container>
//   );
// }
