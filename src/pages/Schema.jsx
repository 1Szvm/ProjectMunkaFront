import React, { useState, useEffect } from 'react';
import { getCollectionData, getCollections } from '../utility/backendHandling';

const Schema = () => {
  const [collections, setCollections] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      await getCollections(setCollections);
      setIsLoading(false);
    };
    fetchCollections();
  }, []);

  const handleCollectionChange = async (collectionName) => {
    setIsLoading(true);
    await getCollectionData(collectionName, setCollectionData);
    setIsLoading(false);
  };

  const getType = (value) => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'timestamp';
    return typeof value;
  };

  const renderTypePill = (type) => {
    const colorMap = {
      string: 'bg-blue-100 text-blue-800',
      number: 'bg-green-100 text-green-800',
      boolean: 'bg-purple-100 text-purple-800',
      object: 'bg-yellow-100 text-yellow-800',
      array: 'bg-indigo-100 text-indigo-800',
      timestamp: 'bg-red-100 text-red-800',
      null: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colorMap[type] || 'bg-gray-100'}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <label htmlFor="collection-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select a Firestore Collection
        </label>
        <select
          id="collection-select"
          className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleCollectionChange(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Select a collection</option>
          {Object.entries(collections).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : collectionData.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Collection Schema
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Field names and their data types
            </p>
          </div>
          <div className="border-t border-gray-200 divide-y divide-gray-200">
            {Object.entries(collectionData[0]).map(([key, value]) => (
              <div key={key} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm font-medium text-gray-900">
                    {key}
                  </div>
                  <div>
                    {renderTypePill(getType(value))}
                  </div>
                </div>
                
                {typeof value === 'object' && value !== null && !Array.isArray(value) && (
                  <div className="ml-6 mt-3 pl-4 border-l-2 border-gray-200 space-y-3">
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <div key={subKey} className="flex items-center justify-between">
                        <div className="font-mono text-xs text-gray-600">
                          {subKey}
                        </div>
                        <div>
                          {renderTypePill(getType(subValue))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No schema data</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a collection to view its schema
          </p>
        </div>
      )}
    </div>
  );
};

export default Schema;