import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PropertyFormData {
  title: string;
  location: string;
  address: string;
  price: string;
  rooms: number;
  size: string;
  available: boolean;
  image_url: string;
  description: string;
  apartment_type: string;
  floor: string;
  elevator: boolean;
  furnished: boolean;
  balcony: boolean;
  parking: boolean;
  pets_allowed: boolean;
  move_in_date: string;
  deposit: string;
  prepaid_rent: string;
  utilities_included: boolean;
  heating_type: string;
  energy_rating: string;
  year_built: string;
}

const PropertyForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    location: '',
    address: '',
    price: '',
    rooms: 1,
    size: '',
    available: true,
    image_url: '',
    description: '',
    apartment_type: '',
    floor: '',
    elevator: false,
    furnished: false,
    balcony: false,
    parking: false,
    pets_allowed: false,
    move_in_date: '',
    deposit: '',
    prepaid_rent: '',
    utilities_included: false,
    heating_type: '',
    energy_rating: '',
    year_built: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('properties')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Bolig tilføjet succesfuldt.",
      });

      // Reset form
      setFormData({
        title: '',
        location: '',
        address: '',
        price: '',
        rooms: 1,
        size: '',
        available: true,
        image_url: '',
        description: '',
        apartment_type: '',
        floor: '',
        elevator: false,
        furnished: false,
        balcony: false,
        parking: false,
        pets_allowed: false,
        move_in_date: '',
        deposit: '',
        prepaid_rent: '',
        utilities_included: false,
        heating_type: '',
        energy_rating: '',
        year_built: '',
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Fejl",
        description: error.message || "Kunne ikke tilføje bolig",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Grundlæggende information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Lokation *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Eksempel: Nørregade 15, 5000 Odense C"
              />
            </div>

            <div>
              <Label htmlFor="price">Månedlig leje *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="8.500 kr./mdr."
                required
              />
            </div>

            <div>
              <Label htmlFor="rooms">Antal værelser *</Label>
              <Input
                id="rooms"
                type="number"
                min="1"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })}
                required
              />
            </div>

            <div>
              <Label htmlFor="size">Størrelse *</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="65 m²"
                required
              />
            </div>

            <div>
              <Label htmlFor="image_url">Billed URL</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Beskrivelse</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Beskriv boligen..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle>Boligdetaljer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="apartment_type">Boligtype</Label>
              <Input
                id="apartment_type"
                value={formData.apartment_type}
                onChange={(e) => setFormData({ ...formData, apartment_type: e.target.value })}
                placeholder="Lejlighed, Hus, etc."
              />
            </div>

            <div>
              <Label htmlFor="floor">Etage</Label>
              <Input
                id="floor"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                placeholder="2. sal"
              />
            </div>

            <div>
              <Label htmlFor="year_built">Opført år</Label>
              <Input
                id="year_built"
                value={formData.year_built}
                onChange={(e) => setFormData({ ...formData, year_built: e.target.value })}
                placeholder="2020"
              />
            </div>

            <div>
              <Label htmlFor="energy_rating">Energimærke</Label>
              <Input
                id="energy_rating"
                value={formData.energy_rating}
                onChange={(e) => setFormData({ ...formData, energy_rating: e.target.value })}
                placeholder="A, B, C, etc."
              />
            </div>

            <div>
              <Label htmlFor="heating_type">Opvarmning</Label>
              <Input
                id="heating_type"
                value={formData.heating_type}
                onChange={(e) => setFormData({ ...formData, heating_type: e.target.value })}
                placeholder="Fjernvarme, Gas, etc."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rental Details */}
      <Card>
        <CardHeader>
          <CardTitle>Udlejningsdetaljer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="move_in_date">Indflytningsdato</Label>
              <Input
                id="move_in_date"
                value={formData.move_in_date}
                onChange={(e) => setFormData({ ...formData, move_in_date: e.target.value })}
                placeholder="1. marts 2024"
              />
            </div>

            <div>
              <Label htmlFor="deposit">Depositum</Label>
              <Input
                id="deposit"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                placeholder="25.500 kr."
              />
            </div>

            <div>
              <Label htmlFor="prepaid_rent">Forudbetaling</Label>
              <Input
                id="prepaid_rent"
                value={formData.prepaid_rent}
                onChange={(e) => setFormData({ ...formData, prepaid_rent: e.target.value })}
                placeholder="8.500 kr."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Faciliteter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
              />
              <Label htmlFor="available">Tilgængelig</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="elevator"
                checked={formData.elevator}
                onCheckedChange={(checked) => setFormData({ ...formData, elevator: checked })}
              />
              <Label htmlFor="elevator">Elevator</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="furnished"
                checked={formData.furnished}
                onCheckedChange={(checked) => setFormData({ ...formData, furnished: checked })}
              />
              <Label htmlFor="furnished">Møbleret</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="balcony"
                checked={formData.balcony}
                onCheckedChange={(checked) => setFormData({ ...formData, balcony: checked })}
              />
              <Label htmlFor="balcony">Altan/Balkon</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="parking"
                checked={formData.parking}
                onCheckedChange={(checked) => setFormData({ ...formData, parking: checked })}
              />
              <Label htmlFor="parking">Parkering</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="pets_allowed"
                checked={formData.pets_allowed}
                onCheckedChange={(checked) => setFormData({ ...formData, pets_allowed: checked })}
              />
              <Label htmlFor="pets_allowed">Kæledyr tilladt</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="utilities_included"
                checked={formData.utilities_included}
                onCheckedChange={(checked) => setFormData({ ...formData, utilities_included: checked })}
              />
              <Label htmlFor="utilities_included">Forbrug inkluderet</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-orange hover:bg-orange/90 text-orange-foreground">
        {isSubmitting ? 'Tilføjer...' : 'Tilføj bolig'}
      </Button>
    </form>
  );
};

export default PropertyForm;
