
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Mail, Plus, Settings, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for dashboard
const dashboardData = {
  stats: {
    totalProperties: 12,
    availableProperties: 3,
    totalTenants: 28,
    waitlistCount: 15
  },
  properties: [
    {
      id: 1,
      title: "2-værelses centralt i Odense",
      location: "Odense",
      price: "8.500 kr./mdr.",
      status: "available",
      tenant: null,
      waitlist: 5
    },
    {
      id: 2,
      title: "3-værelses København",
      location: "København", 
      price: "12.500 kr./mdr.",
      status: "occupied",
      tenant: "Lars Nielsen",
      waitlist: 8
    },
    {
      id: 3,
      title: "1-værelses Aarhus",
      location: "Aarhus",
      price: "6.500 kr./mdr.",
      status: "available", 
      tenant: null,
      waitlist: 2
    }
  ],
  waitlist: [
    { id: 1, name: "Anna Larsen", email: "anna@email.dk", property: "2-værelses centralt i Odense", date: "2025-01-10" },
    { id: 2, name: "Peter Hansen", email: "peter@email.dk", property: "3-værelses København", date: "2025-01-12" },
    { id: 3, name: "Maria Jensen", email: "maria@email.dk", property: "1-værelses Aarhus", date: "2025-01-15" }
  ]
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500">Ledig</Badge>;
      case 'occupied':
        return <Badge className="bg-blue-500">Udlejet</Badge>;
      default:
        return <Badge variant="secondary">Ukendt</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-xl font-bold">MEJBolig Dashboard</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm">Velkommen, Ejer</span>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Indstillinger
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log ud
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ejendomme</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.totalProperties}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ledige Boliger</CardTitle>
              <Home className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardData.stats.availableProperties}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Lejere</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{dashboardData.stats.totalTenants}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Venteliste</CardTitle>
              <Mail className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{dashboardData.stats.waitlistCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">Ejendomme</TabsTrigger>
            <TabsTrigger value="waitlist">Venteliste</TabsTrigger>
            <TabsTrigger value="messages">Beskeder</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mine Ejendomme</h2>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tilføj Ejendom
              </Button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Søg i ejendomme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid gap-6">
              {dashboardData.properties.map((property) => (
                <Card key={property.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-lg font-semibold">{property.title}</h3>
                          {getStatusBadge(property.status)}
                        </div>
                        <p className="text-gray-600 mb-1">{property.location}</p>
                        <p className="text-lg font-bold text-slate-800">{property.price}</p>
                        {property.tenant && (
                          <p className="text-sm text-gray-600 mt-2">Lejer: {property.tenant}</p>
                        )}
                        <p className="text-sm text-gray-600">Venteliste: {property.waitlist} personer</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Rediger
                        </Button>
                        <Button variant="outline" size="sm">
                          Se detaljer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="waitlist" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Venteliste</h2>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Mail className="h-4 w-4 mr-2" />
                Send Email til Alle
              </Button>
            </div>

            <div className="grid gap-4">
              {dashboardData.waitlist.map((person) => (
                <Card key={person.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-gray-600">{person.email}</p>
                        <p className="text-sm text-gray-500">Interesseret i: {person.property}</p>
                        <p className="text-sm text-gray-500">Tilmeldt: {person.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </Button>
                        <Button variant="outline" size="sm">
                          Fjern
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Beskeder</h2>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Ny Besked
              </Button>
            </div>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ingen beskeder</h3>
                <p className="text-gray-600">Du har ingen nye beskeder at gennemse.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
