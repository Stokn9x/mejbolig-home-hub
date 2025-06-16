
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </header>

          <div className="flex-1 space-y-4 p-4 md:p-8">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Ejendomme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.totalProperties}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ledige Boliger</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{dashboardData.stats.availableProperties}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aktive Lejere</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.stats.totalTenants}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Venteliste</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{dashboardData.stats.waitlistCount}</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="properties" className="space-y-4">
              <TabsList>
                <TabsTrigger value="properties">Ejendomme</TabsTrigger>
                <TabsTrigger value="waitlist">Venteliste</TabsTrigger>
                <TabsTrigger value="messages">Beskeder</TabsTrigger>
              </TabsList>

              <TabsContent value="properties" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Mine Ejendomme</h2>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Tilføj Ejendom
                  </Button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Søg i ejendomme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-4">
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

              <TabsContent value="waitlist" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Venteliste</h2>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Send Email til Alle
                  </Button>
                </div>

                <div className="space-y-4">
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

              <TabsContent value="messages" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Beskeder</h2>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Ny Besked
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-gray-400 mb-4">📧</div>
                    <h3 className="text-lg font-semibold mb-2">Ingen beskeder</h3>
                    <p className="text-gray-600">Du har ingen nye beskeder at gennemse.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
