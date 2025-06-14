import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-gray-300 bg-opacity-50 flex justify-center items-center p-4 sm:p-6 lg:p-8 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close on backdrop click
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Content - Reverted dark styles */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden transform transition-all duration-300 ease-in-out scale-95 opacity-50 animate-modal-appear"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        {/* Modal Header - Reverted dark styles */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          {title && (
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-800" // Reverted dark text
            >
              {title}
            </h2>
          )}
          {/* Close Button - Reverted dark styles */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1"
            aria-label="Cerrar modal"
          >
            {/* Simple X icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body - Reverted dark styles */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>

      {/* Add animation keyframes to globals.css if needed */}
      {/* Example in globals.css:
          @keyframes modal-appear {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-modal-appear { animation: modal-appear 0.3s ease-out forwards; }
      */}
    </div>
  );
};

export default Modal;
