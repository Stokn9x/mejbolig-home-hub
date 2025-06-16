
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Home, Users, Mail } from 'lucide-react';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for properties
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
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRooms, setSelectedRooms] = useState('');

  const filteredProperties = properties.filter(property => {
    return (
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === '' || property.location === selectedLocation) &&
      (selectedRooms === '' || property.rooms.toString() === selectedRooms)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-700 to-slate-800 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">MEJBolig Aps</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find dit næste hjem eller administrer dine ejendomme med vores moderne platform
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            Find din bolig
          </Button>
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
                <SelectItem value="">Alle lokationer</SelectItem>
                <SelectItem value="Odense">Odense</SelectItem>
                <SelectItem value="København">København</SelectItem>
                <SelectItem value="Aarhus">Aarhus</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRooms} onValueChange={setSelectedRooms}>
              <SelectTrigger>
                <SelectValue placeholder="Antal værelser" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle</SelectItem>
                <SelectItem value="1">1 værelse</SelectItem>
                <SelectItem value="2">2 værelser</SelectItem>
                <SelectItem value="3">3+ værelser</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Søg
            </Button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Velkommen til MEJBolig</h2>
              <p className="text-gray-600 mb-6">
                Velkommen til vores skønne bygning! Her finder du alt hvad og 
                oplevende beboelserde med varmeamtære omgivelser, gode lokaler og 
                funktive funktioner. Vi tilbyder dig at udforske for alle leve omgivelser at 
                udelive, samt optimalen veje til byen og området omkring.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Læs mere
              </Button>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop" 
                alt="Interior" 
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Home className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">132</h3>
            <p className="text-gray-600">Antal boliger</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">8</h3>
            <p className="text-gray-600">Boligtyper</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Mail className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">256</h3>
            <p className="text-gray-600">Venteliste</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2025 MEJBolig Aps. Alle rettigheder forbeholdt.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
