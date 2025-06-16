
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Users, Mail, Phone, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import Header from '../components/Header';

// Mock data - same as in Index.tsx
const properties = [
  {
    id: 1,
    title: "2-værelses lejlighed boliggrunde centralt i Odense",
    location: "Odense",
    price: "8.500 kr./mdr.",
    rooms: 2,
    size: "65 m²",
    available: true,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    description: "Smuk 2-værelses lejlighed beliggende centralt i Odense. Lejligheden er nyistandsat og indeholder moderne køkken, stort badeværelse og lys stue med udgang til altan.",
    address: "Nørregade 15, 5000 Odense C",
    moveInDate: "1. marts 2024",
    deposit: "25.500 kr.",
    prepaid: "8.500 kr.",
    landlord: {
      name: "Lars Andersen",
      phone: "+45 12 34 56 78",
      email: "lars@mejbolig.dk"
    },
    features: [
      "Nyistandsat",
      "Altan",
      "Moderne køkken",
      "Tæt på offentlig transport",
      "Parkering"
    ]
  },
  {
    id: 2,
    title: "3-værelses lejlighed København",
    location: "København",
    price: "12.500 kr./mdr.",
    rooms: 3,
    size: "85 m²",
    available: false,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    description: "Rummelig 3-værelses lejlighed i hjertet af København. Perfekt til familier med god plads og lys fra alle sider.",
    address: "Vesterbrogade 45, 1620 København V",
    moveInDate: "Udlejet",
    deposit: "37.500 kr.",
    prepaid: "12.500 kr.",
    landlord: {
      name: "Marie Nielsen",
      phone: "+45 87 65 43 21",
      email: "marie@mejbolig.dk"
    },
    features: [
      "3 værelser",
      "Balkon",
      "Opvaskemaskine",
      "Central beliggenhed",
      "Elevator"
    ]
  }
];

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id || '0'));
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Bolig ikke fundet</h1>
          <Link to="/" className="text-orange-500 hover:text-orange-600">
            Tilbage til forsiden
          </Link>
        </div>
      </div>
    );
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: property.available ? "Besked sendt!" : "Tilmeldt venteliste!",
      description: property.available 
        ? "Vi har sendt din besked til udlejeren. De kontakter dig hurtigst muligt."
        : "Vi har tilmeldt dig ventelisten for denne bolig.",
    });
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbage til søgning
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Image */}
            <div className="relative">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={property.available ? "default" : "destructive"}
                  className={property.available ? "bg-green-500" : "bg-red-500"}
                >
                  {property.available ? "Ledig" : "Udlejet"}
                </Badge>
              </div>
            </div>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{property.title}</CardTitle>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.address}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 text-orange-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Værelser</p>
                      <p className="font-semibold">{property.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-orange-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Størrelse</p>
                      <p className="font-semibold">{property.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-orange-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Indflytning</p>
                      <p className="font-semibold">{property.moveInDate}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Beskrivelse</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Faciliteter</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Priser</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Månedlig husleje</p>
                    <p className="text-2xl font-bold text-slate-800">{property.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Depositum</p>
                    <p className="text-lg font-semibold">{property.deposit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Forudbetaling</p>
                    <p className="text-lg font-semibold">{property.prepaid}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {property.available ? "Kontakt udlejer" : "Tilmeld venteliste"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Dit navn"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Din email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Dit telefonnummer"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder={property.available ? "Skriv en besked til udlejeren..." : "Fortæl kort om dig selv..."}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={4}
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {property.available ? "Send besked" : "Tilmeld venteliste"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Landlord Info */}
            {property.available && (
              <Card>
                <CardHeader>
                  <CardTitle>Udlejer information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{property.landlord.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{property.landlord.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{property.landlord.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
