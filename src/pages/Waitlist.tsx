
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Header from '../components/Header';

const Waitlist = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Tilmeldt venteliste!",
      description: "Vi har modtaget din tilmelding og kontakter dig når der er ledige boliger.",
    });
    setFormData({ name: '', surname: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbage til forsiden
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Skriv dig op på ventelisten</CardTitle>
            <p className="text-gray-600">
              Få besked når der bliver ledige boliger der matcher dine ønsker
            </p>
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
                  placeholder="Efternavn"
                  value={formData.surname}
                  onChange={(e) => setFormData({...formData, surname: e.target.value})}
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
              
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Tilmeld
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              Ved at tilmelde dig accepterer du vores behandling af dine personlige oplysninger.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Waitlist;
