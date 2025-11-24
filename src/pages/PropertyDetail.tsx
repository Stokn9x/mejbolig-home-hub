import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Users, Mail, Phone, Calendar, Check, Building2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import Header from '../components/Header';
import { supabase } from '@/lib/supabase';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (data && !error) {
      setProperty(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Indlæser...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Bolig ikke fundet</h1>
          <Link to="/find-bolig" className="text-orange hover:text-orange/90">
            Tilbage til søgning
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/find-bolig" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbage til søgning
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Image */}
            <div className="relative">
              <img 
                src={property.image_url || "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=600&fit=crop"} 
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
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.address || property.location}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 text-orange mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Værelser</p>
                      <p className="font-semibold text-foreground">{property.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-orange mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Størrelse</p>
                      <p className="font-semibold text-foreground">{property.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-orange mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Indflytning</p>
                      <p className="font-semibold text-foreground">{property.move_in_date || 'Efter aftale'}</p>
                    </div>
                  </div>
                </div>

                {property.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Beskrivelse</h3>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </div>
                )}

                {/* Property Details Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Detaljer om bolig</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {property.apartment_type && (
                      <div>
                        <p className="text-sm text-muted-foreground">Boligtype</p>
                        <p className="font-medium text-foreground">{property.apartment_type}</p>
                      </div>
                    )}
                    {property.floor && (
                      <div>
                        <p className="text-sm text-muted-foreground">Etage</p>
                        <p className="font-medium text-foreground">{property.floor}</p>
                      </div>
                    )}
                    {property.year_built && (
                      <div>
                        <p className="text-sm text-muted-foreground">Opført år</p>
                        <p className="font-medium text-foreground">{property.year_built}</p>
                      </div>
                    )}
                    {property.energy_rating && (
                      <div>
                        <p className="text-sm text-muted-foreground">Energimærke</p>
                        <p className="font-medium text-foreground">{property.energy_rating}</p>
                      </div>
                    )}
                    {property.heating_type && (
                      <div>
                        <p className="text-sm text-muted-foreground">Opvarmning</p>
                        <p className="font-medium text-foreground">{property.heating_type}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Faciliteter</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.elevator && (
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-muted-foreground">Elevator</span>
                      </div>
                    )}
                    {property.furnished && (
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-muted-foreground">Møbleret</span>
                      </div>
                    )}
                    {property.balcony && (
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-muted-foreground">Altan/Balkon</span>
                      </div>
                    )}
                    {property.parking && (
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-muted-foreground">Parkering</span>
                      </div>
                    )}
                    {property.pets_allowed && (
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-muted-foreground">Kæledyr tilladt</span>
                      </div>
                    )}
                    {property.utilities_included && (
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-muted-foreground">Forbrug inkluderet</span>
                      </div>
                    )}
                    {property.features && property.features.length > 0 && property.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Detaljer om udlejning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Månedlig leje</p>
                    <p className="text-2xl font-bold text-foreground">{property.price}</p>
                  </div>
                  {property.deposit && (
                    <div>
                      <p className="text-sm text-muted-foreground">Depositum</p>
                      <p className="text-lg font-semibold text-foreground">{property.deposit}</p>
                    </div>
                  )}
                  {property.prepaid_rent && (
                    <div>
                      <p className="text-sm text-muted-foreground">Forudbetaling</p>
                      <p className="text-lg font-semibold text-foreground">{property.prepaid_rent}</p>
                    </div>
                  )}
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
                    className="w-full bg-orange hover:bg-orange/90 text-orange-foreground"
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
                  <CardTitle>Om udlejeren</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">MEJBolig ApS</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">kontakt@mejbolig.dk</span>
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
