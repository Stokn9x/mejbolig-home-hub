
import Header from '../components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building, Users, Award, Heart } from 'lucide-react';

const OmOs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Om MEJBolig</h1>
          <p className="text-xl">Din pålidelige partner inden for boligudlejning</p>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Vores historie</h2>
              <p className="text-gray-600 mb-4">
                MEJBolig blev grundlagt i 2015 med en simpel mission: at skabe fremragende boligoplevelser 
                for både lejere og ejendomsejere. Vi startede med kun få ejendomme, men har siden udviklet 
                os til en af Danmarks mest pålidelige udlejningsvirksomheder.
              </p>
              <p className="text-gray-600 mb-4">
                Vores fokus ligger på at levere høj kvalitet, gennemsigtighed og personlig service. 
                Vi tror på, at et hjem er mere end bare fire vægge - det er stedet hvor livet udfolder sig.
              </p>
              <p className="text-gray-600">
                I dag administrerer vi over 130 boliger på tværs af Danmark og fortsætter med at vokse, 
                altid med vores kerneværdier i centrum.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop" 
                alt="MEJBolig kontor" 
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center flex-col">
                <Building className="h-12 w-12 text-orange-500 mb-2" />
                Kvalitet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Vi sikrer høj standard i alle vores boliger gennem kontinuerlig vedligeholdelse og opgraderinger.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center flex-col">
                <Users className="h-12 w-12 text-orange-500 mb-2" />
                Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Personlig service og hurtig respons på alle henvendelser er kernen i vores tilgang.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center flex-col">
                <Award className="h-12 w-12 text-orange-500 mb-2" />
                Erfaring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Over 10 års erfaring inden for ejendomsadministration og boligudlejning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center flex-col">
                <Heart className="h-12 w-12 text-orange-500 mb-2" />
                Omsorg
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Vi behandler hver bolig som om det var vores eget hjem og hver lejer som familie.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Mød vores team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lars Nielsen</h3>
              <p className="text-orange-500 mb-2">Direktør & Grundlægger</p>
              <p className="text-gray-600 text-sm">
                Lars har over 15 års erfaring inden for ejendomsbranchen og er passioneret omkring kvalitetsboliger.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Maria Andersen</h3>
              <p className="text-orange-500 mb-2">Kundeservice Chef</p>
              <p className="text-gray-600 text-sm">
                Maria sikrer at alle vores lejere får den bedste service og support hele vejen igennem.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thomas Jensen</h3>
              <p className="text-orange-500 mb-2">Vedligeholdelseschef</p>
              <p className="text-gray-600 text-sm">
                Thomas står for at alle vores boliger altid er i perfekt stand og klar til nye lejere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OmOs;
