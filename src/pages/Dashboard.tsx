
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Home, Users, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import PropertyForm from '@/components/PropertyForm';
import { supabase } from '@/lib/supabase';


const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyCount, setPropertyCount] = useState(0);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        fetchProperties();
      }
    };
    
    checkAuth();
  }, [navigate]);

  const fetchProperties = async () => {
    const { data, count } = await supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (data) {
      setProperties(data);
      setPropertyCount(count || 0);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handlePropertyAdded = () => {
    setIsDialogOpen(false);
    fetchProperties();
  };

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
                  <div className="text-2xl font-bold">{propertyCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ledige Boliger</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {properties.filter(p => p.available).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Udlejede Boliger</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {properties.filter(p => !p.available).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Venteliste</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">0</div>
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
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-orange hover:bg-orange/90 text-orange-foreground">
                        Tilføj Ejendom
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Tilføj ny bolig</DialogTitle>
                      </DialogHeader>
                      <PropertyForm onSuccess={handlePropertyAdded} />
                    </DialogContent>
                  </Dialog>
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
                  {properties.map((property) => (
                    <Card key={property.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="text-lg font-semibold">{property.title}</h3>
                              {property.available ? (
                                <Badge className="bg-green-500">Ledig</Badge>
                              ) : (
                                <Badge className="bg-blue-500">Udlejet</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-1">{property.location}</p>
                            <p className="text-lg font-bold text-slate-800">{property.price}</p>
                            <p className="text-sm text-gray-600">{property.rooms} værelser • {property.size}</p>
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
                  {properties.length === 0 && (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-gray-600">Ingen ejendomme endnu. Tilføj din første ejendom!</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="waitlist" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Venteliste</h2>
                </div>

                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">Ingen personer på ventelisten endnu.</p>
                  </CardContent>
                </Card>
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
