
import Header from '../components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Kontakt = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Kontakt os</h1>
          <p className="text-xl">Vi er her for at hjælpe dig - kontakt os i dag</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">Kom i kontakt</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-6 w-6 mr-2 text-orange-500" />
                  Telefon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">70 20 30 40</p>
                <p className="text-gray-600">Almindelige henvendelser</p>
                <p className="text-lg font-semibold mb-2 mt-4">40 20 30 40</p>
                <p className="text-gray-600">Akuttelefon (aften & weekend)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-6 w-6 mr-2 text-orange-500" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">info@mejbolig.dk</p>
                <p className="text-gray-600">Generelle henvendelser</p>
                <p className="text-lg font-semibold mb-2 mt-4">support@mejbolig.dk</p>
                <p className="text-gray-600">Teknisk support</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-orange-500" />
                  Adresse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">MEJBolig ApS</p>
                <p className="text-gray-600">
                  Hovedgade 123<br />
                  5000 Odense C<br />
                  Danmark
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-6 w-6 mr-2 text-orange-500" />
                  Åbningstider
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-semibold">Mandag - Fredag:</span> 09:00 - 16:00</p>
                  <p><span className="font-semibold">Lørdag:</span> 10:00 - 14:00</p>
                  <p><span className="font-semibold">Søndag:</span> Lukket</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send os en besked</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fornavn</label>
                  <Input placeholder="Dit fornavn" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Efternavn</label>
                  <Input placeholder="Dit efternavn" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input type="email" placeholder="din@email.dk" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <Input type="tel" placeholder="Dit telefonnummer" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emne</label>
                <Input placeholder="Hvad handler din henvendelse om?" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Besked</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows={6}
                  placeholder="Skriv din besked her..."
                ></textarea>
              </div>
              
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Send besked
              </Button>
            </form>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Find os</h2>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Kort over vores lokation</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kontakt;
