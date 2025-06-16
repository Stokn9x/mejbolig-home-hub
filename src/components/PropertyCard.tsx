
import { Link } from 'react-router-dom';
import { MapPin, Home, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  rooms: number;
  size: string;
  available: boolean;
  image: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover"
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
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-1" />
            <span>{property.rooms} værelser</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{property.size}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-800">
            {property.price}
          </span>
          <Link to={`/property/${property.id}`}>
            <Button 
              size="sm" 
              className={
                property.available 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "bg-gray-500 hover:bg-gray-600 text-white"
              }
            >
              {property.available ? "Se bolig" : "Venteliste"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
