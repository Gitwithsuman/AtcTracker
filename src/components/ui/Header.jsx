import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from './AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: 'Home' },
    { label: 'Results', path: '/results', icon: 'BarChart3' },
    { label: 'Health', path: '/health', icon: 'Heart' },
    { label: 'Sync', path: '/sync', icon: 'RefreshCw' },
    { label: 'Plans', path: '/plans', icon: 'CreditCard' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Leaf" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-heading font-semibold text-foreground leading-tight">
              ATCTacker
            </h1>
            <span className="text-xs font-caption text-muted-foreground">
              Classification Specialist
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-all duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-elevation'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* User Actions & Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* Plan Usage Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
            <Icon name="Zap" size={14} color="var(--color-warning)" />
            <span className="text-xs font-caption text-muted-foreground">
              12/50 uploads
            </span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevation-md">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-body font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {/* Mobile Plan Usage */}
            <div className="flex items-center justify-between px-3 py-3 mt-4 bg-muted rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} color="var(--color-warning)" />
                <span className="text-sm font-caption text-muted-foreground">
                  Usage: 12/50 uploads
                </span>
              </div>
              <Button variant="outline" size="xs">
                Upgrade
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;