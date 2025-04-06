"use client";
import React, { useState, useEffect } from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { Note, NoteCard } from "./NoteCard";
import { NoteUploadForm } from "./NoteUploadForm";

export const AlumniNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  
  // For demo purposes, we're using localStorage to persist notes
  // In a real app, you'd use a database
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("alumniNotes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      } else {
        // Sample notes for demo with different Google document types
        const sampleNotes: Note[] = [
          {
            title: "CS 101 - Introduction to Programming",
            description: "Complete lecture notes and example code from the Fall 2023 semester.",
            driveLink: "https://drive.google.com/file/d/1cJexUHZMQXQjH0WbENi7l1YC9-XQglPD/view"
          },
          {
            title: "MATH 240 - Linear Algebra Study Guide",
            description: "Comprehensive study guide I created for the final exam with practice problems and solutions.",
            driveLink: "https://docs.google.com/document/d/1Ax56wFGLtL-P5MIQ6NsLM3Uh4Cb_MNxP/edit"
          },
          {
            title: "BIO 220 - Research Data Collection",
            description: "Spreadsheet with organized data from our field research project.",
            driveLink: "https://docs.google.com/spreadsheets/d/1FgIb9C5-QoOV1aSeMkEgCQbfSGc1uE5zU6f3lt96eWs/edit"
          },
          {
            title: "HIST 315 - History Presentation Slides",
            description: "My presentation on historical economics that received an A grade.",
            driveLink: "https://docs.google.com/presentation/d/1Pc0a7aKqqT2OPK_BCO9nLXhQNgX9PIon5RHZNBYls_I/edit"
          }
        ];
        setNotes(sampleNotes);
        localStorage.setItem("alumniNotes", JSON.stringify(sampleNotes));
      }
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
    }
  }, []);
  
  const handleAddNote = (note: Note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    
    // Save to localStorage
    try {
      localStorage.setItem("alumniNotes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error saving notes to localStorage:", error);
    }
  };
  
  return (
    <div>
      <div className="mt-2rem">
        <Paragraph className="mb-1.5rem mt-1rem">
          Browse through course notes shared by fellow alumni. Feel free to upload your own notes to help others succeed in their classes.
        </Paragraph>
        
        {/* Upload Button - Below description text */}
        <div className="flex justify-end mb-2rem">
          <button
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center gap-0.5rem group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-lg shadow-black/20 sm:backdrop-blur-sm group-hover/button:bg-gray-50/15 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-sm font-medium px-1rem py-0.5rem origin-left"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="1rem" 
              height="1rem" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 5v14"></path>
              <path d="M5 12h14"></path>
            </svg>
            Upload Notes
          </button>
        </div>
        
        {notes.length === 0 ? (
          <div className="text-center py-2.5rem">
            <Paragraph>No notes have been uploaded yet. Be the first to share!</Paragraph>
          </div>
        ) : (
          <div className="space-y-0">
            {notes.map((note, index) => (
              <NoteCard key={`${note.title}-${index}`} note={note} index={index} />
            ))}
          </div>
        )}
      </div>
      
      {/* Upload Form Modal */}
      {showUploadForm && (
        <NoteUploadForm 
          onAddNote={handleAddNote} 
          onClose={() => setShowUploadForm(false)} 
        />
      )}
    </div>
  );
}; 