"use client";
import React, { useState } from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { Note } from "./NoteCard";

type NoteUploadFormProps = {
  onAddNote: (note: Note) => void;
  onClose: () => void;
};

export const NoteUploadForm = ({ onAddNote, onClose }: NoteUploadFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!title.trim() || !description.trim() || !driveLink.trim()) {
      setError("All fields are required");
      return;
    }
    
    // Simple validation for Google links
    // Accept Drive, Docs, Sheets, Slides, Drawings, etc.
    const isValidGoogleLink = [
      "drive.google.com",
      "docs.google.com",
      "sheets.google.com",
      "slides.google.com",
      "drawings.google.com",
      "forms.google.com"
    ].some(domain => driveLink.includes(domain));
    
    if (!isValidGoogleLink) {
      setError("Please enter a valid Google document link (Drive, Docs, Sheets, Slides, etc.)");
      return;
    }
    
    onAddNote({
      title,
      description,
      driveLink
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setDriveLink("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-2rem max-w-md w-full mx-1rem">
        <Heading as="h3" className="font-black text-xl mb-1rem">
          Upload Course Notes
        </Heading>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-0.75rem rounded-md mb-1rem">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-1rem">
            <label htmlFor="title" className="block text-sm font-medium mb-0.25rem">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-0.75rem py-0.5rem border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="e.g., CS101 Final Project Notes"
            />
          </div>
          
          <div className="mb-1rem">
            <label htmlFor="description" className="block text-sm font-medium mb-0.25rem">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-0.75rem py-0.5rem border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Brief description about these notes"
              rows={3}
            />
          </div>
          
          <div className="mb-1.5rem">
            <label htmlFor="driveLink" className="block text-sm font-medium mb-0.25rem">
              Google Document Link
            </label>
            <input
              type="text"
              id="driveLink"
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              className="w-full px-0.75rem py-0.5rem border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="https://docs.google.com/... or https://drive.google.com/..."
            />
            <p className="text-xs text-gray-500 mt-0.25rem">
              Google Drive, Docs, Sheets, Slides, etc. links are accepted. Make sure the link is accessible to everyone.
            </p>
          </div>
          
          <div className="flex justify-end space-x-0.75rem">
            <button 
              type="button"
              onClick={onClose}
              className="px-1rem py-0.5rem rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-1rem py-0.5rem rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 