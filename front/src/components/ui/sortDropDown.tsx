import { useState } from "react";

const options = [
  { value: "name-asc", label: "Alfabéticamente A-Z" },
  { value: "name-desc", label: "Alfabéticamente Z-A" },
  { value: "price-asc", label: "Precio (menor-mayor)" },
  { value: "price-desc", label: "Precio (mayor-menor)" },
  { value: "date-asc", label: "Fecha antiguo a reciente" },
  { value: "date-desc", label: "Fecha reciente a antiguo" },
];

export default function SortDropdown({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm border rounded px-3 py-1 bg-white shadow hover:bg-gray-100 transition"
      >
        Ordenar por
      </button>

      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 min-w-full max-h-[calc(100vh-100px)] overflow-auto bg-white border rounded shadow-lg">
          {options.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
