
import Header from '../components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, Phone, Mail, AlertCircle } from 'lucide-react';

const InformationTilLejere = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Information til lejere</h1>
          <p className="text-xl">Alt hvad du behøver at vide som lejer hos MEJBolig</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Lejekontrakt */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-6 w-6 mr-2 text-orange-500" />
                Lejekontrakt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Alle vores lejekontrakter følger dansk lejelovgivning og indeholder:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Klar beskrivelse af lejemål</li>
                <li>Huslejebeløb og betalingsfrister</li>
                <li>Depositum og forudbetalt leje</li>
                <li>Opsigelsesfrister</li>
                <li>Vedligeholdelsesforpligtelser</li>
              </ul>
            </CardContent>
          </Card>

          {/* Betaling */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-6 w-6 mr-2 text-orange-500" />
                Betaling af husleje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Husleje skal betales senest den 1. i måneden:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Betaling via netbank eller MobilePay</li>
                <li>Automatisk betaling kan oprettes</li>
                <li>Ved forsinket betaling opkræves renter</li>
                <li>Kontakt os ved betalingsproblemer</li>
              </ul>
            </CardContent>
          </Card>

          {/* Vedligeholdelse */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-6 w-6 mr-2 text-orange-500" />
                Vedligeholdelse og reparationer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Vi sørger for professionel vedligeholdelse:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Akutte reparationer inden 24 timer</li>
                <li>Planlagt vedligeholdelse med forudgående varsel</li>
                <li>Lejers egen vedligeholdelse af indvendige flader</li>
                <li>Kontakt os på telefon 70 20 30 40</li>
              </ul>
            </CardContent>
          </Card>

          {/* Kontakt */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-6 w-6 mr-2 text-orange-500" />
                Kontakt og support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Vi er her for at hjælpe dig:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Telefon: 70 20 30 40 (hverdage 9-16)</li>
                <li>Email: info@mejbolig.dk</li>
                <li>Akuttelefon: 40 20 30 40 (aften/weekend)</li>
                <li>Online support via vores hjemmeside</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Vigtige dokumenter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <FileText className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Husorden</h3>
              <p className="text-gray-600 text-sm">Download husorden for din ejendom</p>
            </div>
            <div className="text-center">
              <FileText className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Affaldssortering</h3>
              <p className="text-gray-600 text-sm">Guide til korrekt affaldssortering</p>
            </div>
            <div className="text-center">
              <FileText className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Opsigelse</h3>
              <p className="text-gray-600 text-sm">Information om opsigelse af lejemål</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InformationTilLejere;
