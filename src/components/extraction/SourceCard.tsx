import React, { useState } from 'react';
import { Facebook, AtSign, Globe, Trash2, ExternalLink, RefreshCw, Check, X } from 'lucide-react';
import { ProjectSource } from '../../types/Project';
import { crawlWebsite } from '../../lib/crawler';

interface SourceCardProps {
  source: ProjectSource;
  onUpdate: (data: Partial<ProjectSource>) => void;
  onRemove: () => void;
  onExtract: (data?: any) => void;
  loading: boolean;
}

const SourceCard: React.FC<SourceCardProps> = ({
  source,
  onUpdate,
  onRemove,
  onExtract,
  loading,
}) => {
  const [showCredentials, setShowCredentials] = useState(false);
  
  const getIcon = () => {
    switch (source.type) {
      case 'facebook':
        return <Facebook size={20} className="text-blue-600" />;
      case 'google':
        return <AtSign size={20} className="text-red-500" />;
      case 'website':
        return <Globe size={20} className="text-green-600" />;
      default:
        return null;
    }
  };
  
  const getTitle = () => {
    switch (source.type) {
      case 'facebook':
        return 'Facebook Business Page';
      case 'google':
        return 'Google Business Profile';
      case 'website':
        return 'Website URL';
      default:
        return 'Data Source';
    }
  };
  
  const getStatusIcon = () => {
    switch (source.status) {
      case 'completed':
        return <Check size={16} className="text-green-600" />;
      case 'failed':
        return <X size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  const handleExtract = async () => {
    if (source.type === 'website' && source.url) {
      try {
        const cleanUrl = source.url.replace(/^https?:\/\//, '');
        const data = await crawlWebsite(cleanUrl);
        onExtract(data);
      } catch (error) {
        console.error('Error extracting data:', error);
        onUpdate({ status: 'failed' });
      }
    } else {
      onExtract();
    }
  };
  
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getIcon()}
          <h3 className="ml-2 font-medium">{getTitle()}</h3>
          {source.status !== 'pending' && (
            <span className="ml-2 flex items-center text-sm">
              {getStatusIcon()}
              <span className="ml-1">
                {source.status === 'completed' ? 'Extracted' : 'Failed'}
              </span>
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500"
          aria-label="Remove source"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <div className="flex">
            <input
              type="url"
              value={source.url}
              onChange={(e) => onUpdate({ url: e.target.value })}
              placeholder={`Enter ${source.type} URL`}
              className="input-field flex-1"
            />
            {source.url && (
              <a
                href={source.url.startsWith('http') ? source.url : `https://${source.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 p-2 text-gray-400 hover:text-gray-600"
                aria-label="Open URL"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        
        {(source.type === 'facebook' || source.type === 'google') && (
          <>
            {showCredentials ? (
              <div className="space-y-4 border-t pt-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={source.credentials?.username || ''}
                    onChange={(e) =>
                      onUpdate({
                        credentials: {
                          ...source.credentials,
                          username: e.target.value,
                        },
                      })
                    }
                    placeholder="Username or Email"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={source.credentials?.password || ''}
                    onChange={(e) =>
                      onUpdate({
                        credentials: {
                          ...source.credentials,
                          password: e.target.value,
                        },
                      })
                    }
                    placeholder="Password"
                    className="input-field"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowCredentials(false)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Hide Credentials
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCredentials(true)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Add API Credentials (Optional)
              </button>
            )}
          </>
        )}
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleExtract}
          disabled={!source.url || loading}
          className={`flex items-center btn-secondary ${
            !source.url ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <RefreshCw size={18} className="mr-2 animate-spin" />
          ) : (
            <RefreshCw size={18} className="mr-2" />
          )}
          Extract Data
        </button>
      </div>
    </div>
  );
};

export default SourceCard;