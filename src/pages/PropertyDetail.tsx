
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Users, Calendar, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import Header from '../components/Header';

// Mock property data
const getPropertyById = (id: string) => {
  const properties = {
    '1': {
      id: 1,
      title: "2-værelses lejlighed boliggrunde centralt i Odense",
      location: "Odense",
      price: "8.500 kr./mdr.",
      rooms: 2,
      size: "65 m²",
      available: true,
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop"
      ],
      description: "Karakteristik: 2-værelses lejlighed boliggrunde centralt i Odense. 2 soveværelser. Ejere, køkken. Krav: begrænset antal personer. I umiddelbares nærheden skal være adgangsvej fra ejer til kød, fortrins til regioner eller af regionslov af hjemmeadresse og adgang til og regioner eller af regelskabelse med et fælles hjemmeadresse med et fælles gladbevidsthed.",
      details: {
        rooms: 2,
        floor: 2,
        size: "65 m²",
        deposit: "25.500 kr.",
        prepaid: "8.500 kr.",
        heating: "4.500 kr./år",
        available: "1. juni 2025"
      },
      landlord: {
        name: "MEJBolig ApS",
        phone: "+45 12 34 56 78",
        email: "udlejning@mejbolig.dk"
      }
    }
  };
  return properties[id as keyof typeof properties];
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(id || '1');
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Bolig ikke fundet</h1>
          <Link to="/">
            <Button className="mt-4">Tilbage til forsiden</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (property.available) {
      toast({
        title: "Besked sendt!",
        description: "Vi har modtaget din besked og vender tilbage hurtigst muligt.",
      });
    } else {
      toast({
        title: "Tilmeldt venteliste!",
        description: "Du er nu tilmeldt ventelisten for denne bolig.",
      });
    }
    setFormData({ name: '', email: '', phone: '', message: '' });
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
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src={property.images[currentImage]} 
                  alt={property.title}
                  className="w-full h-96 object-cover"
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
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-2 p-4">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImage === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detaljer om bolig</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Værelser</span>
                    <span className="font-medium">{property.details.rooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Etage</span>
                    <span className="font-medium">{property.details.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Størrelse</span>
                    <span className="font-medium">{property.details.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Depositum</span>
                    <span className="font-medium">{property.details.deposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Forudbetalt</span>
                    <span className="font-medium">{property.details.prepaid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Varme</span>
                    <span className="font-medium">{property.details.heating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Beskrivelse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{property.title}</span>
                </CardTitle>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">
                  {property.price}
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Navn"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Telefon"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Besked..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {property.available ? "Kontakt udlejer" : "Tilmeld venteliste"}
                  </Button>
                </form>

                {/* Landlord Contact */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3">Kontakt udlejer</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{property.landlord.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{property.landlord.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{property.landlord.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
