// frontend/src/components/layout/LegalPageLayout.tsx

import React, { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

const LegalPageLayout = ({ title, children }: LegalPageLayoutProps) => {
  return (
    <div className="font-['Montserrat'] bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-medium text-[#7A7A7A]">{title}</h1>
        </header>
        <main className="prose prose-lg max-w-none font-light text-[#444444] text-justify children:font-light [&>h2]:font-bold [&>h2]:text-xl [&>h2]:text-[#444444] [&>h2]:mb-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LegalPageLayout;