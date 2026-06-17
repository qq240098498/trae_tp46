import { Link, useLocation } from 'react-router-dom';
import { Scale, FileText, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: '首页', icon: Scale },
    { path: '/templates', label: '模板库', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-ivory-200 sticky top-0 z-50 shadow-soft">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors">
              <Scale className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <h1 className="text-lg font-serif font-semibold text-primary-800">智审合同</h1>
              <p className="text-xs text-ink-500">智能合同风险审查辅助系统</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-ink-600 hover:bg-ivory-100 hover:text-ink-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className="btn-secondary px-4 py-2 text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                立即审查
              </span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-ink-600 hover:text-primary-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-ivory-200 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-ink-600 hover:bg-ivory-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/"
                className="mt-2 btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                立即审查合同
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
