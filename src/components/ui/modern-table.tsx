'use client';

interface ModernTableProps {
  headers: string[];
  data: Array<Record<string, any>>;
  renderRow: (item: any, index: number) => React.ReactNode;
}

export default function ModernTable({ headers, data, renderRow }: ModernTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4 text-left text-sm font-bold text-pink-800">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={item.id || index} 
              className={`border-t border-pink-100 hover:bg-gradient-to-r hover:from-pink-25 hover:to-purple-25 transition-all ${
                index % 2 === 0 ? 'bg-white' : 'bg-pink-25'
              }`}
            >
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}