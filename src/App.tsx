import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold mb-4">
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            RMR
          </span>
          <span className="text-gray-900"> AGENCY</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">Real Men Real Agency</p>
        <div className="flex gap-4 justify-center">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-secondary-600 rounded-full animate-pulse delay-150"></div>
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse delay-300"></div>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Phase 1: Foundation Complete ✓
        </p>
      </div>
    </div>
  );
}

export default App;
