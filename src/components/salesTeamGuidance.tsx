"use client"

import {useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Slider} from "@/components/ui/slider"
import {PhoneCall, RefreshCw, TrendingUp, Zap} from "lucide-react"
import {Progress} from "@/components/ui/progress"
import {Textarea} from "@/components/ui/textarea";

const providers = [
    {
        id: 1,
        name: "Prestataire A",
        plan: "Gratuit",
        callsReceived: 3,
        daysUntilExpiration: 15,
        conversionProbability: 75
    },
    {
        id: 2,
        name: "Prestataire B",
        plan: "Standard",
        callsReceived: 1,
        daysUntilExpiration: 5,
        conversionProbability: 40
    },
    {
        id: 3,
        name: "Prestataire C",
        plan: "Premium",
        callsReceived: 8,
        daysUntilExpiration: 30,
        conversionProbability: 90
    },
    {
        id: 4,
        name: "Prestataire D",
        plan: "Gratuit",
        callsReceived: 2,
        daysUntilExpiration: 20,
        conversionProbability: 60
    },
    {
        id: 5,
        name: "Prestataire E",
        plan: "Standard",
        callsReceived: 4,
        daysUntilExpiration: 2,
        conversionProbability: 80
    },
]

export default function SalesTeamGuidance() {
    const [activeTab, setActiveTab] = useState("convert")
    const [selectedProvider, setSelectedProvider] = useState(null)
    const [boostDuration, setBoostDuration] = useState(7)

    const providersToConvert = providers.filter(p => p.plan === "Gratuit" && p.callsReceived > 2)
    const providersToRenew = providers.filter(p => p.plan !== "Gratuit" && p.daysUntilExpiration <= 15)
    const providersToBoost = providers.filter(p => p.callsReceived < 3 && p.plan !== "Gratuit")

    const renderProviderTable = (providerList, actionText) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Nom du prestataire</TableHead>
                    <TableHead>Plan actuel</TableHead>
                    <TableHead>Appels reçus</TableHead>
                    <TableHead>Jours avant expiration</TableHead>
                    <TableHead>Probabilité de conversion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {providerList.map((provider) => (
                    <TableRow key={provider.id}>
                        <TableCell className="font-medium">{provider.name}</TableCell>
                        <TableCell>{provider.plan}</TableCell>
                        <TableCell>{provider.callsReceived}</TableCell>
                        <TableCell>{provider.daysUntilExpiration}</TableCell>
                        <TableCell>{provider.conversionProbability}%</TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => setSelectedProvider(provider)}>
                                {actionText}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Guide de l'équipe commerciale</CardTitle>
                    <CardDescription>Optimisez vos conversions, renouvellements et performances des
                        prestataires</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="convert">À convertir</TabsTrigger>
                            <TabsTrigger value="renew">À renouveler</TabsTrigger>
                            <TabsTrigger value="boost">À booster</TabsTrigger>
                            <TabsTrigger value="tips">Conseils de vente</TabsTrigger>
                        </TabsList>
                        <TabsContent value="convert">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Prestataires à convertir</CardTitle>
                                    <CardDescription>Prestataires en forfait gratuit ayant reçu plus de 2
                                        appels</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {renderProviderTable(providersToConvert, "Convertir")}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="renew">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Prestataires à renouveler</CardTitle>
                                    <CardDescription>Prestataires dont l'abonnement expire dans moins de 15
                                        jours</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {renderProviderTable(providersToRenew, "Renouveler")}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="boost">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Prestataires à booster</CardTitle>
                                    <CardDescription>Prestataires ayant reçu moins de 3 appels pendant leur
                                        abonnement</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {renderProviderTable(providersToBoost, "Booster")}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="tips">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Conseils de vente</CardTitle>
                                    <CardDescription>Astuces pour augmenter vos conversions et ventes</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Mettez en avant les témoignages de prestataires satisfaits pour convaincre
                                            les nouveaux.
                                        </li>
                                        <li>Proposez des offres limitées dans le temps pour créer un sentiment
                                            d'urgence.
                                        </li>
                                        <li>Utilisez des comparaisons de plans pour montrer la valeur ajoutée des
                                            forfaits supérieurs.
                                        </li>
                                        <li>Offrez un essai gratuit du plan supérieur pendant une courte période.</li>
                                        <li>Soulignez les fonctionnalités uniques qui différencient votre service de la
                                            concurrence.
                                        </li>
                                        <li>Personnalisez votre approche en fonction du secteur d'activité du
                                            prestataire.
                                        </li>
                                        <li>Proposez des forfaits sur mesure pour les prestataires ayant des besoins
                                            spécifiques.
                                        </li>
                                        <li>Utilisez des études de cas pour montrer le ROI potentiel de l'abonnement.
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Dialog open={selectedProvider !== null} onOpenChange={() => setSelectedProvider(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Action pour {selectedProvider?.name}</DialogTitle>
                        <DialogDescription>
                            {selectedProvider?.plan === "Gratuit" ? "Convertir en abonnement payant" :
                                selectedProvider?.callsReceived < 3 ? "Booster le profil" : "Renouveler l'abonnement"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {selectedProvider?.plan === "Gratuit" && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="plan" className="text-right">
                                    Nouveau plan
                                </Label>
                                <Select defaultValue="standard">
                                    <SelectTrigger id="plan" className="col-span-3">
                                        <SelectValue placeholder="Sélectionnez un plan"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard">Standard</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                        <SelectItem value="enterprise">Entreprise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        {selectedProvider?.callsReceived < 3 && (
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
                        )}
                        {selectedProvider?.plan !== "Gratuit" && selectedProvider?.callsReceived >= 3 && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="renewal-duration" className="text-right">
                                    Durée du renouvellement
                                </Label>
                                <Select defaultValue="12">
                                    <SelectTrigger id="renewal-duration" className="col-span-3">
                                        <SelectValue placeholder="Sélectionnez une durée"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="3">3 mois</SelectItem>
                                        <SelectItem value="6">6 mois</SelectItem>
                                        <SelectItem value="12">1 an</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                                Notes
                            </Label>
                            <Textarea id="notes" className="col-span-3"
                                      placeholder="Ajoutez des notes sur l'interaction..."/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedProvider(null)}>
                            Annuler
                        </Button>
                        <Button onClick={() => {
                            // Logique pour traiter l'action (conversion, renouvellement ou boost)
                            setSelectedProvider(null)
                        }}>
                            Confirmer l'action
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <CardTitle>Aperçu des performances de l'équipe</CardTitle>
                    <CardDescription>Résumé des indicateurs clés de performance de l'équipe
                        commerciale</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">68%</div>
                                <Progress value={68} className="mt-2"/>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taux de renouvellement</CardTitle>
                                <RefreshCw className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">85%</div>
                                <Progress value={85} className="mt-2"/>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Appels moyens par prestataire</CardTitle>
                                <PhoneCall className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5.2</div>
                                <p className="text-xs text-muted-foreground">+0.8 par rapport au mois dernier</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Prestataires boostés</CardTitle>
                                <Zap className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-xs text-muted-foreground">3 de plus que le mois dernier</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}