"use client"

import {useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Slider} from "@/components/ui/slider"
import {Switch} from "@/components/ui/switch"
import {ArrowUpDown, Bell, Zap} from "lucide-react"
import {Progress} from "@/components/ui/progress"

const providers = [
    {
        id: 1,
        name: "Prestataire A",
        category: "Plomberie",
        callsReceived: 15,
        conversionRate: 60,
        renewalRate: 85,
        boosted: false
    },
    {
        id: 2,
        name: "Prestataire B",
        category: "Électricité",
        callsReceived: 3,
        conversionRate: 40,
        renewalRate: 70,
        boosted: false
    },
    {
        id: 3,
        name: "Prestataire C",
        category: "Jardinage",
        callsReceived: 8,
        conversionRate: 55,
        renewalRate: 80,
        boosted: true
    },
    {
        id: 4,
        name: "Prestataire D",
        category: "Ménage",
        callsReceived: 2,
        conversionRate: 30,
        renewalRate: 60,
        boosted: false
    },
    {
        id: 5,
        name: "Prestataire E",
        category: "Peinture",
        callsReceived: 10,
        conversionRate: 50,
        renewalRate: 75,
        boosted: false
    },
]

export default function ProviderPerformance() {
    const [sortColumn, setSortColumn] = useState("")
    const [sortDirection, setSortDirection] = useState("asc")
    const [selectedProvider, setSelectedProvider] = useState(null)
    const [boostDuration, setBoostDuration] = useState(7)
    const [showLowPerformers, setShowLowPerformers] = useState(false)

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedProviders = [...providers].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    const lowPerformers = sortedProviders.filter(
        provider => provider.callsReceived < 5 || provider.conversionRate < 40 || provider.renewalRate < 70
    )

    const displayedProviders = showLowPerformers ? lowPerformers : sortedProviders

    const toggleBoost = (provider) => {
        provider.boosted = !provider.boosted
        setSelectedProvider({...provider})
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Performance des prestataires</CardTitle>
                    <CardDescription>Surveillez et améliorez la performance des prestataires</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="show-low-performers"
                                checked={showLowPerformers}
                                onCheckedChange={setShowLowPerformers}
                            />
                            <Label htmlFor="show-low-performers">Afficher uniquement les prestataires à faible
                                performance</Label>
                        </div>
                        <Button variant="outline" onClick={() => alert("Notifications envoyées aux équipes de vente")}>
                            <Bell className="mr-2 h-4 w-4"/> Alerter les équipes de vente
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Nom du prestataire</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("callsReceived")}>
                                    Appels reçus {sortColumn === "callsReceived" &&
                                    <ArrowUpDown className="ml-2 h-4 w-4 inline"/>}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("conversionRate")}>
                                    Taux de conversion {sortColumn === "conversionRate" &&
                                    <ArrowUpDown className="ml-2 h-4 w-4 inline"/>}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("renewalRate")}>
                                    Taux de renouvellement {sortColumn === "renewalRate" &&
                                    <ArrowUpDown className="ml-2 h-4 w-4 inline"/>}
                                </TableHead>
                                <TableHead>Boosté</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayedProviders.map((provider) => (
                                <TableRow key={provider.id}>
                                    <TableCell className="font-medium">{provider.name}</TableCell>
                                    <TableCell>{provider.category}</TableCell>
                                    <TableCell>{provider.callsReceived}</TableCell>
                                    <TableCell>{provider.conversionRate}%</TableCell>
                                    <TableCell>{provider.renewalRate}%</TableCell>
                                    <TableCell>{provider.boosted ? "Oui" : "Non"}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => toggleBoost(provider)}>
                                            {provider.boosted ? "Désactiver boost" : "Booster"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={selectedProvider !== null} onOpenChange={() => setSelectedProvider(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Booster le profil du prestataire</DialogTitle>
                        <DialogDescription>
                            Configurez le boost pour {selectedProvider?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="boost-duration" className="text-right">
                                Durée du boost
                            </Label>
                            <div className="col-span-3">
                                <Slider
                                    id="boost-duration"
                                    min={1}
                                    max={30}
                                    step={1}
                                    value={[boostDuration]}
                                    onValueChange={(value) => setBoostDuration(value[0])}
                                />
                                <span className="text-sm text-muted-foreground">{boostDuration} jours</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="boost-intensity" className="text-right">
                                Intensité du boost
                            </Label>
                            <Select defaultValue="medium">
                                <SelectTrigger id="boost-intensity" className="col-span-3">
                                    <SelectValue placeholder="Sélectionnez l'intensité"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Faible</SelectItem>
                                    <SelectItem value="medium">Moyenne</SelectItem>
                                    <SelectItem value="high">Élevée</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedProvider(null)}>
                            Annuler
                        </Button>
                        <Button onClick={() => {
                            toggleBoost(selectedProvider)
                            setSelectedProvider(null)
                        }}>
                            Appliquer le boost
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <CardTitle>Aperçu des performances</CardTitle>
                    <CardDescription>Résumé des indicateurs clés de performance des prestataires</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taux de conversion moyen</CardTitle>
                                <Zap className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">52%</div>
                                <Progress value={52} className="mt-2"/>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taux de renouvellement moyen</CardTitle>
                                <Zap className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">78%</div>
                                <Progress value={78} className="mt-2"/>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Prestataires boostés</CardTitle>
                                <Zap className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">3</div>
                                <p className="text-xs text-muted-foreground">Sur 20 prestataires actifs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Prestataires à faible performance</CardTitle>
                                <Bell className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5</div>
                                <p className="text-xs text-muted-foreground">Nécessitant une attention particulière</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}