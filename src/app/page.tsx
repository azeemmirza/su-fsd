'use client';

import { useState, useEffect } from 'react';

interface IData {
  createdAt: string;
  filename: string;
};

// Server Actions

const sortFilename = (a: string, b: string) => {
  const aNum = extractNumbers(a);
  const bNum = extractNumbers(b);

  if (aNum === bNum) {
    return a.localeCompare(b); // Compare alphabetically if numbers are the same
  }
  return aNum - bNum; // Otherwise, compare based on extracted numbers
};

const extractNumbers = (str: string) => {
  return parseInt(str.replace(/\D/g, ''), 10) || 0; // Extract number from string
};

type sortOptions = 1 | 2 | 3;

export default function Home() {
  const [items, setItems] = useState<Array<IData>>([]);
  const [sortType, setSortType] = useState<sortOptions>(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/items');
      const data = await res.json();
      
      setItems(data);
    };
    fetchData();
  }, []);

  const sortItems = () => {
    const sortedItems: Array<IData> = [...items];

    if (sortType === 1) {
      sortedItems.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    if (sortType === 2) {
      sortedItems.sort((a, b) => sortFilename(a.filename, b.filename));
    }

    if (sortType === 3) {
      sortedItems.sort((a, b) => sortFilename(b.filename, a.filename));
    }

    return sortedItems;
  };

  useEffect(() => {
    console.log(sortType);
    sortItems();
  }, [sortType]);
  

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select
          value={sortType}
          onChange={(e) => setSortType(parseInt(e.target.value, 10) as sortOptions)}
          className="border p-2"
        >
          <option className="grey-400" value={1}>Sort by Created At (Asc)</option>
          <option value={2}>Sort by Filename (Asc)</option>
          <option value={3}>Sort by Filename (Desc)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sortItems().map((item, index) => (
          <div key={index} className="border p-4">
            <div className="text-lg font-bold">{new Date(item.createdAt).toString() }</div>
            <div>{item.filename}</div>
          </div>
        ))}
      </div>
    </div>);
}
