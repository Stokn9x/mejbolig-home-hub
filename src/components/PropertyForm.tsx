import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface PropertyFormData {
  title: string;
  location: string;
  price: string;
  rooms: number;
  size: string;
  available: boolean;
  image_url: string;
  description: string;
}

const PropertyForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    location: '',
    price: '',
    rooms: 1,
    size: '',
    available: true,
    image_url: '',
    description: '',
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
        price: '',
        rooms: 1,
        size: '',
        available: true,
        image_url: '',
        description: '',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Titel</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="location">Lokation</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Pris (kr./mdr.)</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="rooms">Antal værelser</Label>
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
          <Label htmlFor="size">Størrelse (m²)</Label>
          <Input
            id="size"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
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
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="available"
          checked={formData.available}
          onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
        />
        <Label htmlFor="available">Tilgængelig</Label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-orange hover:bg-orange/90 text-orange-foreground">
        {isSubmitting ? 'Tilføjer...' : 'Tilføj bolig'}
      </Button>
    </form>
  );
};

export default PropertyForm;
