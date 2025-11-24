import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

const FindBolig = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRooms, setSelectedRooms] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
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
      setProperties(transformedData);
    }
  };

  const filteredProperties = properties.filter(property => {
    return (
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === '' || selectedLocation === 'alle' || property.location === selectedLocation) &&
      (selectedRooms === '' || selectedRooms === 'alle' || property.rooms.toString() === selectedRooms)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find din bolig</h1>
          <p className="text-xl">Søg blandt alle vores ledige og kommende boliger</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Søg efter boliger</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Søg efter bolig..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Vælg lokation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alle">Alle lokationer</SelectItem>
                <SelectItem value="Odense">Odense</SelectItem>
                <SelectItem value="København">København</SelectItem>
                <SelectItem value="Aarhus">Aarhus</SelectItem>
                <SelectItem value="Aalborg">Aalborg</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRooms} onValueChange={setSelectedRooms}>
              <SelectTrigger>
                <SelectValue placeholder="Antal værelser" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alle">Alle</SelectItem>
                <SelectItem value="1">1 værelse</SelectItem>
                <SelectItem value="2">2 værelser</SelectItem>
                <SelectItem value="3">3 værelser</SelectItem>
                <SelectItem value="4">4+ værelser</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Søg
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Viser {filteredProperties.length} af {properties.length} boliger
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Ingen boliger fundet med de valgte kriterier.</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('');
                setSelectedRooms('');
              }}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Ryd søgning
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default FindBolig;
