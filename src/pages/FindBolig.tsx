
import { useState } from 'react';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for all properties
const properties = [
  {
    id: 1,
    title: "2-værelses lejlighed boliggrunde centralt i Odense",
    location: "Odense",
    price: "8.500 kr./mdr.",
    rooms: 2,
    size: "65 m²",
    available: true,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "3-værelses lejlighed København",
    location: "København",
    price: "12.500 kr./mdr.",
    rooms: 3,
    size: "85 m²",
    available: false,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "1-værelses lejlighed Aarhus",
    location: "Aarhus",
    price: "6.500 kr./mdr.",
    rooms: 1,
    size: "45 m²",
    available: true,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "4-værelses hus i Aalborg",
    location: "Aalborg",
    price: "15.000 kr./mdr.",
    rooms: 4,
    size: "120 m²",
    available: true,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
  }
];

const FindBolig = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRooms, setSelectedRooms] = useState('');

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
