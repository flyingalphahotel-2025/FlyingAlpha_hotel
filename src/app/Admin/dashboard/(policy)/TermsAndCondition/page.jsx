"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const AddTermsConditions = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditorContent(html);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "/api/termsAndCondition",
        {
          content: editorContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Terms & Conditions updated successfully!");
        setEditorContent(""); // Clear the editor on successful submission
        editor.commands.clearContent(); // Clear the Tiptap editor content
      } else {
        toast.error(
          `Failed to update Terms & Conditions: ${response.data.message}`
        );
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 w-full h-screen bg-gray-50">
      {/* Form Section */}
      <motion.div
        className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Terms & Conditions</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="terms-conditions"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Terms & Conditions Content
            </label>
            <div className="mt-1 h-80 border border-gray-300 rounded-lg overflow-hidden">
              <EditorContent editor={editor} className="p-4 h-full overflow-y-auto" />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full ${
                isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"
              } text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300`}
              disabled={isSubmitting}
              aria-label="Save Terms & Conditions"
            >
              {isSubmitting ? "Submitting..." : "Save Terms & Conditions"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Live View Section */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md h-[calc(100vh-8rem)] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Terms & Conditions Live View</h2>
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>

      {/* Toaster Component */}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default AddTermsConditions;