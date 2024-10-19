"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const salesData = [
    { name: 'Jan', objectif: 100, réalisé: 120 },
    { name: 'Fév', objectif: 120, réalisé: 100 },
    { name: 'Mar', objectif: 130, réalisé: 140 },
    { name: 'Avr', objectif: 140, réalisé: 145 },
    { name: 'Mai', objectif: 150, réalisé: 160 },
    { name: 'Juin', objectif: 160, réalisé: 180 },
]

const salesByType = [
    { name: 'Nouveaux abonnements', value: 400 },
    { name: 'Renouvellements', value: 300 },
    { name: 'Upgrades', value: 200 },
]

const topPerformers = [
    { name: 'Alice Dubois', conversions: 45, revenue: 67500 },
    { name: 'Thomas Martin', conversions: 42, revenue: 63000 },
    { name: 'Sophie Lefebvre', conversions: 38, revenue: 57000 },
    { name: 'Lucas Moreau', conversions: 36, revenue: 54000 },
    { name: 'Emma Petit', conversions: 33, revenue: 49500 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function SalesPerformance() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Performance des Ventes</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Objectifs vs Réalisations</CardTitle>
                    <CardDescription>Comparaison mensuelle des objectifs et des ventes réalisées</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="objectif" fill="#8884d8" />
                            <Bar dataKey="réalisé" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Répartition des Ventes</CardTitle>
                        <CardDescription>Par type d'abonnement</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={salesByType}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {salesByType.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Performers</CardTitle>
                        <CardDescription>Les 5 meilleurs vendeurs du mois</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Conversions</TableHead>
                                    <TableHead>Revenus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topPerformers.map((performer, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{performer.name}</TableCell>
                                        <TableCell>{performer.conversions}</TableCell>
                                        <TableCell>{performer.revenue} €</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Progression vers l'Objectif Trimestriel</CardTitle>
                    <CardDescription>Objectif : 1 000 000 €</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={75} className="w-full" />
                    <p className="text-center mt-2">750 000 € / 1 000 000 € (75%)</p>
                </CardContent>
            </Card>
        </div>
    )
}