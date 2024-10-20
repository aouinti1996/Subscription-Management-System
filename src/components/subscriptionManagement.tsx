"use client"

import {useState} from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {BarChart2, DollarSign, UserMinus, Users} from "lucide-react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

// Composants fictifs pour les différentes sections
import Dashboard from "@/components/dashboard"
import SubscribedProviders from "@/components/subscribedProviders"
import NewProviders from "@/components/newProviders"
import Analytics from "@/components/analytics"
import SalesPerformance from "@/components/salesPerformance"
import Cancellations from "@/components/cancellations"
import BillingManagement from "@/components/BillingManagement";
import ProviderPerformance from "@/components/providerperformance";
import SalesTeamGuidance from "@/components/salesTeamGuidance";
import DailyTaskList from "@/components/DailyTaskList";


const salesData = [
    {name: 'Jan', objectif: 100, réalisé: 120},
    {name: 'Fév', objectif: 120, réalisé: 100},
    {name: 'Mar', objectif: 130, réalisé: 140},
    {name: 'Avr', objectif: 140, réalisé: 145},
    {name: 'Mai', objectif: 150, réalisé: 160},
    {name: 'Juin', objectif: 160, réalisé: 180},
]

export default function SubscriptionManagement() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="container mx-auto p-4">


            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
                    <TabsTrigger value="subscribed">Abonnés</TabsTrigger>
                    <TabsTrigger value="new">Nouveaux prestataires</TabsTrigger>
                    <TabsTrigger value="cancellations">Résiliations</TabsTrigger>
                    <TabsTrigger value="billing">Facturation</TabsTrigger>
                    <TabsTrigger value="analytics">Analyses</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="provider-performance">provider performance</TabsTrigger>
                    <TabsTrigger value="salesGuidance">Guide commercial</TabsTrigger>
                    <TabsTrigger value="daily-task">Daily task</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard">
                    <Dashboard/>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Chiffre d'affaires récurrent</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">152,345 €</div>
                                <p className="text-xs text-muted-foreground">+20% par rapport au mois dernier</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Nouveaux abonnés</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+245</div>
                                <p className="text-xs text-muted-foreground">+18% par rapport à l'objectif</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taux de rétention</CardTitle>
                                <BarChart2 className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">92%</div>
                                <p className="text-xs text-muted-foreground">+2% par rapport au trimestre précédent</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taux de résiliation</CardTitle>
                                <UserMinus className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">3.5%</div>
                                <p className="text-xs text-muted-foreground">-0.5% par rapport au mois dernier</p>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Performance des ventes</CardTitle>
                            <CardDescription>Comparaison objectifs vs réalisés</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="objectif" fill="#8884d8"/>
                                    <Bar dataKey="réalisé" fill="#82ca9d"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="subscribed">
                    <SubscribedProviders searchQuery={searchQuery}/>
                </TabsContent>
                <TabsContent value="new">
                    <NewProviders searchQuery={searchQuery}/>
                </TabsContent>
                <TabsContent value="cancellations">
                    <Cancellations/>
                </TabsContent>
                <TabsContent value="billing">
                    <BillingManagement/>
                </TabsContent>
                <TabsContent value="analytics">
                    <Analytics/>
                </TabsContent>
                <TabsContent value="performance">
                    <SalesPerformance/>
                </TabsContent>
                <TabsContent value="provider-performance">
                    <ProviderPerformance/>
                </TabsContent>
                <TabsContent value="salesGuidance">
                    <SalesTeamGuidance/>
                </TabsContent>
                <TabsContent value="daily-task">
                    <DailyTaskList/>
                </TabsContent>
            </Tabs>

            {/* <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notifications</DialogTitle>
                        <DialogDescription>
                            Voici vos notifications récentes
                        </DialogDescription>
                    </DialogHeader>
                    <ul className="space-y-2">
                        {notifications.map((notification) => (
                            <li key={notification.id} className="p-2 bg-gray-100 rounded flex items-center">
                                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500"/>
                                {notification.message}
                            </li>
                        ))}
                    </ul>
                </DialogContent>
            </Dialog>*/}


        </div>
    )
}