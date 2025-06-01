import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChevronUp, ChevronDown, Trash2, ArrowRight, Plus, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

import PageContentEditor from '../components/content/PageContentEditor';
import { Page, PageSection } from '../types/Content';

const ContentOrganization: React.FC = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([
    {
      id: 'home',
      title: 'Home',
      slug: 'home',
      sections: [
        { id: 'hero', type: 'hero', title: 'Hero', content: { heading: 'Welcome to Our Business', subheading: 'Your trusted partner for quality services' } },
        { id: 'services', type: 'services', title: 'Services', content: { items: [] } },
        { id: 'about', type: 'text', title: 'About Us', content: { text: 'We are a dedicated team of professionals...' } },
      ],
    },
    {
      id: 'about',
      title: 'About',
      slug: 'about',
      sections: [
        { id: 'about-hero', type: 'hero', title: 'About Hero', content: { heading: 'About Our Company', subheading: 'Learn about our history and values' } },
        { id: 'team', type: 'team', title: 'Our Team', content: { members: [] } },
      ],
    },
    {
      id: 'services',
      title: 'Services',
      slug: 'services',
      sections: [
        { id: 'services-intro', type: 'text', title: 'Services Introduction', content: { text: 'We offer a variety of services...' } },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      slug: 'contact',
      sections: [
        { id: 'contact-info', type: 'contact', title: 'Contact Information', content: { address: '', phone: '', email: '' } },
        { id: 'contact-form', type: 'form', title: 'Contact Form', content: { fields: [] } },
      ],
    },
  ]);
  
  const [activePage, setActivePage] = useState<string>(pages[0]?.id || '');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const handlePageTitleChange = (id: string, title: string) => {
    setPages(
      pages.map((page) =>
        page.id === id
          ? { ...page, title, slug: title.toLowerCase().replace(/\s+/g, '-') }
          : page
      )
    );
  };
  
  const handleAddPage = () => {
    const newId = `page-${Date.now()}`;
    const newPage: Page = {
      id: newId,
      title: 'New Page',
      slug: 'new-page',
      sections: [],
    };
    
    setPages([...pages, newPage]);
    setActivePage(newId);
  };
  
  const handleDeletePage = (id: string) => {
    if (pages.length <= 1) {
      toast.error('Cannot delete the only page');
      return;
    }
    
    const newPages = pages.filter((page) => page.id !== id);
    setPages(newPages);
    
    if (activePage === id) {
      setActivePage(newPages[0]?.id || '');
      setActiveSection(null);
    }
  };
  
  const handleAddSection = (pageId: string, sectionType: string) => {
    const newSection: PageSection = {
      id: `section-${Date.now()}`,
      type: sectionType as any, // This would be more strictly typed in a real app
      title: `New ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} Section`,
      content: {},
    };
    
    setPages(
      pages.map((page) =>
        page.id === pageId
          ? { ...page, sections: [...page.sections, newSection] }
          : page
      )
    );
    
    setActiveSection(newSection.id);
  };
  
  const handleDeleteSection = (pageId: string, sectionId: string) => {
    setPages(
      pages.map((page) =>
        page.id === pageId
          ? { ...page, sections: page.sections.filter((section) => section.id !== sectionId) }
          : page
      )
    );
    
    if (activeSection === sectionId) {
      setActiveSection(null);
    }
  };
  
  const handleUpdateSection = (pageId: string, sectionId: string, data: Partial<PageSection>) => {
    setPages(
      pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId ? { ...section, ...data } : section
              ),
            }
          : page
      )
    );
  };
  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    if (result.type === 'page') {
      const reorderedPages = Array.from(pages);
      const [removed] = reorderedPages.splice(source.index, 1);
      reorderedPages.splice(destination.index, 0, removed);
      
      setPages(reorderedPages);
    } else if (result.type === 'section') {
      const pageId = result.draggableId.split(':')[0];
      const page = pages.find((p) => p.id === pageId);
      
      if (!page) return;
      
      const reorderedSections = Array.from(page.sections);
      const [removed] = reorderedSections.splice(source.index, 1);
      reorderedSections.splice(destination.index, 0, removed);
      
      setPages(
        pages.map((p) => (p.id === pageId ? { ...p, sections: reorderedSections } : p))
      );
    }
  };
  
  const activatedPage = pages.find((page) => page.id === activePage);
  const activatedSection = activatedPage?.sections.find(
    (section) => section.id === activeSection
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organize Content</h1>
        <p className="text-gray-600">
          Arrange and customize the content for your website pages.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Pages</h2>
              <button
                type="button"
                onClick={handleAddPage}
                className="text-blue-600 hover:text-blue-800"
                title="Add new page"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="pages" type="page">
                {(provided) => (
                  <ul
                    className="space-y-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {pages.map((page, index) => (
                      <Draggable key={page.id} draggableId={page.id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                              activePage === page.id
                                ? 'bg-blue-50 border border-blue-100'
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setActivePage(page.id)}
                          >
                            <span className="truncate">{page.title}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePage(page.id);
                              }}
                              className="text-gray-400 hover:text-red-500"
                              title="Delete page"
                            >
                              <Trash2 size={14} />
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          
          {activatedPage && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold mb-4">Add Section</h2>
              <div className="grid grid-cols-2 gap-2">
                {['hero', 'text', 'services', 'gallery', 'team', 'testimonials', 'contact', 'form'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleAddSection(activePage, type)}
                    className="btn-outline text-sm py-1 px-2"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          {activatedPage ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  value={activatedPage.title}
                  onChange={(e) => handlePageTitleChange(activePage, e.target.value)}
                  className="input-field"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL: /{activatedPage.slug}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="font-semibold mb-4">Page Sections</h2>
                
                {activatedPage.sections.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <Layers className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-gray-500">No sections added yet</p>
                    <p className="text-sm text-gray-400 mt-1">Add sections from the panel on the left</p>
                  </div>
                ) : (
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={`page-${activatedPage.id}`} type="section">
                      {(provided) => (
                        <div
                          className="space-y-4"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {activatedPage.sections.map((section, index) => (
                            <Draggable
                              key={section.id}
                              draggableId={`${activatedPage.id}:${section.id}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`border rounded-md ${
                                    activeSection === section.id
                                      ? 'border-blue-500 ring-1 ring-blue-500'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div
                                    className="p-3 cursor-pointer flex items-center justify-between"
                                    onClick={() =>
                                      setActiveSection(
                                        activeSection === section.id ? null : section.id
                                      )
                                    }
                                  >
                                    <div className="flex items-center">
                                      <span className="font-medium">{section.title}</span>
                                      <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                        {section.type}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteSection(activePage, section.id);
                                        }}
                                        className="text-gray-400 hover:text-red-500"
                                        title="Delete section"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                      {activeSection === section.id ? (
                                        <ChevronUp size={16} />
                                      ) : (
                                        <ChevronDown size={16} />
                                      )}
                                    </div>
                                  </div>
                                  
                                  {activeSection === section.id && (
                                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                                      <PageContentEditor
                                        section={section}
                                        onChange={(data) =>
                                          handleUpdateSection(activePage, section.id, data)
                                        }
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Select a page to edit its content</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          onClick={() => navigate('/extract')}
          className="btn-outline"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => navigate('/customize')}
          className="btn-primary flex items-center"
        >
          Continue to Theme Customization <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ContentOrganization;