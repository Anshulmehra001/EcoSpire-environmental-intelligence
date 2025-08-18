import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ 
  isOpen, 
  onToggle, 
  activePage, 
  onPageChange, 
  pages = [],
  userStats = {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPages, setFilteredPages] = useState(pages);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pages.filter(page =>
        page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPages(filtered);
    } else {
      setFilteredPages(pages);
    }
  }, [searchTerm, pages]);

  const groupedPages = filteredPages.reduce((groups, page) => {
    const category = page.category || 'Tools';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(page);
    return groups;
  }, {});

  const handlePageClick = (pageId) => {
    onPageChange(pageId);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className={`terra-sidebar ${isOpen ? 'terra-sidebar--open' : 'terra-sidebar--closed'}`}>
      {/* Logo Section */}
      <div className="terra-sidebar__header">
        <div className="terra-sidebar__logo">
          <div className="terra-sidebar__logo-icon">
            🌿
          </div>
          {isOpen && (
            <div className="terra-sidebar__logo-text">
              <h1 className="terra-sidebar__logo-title">EcoSpire</h1>
              <p className="terra-sidebar__logo-subtitle">Environmental Intelligence Hub</p>
            </div>
          )}
        </div>
        <button 
          className="terra-sidebar__toggle"
          onClick={onToggle}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <span className={`terra-sidebar__toggle-icon ${isOpen ? 'terra-sidebar__toggle-icon--open' : ''}`}>
            ▶
          </span>
        </button>
      </div>

      {/* Search Section */}
      {isOpen && (
        <div className="terra-sidebar__search">
          <div className="terra-sidebar__search-container">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="terra-sidebar__search-input"
            />
            <div className="terra-sidebar__search-icon">
              {searchTerm ? (
                <button 
                  onClick={clearSearch}
                  className="terra-sidebar__search-clear"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : (
                <span>🔍</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Section */}
      <nav className="terra-sidebar__nav">
        <div className="terra-sidebar__nav-content">
          {Object.entries(groupedPages).map(([category, categoryPages]) => (
            <div key={category} className="terra-sidebar__category">
              {isOpen && (
                <h3 className="terra-sidebar__category-title">{category}</h3>
              )}
              <div className="terra-sidebar__category-items">
                {categoryPages.map(page => (
                  <div
                    key={page.id}
                    className={`terra-sidebar__nav-item ${
                      activePage === page.id ? 'terra-sidebar__nav-item--active' : ''
                    }`}
                    onClick={() => handlePageClick(page.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePageClick(page.id);
                      }
                    }}
                  >
                    <div className="terra-sidebar__nav-icon">
                      {page.icon}
                    </div>
                    {isOpen && (
                      <div className="terra-sidebar__nav-content">
                        <span className="terra-sidebar__nav-name">{page.name}</span>
                        <span className="terra-sidebar__nav-desc">{page.description}</span>
                      </div>
                    )}
                    {activePage === page.id && (
                      <div className="terra-sidebar__nav-indicator" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Stats Footer */}
      {isOpen && (
        <div className="terra-sidebar__footer">
          <div className="terra-sidebar__stats">
            <div className="terra-sidebar__stat">
              <span className="terra-sidebar__stat-icon">🌱</span>
              <div className="terra-sidebar__stat-content">
                <div className="terra-sidebar__stat-value">
                  {userStats.toolsUsed || pages.length}
                </div>
                <div className="terra-sidebar__stat-label">Tools</div>
              </div>
            </div>
            <div className="terra-sidebar__stat">
              <span className="terra-sidebar__stat-icon">🌍</span>
              <div className="terra-sidebar__stat-content">
                <div className="terra-sidebar__stat-value">
                  {userStats.impactScore || '2.5M+'}
                </div>
                <div className="terra-sidebar__stat-label">Impact</div>
              </div>
            </div>
          </div>
          <div className="terra-sidebar__version">
            <span>EcoSpire v2.0</span>
          </div>
        </div>
      )}

      {/* Tooltip for collapsed state */}
      {!isOpen && (
        <div className="terra-sidebar__tooltip" id="sidebar-tooltip" role="tooltip">
          <div className="terra-sidebar__tooltip-content"></div>
          <div className="terra-sidebar__tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;