import React from 'react';
import { PageSection } from '../../types/Content';

interface PageContentEditorProps {
  section: PageSection;
  onChange: (data: Partial<PageSection>) => void;
}

const PageContentEditor: React.FC<PageContentEditorProps> = ({ section, onChange }) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ title: e.target.value });
  };
  
  const handleContentChange = (key: string, value: any) => {
    onChange({
      content: {
        ...section.content,
        [key]: value,
      },
    });
  };
  
  const renderEditor = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading
              </label>
              <input
                type="text"
                value={(section.content as any).heading || ''}
                onChange={(e) => handleContentChange('heading', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subheading
              </label>
              <input
                type="text"
                value={(section.content as any).subheading || ''}
                onChange={(e) => handleContentChange('subheading', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Image URL
              </label>
              <input
                type="text"
                value={(section.content as any).backgroundImage || ''}
                onChange={(e) => handleContentChange('backgroundImage', e.target.value)}
                className="input-field"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Call to Action Text
              </label>
              <input
                type="text"
                value={(section.content as any).ctaText || ''}
                onChange={(e) => handleContentChange('ctaText', e.target.value)}
                className="input-field"
                placeholder="Learn More"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Call to Action URL
              </label>
              <input
                type="text"
                value={(section.content as any).ctaUrl || ''}
                onChange={(e) => handleContentChange('ctaUrl', e.target.value)}
                className="input-field"
                placeholder="/contact"
              />
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={(section.content as any).text || ''}
              onChange={(e) => handleContentChange('text', e.target.value)}
              className="input-field min-h-[200px]"
              placeholder="Enter your content here..."
            />
          </div>
        );
      
      case 'services':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Introduction Text
              </label>
              <textarea
                value={(section.content as any).introText || ''}
                onChange={(e) => handleContentChange('introText', e.target.value)}
                className="input-field"
                placeholder="Describe your services here..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services
              </label>
              
              <div className="space-y-4">
                {((section.content as any).items || []).map((item: any, index: number) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Name
                      </label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => {
                          const newItems = [...((section.content as any).items || [])];
                          newItems[index] = { ...newItems[index], title: e.target.value };
                          handleContentChange('items', newItems);
                        }}
                        className="input-field"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={item.description || ''}
                        onChange={(e) => {
                          const newItems = [...((section.content as any).items || [])];
                          newItems[index] = { ...newItems[index], description: e.target.value };
                          handleContentChange('items', newItems);
                        }}
                        className="input-field"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Icon or Image URL
                      </label>
                      <input
                        type="text"
                        value={item.icon || ''}
                        onChange={(e) => {
                          const newItems = [...((section.content as any).items || [])];
                          newItems[index] = { ...newItems[index], icon: e.target.value };
                          handleContentChange('items', newItems);
                        }}
                        className="input-field"
                        placeholder="https://example.com/icon.svg"
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = [...((section.content as any).items || [])];
                        newItems.splice(index, 1);
                        handleContentChange('items', newItems);
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Service
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => {
                    const newItems = [...((section.content as any).items || []), { title: '', description: '', icon: '' }];
                    handleContentChange('items', newItems);
                  }}
                  className="btn-outline text-sm"
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={(section.content as any).address || ''}
                onChange={(e) => handleContentChange('address', e.target.value)}
                className="input-field"
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                value={(section.content as any).phone || ''}
                onChange={(e) => handleContentChange('phone', e.target.value)}
                className="input-field"
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={(section.content as any).email || ''}
                onChange={(e) => handleContentChange('email', e.target.value)}
                className="input-field"
                placeholder="contact@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Hours
              </label>
              <textarea
                value={(section.content as any).hours || ''}
                onChange={(e) => handleContentChange('hours', e.target.value)}
                className="input-field"
                placeholder="Monday-Friday: 9am-5pm\nSaturday: 10am-2pm\nSunday: Closed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Map Embed URL
              </label>
              <input
                type="text"
                value={(section.content as any).mapUrl || ''}
                onChange={(e) => handleContentChange('mapUrl', e.target.value)}
                className="input-field"
                placeholder="https://maps.google.com/embed?..."
              />
            </div>
          </div>
        );
      
      // Other section types would be implemented here...
      
      default:
        return (
          <div className="text-gray-500 italic">
            Editor for {section.type} sections not implemented yet.
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Section Title
        </label>
        <input
          type="text"
          value={section.title}
          onChange={handleTitleChange}
          className="input-field"
        />
        <p className="text-xs text-gray-500 mt-1">
          This is for your reference only and won't be displayed on the website.
        </p>
      </div>
      
      {renderEditor()}
    </div>
  );
};

export default PageContentEditor;