"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, PhoneCall, CreditCard, BarChart } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Jan', abonnés: 400, nouveaux: 240, expirés: 20 },
    { name: 'Fév', abonnés: 300, nouveaux: 139, expirés: 25 },
    { name: 'Mar', abonnés: 200, nouveaux: 980, expirés: 30 },
    { name: 'Avr', abonnés: 278, nouveaux: 390, expirés: 18 },
    { name: 'Mai', abonnés: 189, nouveaux: 480, expirés: 22 },
    { name: 'Juin', abonnés: 239, nouveaux: 380, expirés: 28 },
]

export default function Dashboard() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Prestataires</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">2,345</div>
                    <p className="text-xs text-muted-foreground">+180 depuis le mois dernier</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Nouveaux Prestataires</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">120</div>
                    <p className="text-xs text-muted-foreground">+43 depuis la semaine dernière</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Appels Reçus</CardTitle>
                    <PhoneCall className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">+19% depuis hier</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">32%</div>
                    <p className="text-xs text-muted-foreground">+7% depuis le mois dernier</p>
                </CardContent>
            </Card>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Aperçu des Abonnements</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="abonnés" stroke="#8884d8" />
                            <Line type="monotone" dataKey="nouveaux" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="expirés" stroke="#ffc658" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}