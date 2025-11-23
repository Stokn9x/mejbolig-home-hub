
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-navy text-navy-foreground shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange rounded-sm flex items-center justify-center">
              <span className="text-orange-foreground font-bold">M</span>
            </div>
            <span className="text-xl font-bold">MEJBolig</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/find-bolig" className="hover:text-orange transition-colors">
              Find bolig
            </Link>
            <Link to="/information-til-lejere" className="hover:text-orange transition-colors">
              Information til lejere
            </Link>
            <Link to="/om-os" className="hover:text-orange transition-colors">
              Om os
            </Link>
            <Link to="/kontakt" className="hover:text-orange transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Auth Button */}
          <div className="hidden md:block">
            <Link to="/login">
              <Button variant="outline" className="border-orange text-orange hover:bg-orange hover:text-orange-foreground">
                <User className="h-4 w-4 mr-2" />
                Ejer Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-navy/50">
            <nav className="flex flex-col space-y-4">
              <Link to="/find-bolig" className="hover:text-orange transition-colors">
                Find bolig
              </Link>
              <Link to="/information-til-lejere" className="hover:text-orange transition-colors">
                Information til lejere
              </Link>
              <Link to="/om-os" className="hover:text-orange transition-colors">
                Om os
              </Link>
              <Link to="/kontakt" className="hover:text-orange transition-colors">
                Kontakt
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-orange text-orange hover:bg-orange hover:text-orange-foreground w-fit">
                  <User className="h-4 w-4 mr-2" />
                  Ejer Login
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
