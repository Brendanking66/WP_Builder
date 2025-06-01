import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import DataExtraction from './pages/DataExtraction';
import ThemeCustomization from './pages/ThemeCustomization';
import ContentOrganization from './pages/ContentOrganization';
import Preview from './pages/Preview';
import Export from './pages/Export';

import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/extract" element={<DataExtraction />} />
            <Route path="/organize" element={<ContentOrganization />} />
            <Route path="/customize" element={<ThemeCustomization />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/export" element={<Export />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;