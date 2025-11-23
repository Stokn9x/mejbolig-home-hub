
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Mail } from 'lucide-react';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (data && !error) {
      // Transform data to match PropertyCard expectations
      const transformedData = data.map(prop => ({
        id: prop.id,
        title: prop.title,
        location: prop.location,
        price: prop.price,
        rooms: prop.rooms,
        size: prop.size,
        available: prop.available,
        image: prop.image_url || "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
      }));
      setFeaturedProperties(transformedData);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-navy text-navy-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">MEJBolig Aps</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find dit næste hjem med vores moderne platform!
          </p>
          <Link to="/find-bolig">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-orange-foreground">
              Find din bolig
            </Button>
          </Link>
        </div>
      </section>

      {/* Hero Image */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=400&fit=crop" 
            alt="MEJBolig ejendomme" 
            className="w-full h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Velkommen til MEJBolig</h2>
              <p className="text-muted-foreground mb-6">
                Velkommen til MEJBolig! Vi tilbyder moderne og velholdte lejeboliger 
                på attraktive adresser på hele Fyn. Hos os finder du alt fra hyggelige 1-
                værelses lejligheder til rummelige familieboliger med gode 
                transportmuligheder og nærhed til byliv og natur.
              </p>
              <Link to="/om-os">
                <Button className="bg-orange hover:bg-orange/90 text-orange-foreground">
                  Læs mere
                </Button>
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&h=400&fit=crop" 
                alt="Interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Nyeste boliger</h2>
          <p className="text-muted-foreground mb-6">Se vores senest tilføjede boliger</p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/find-bolig">
            <Button className="bg-orange hover:bg-orange/90 text-orange-foreground">
              Se alle boliger
            </Button>
          </Link>
        </div>
      </section>


      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg shadow-lg p-6 text-center">
            <Home className="h-12 w-12 text-orange mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-foreground">132</h3>
            <p className="text-muted-foreground">Antal boliger</p>
          </div>
          <div className="bg-card rounded-lg shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-orange mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-foreground">8</h3>
            <p className="text-muted-foreground">Boligtyper</p>
          </div>
          <div className="bg-card rounded-lg shadow-lg p-6 text-center">
            <Mail className="h-12 w-12 text-orange mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-foreground">256</h3>
            <p className="text-muted-foreground">Venteliste</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-navy-foreground py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2025 MEJBolig Aps. Alle rettigheder forbeholdt.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
