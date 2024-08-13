// src/components/InformationRow.tsx
import React from 'react';

interface InfoRowProps {
  label: string;
  value?: string | string[];
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex items-left">
      <p className="font-normal mr-2 whitespace-nowrap">{label}</p>
      <span className="font-light">{value || 'N/A'}</span>
    </div>
  );
};

export default InfoRow;
