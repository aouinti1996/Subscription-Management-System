"use client"

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

const mockNewProviders = [
    { id: 1, name: "Nouveau Prestataire A", registrationDate: "2023-06-01", callsReceived: 1 },
    { id: 2, name: "Nouveau Prestataire B", registrationDate: "2023-06-15", callsReceived: 2 },
    { id: 3, name: "Nouveau Prestataire C", registrationDate: "2023-07-01", callsReceived: 0 },
]

export default function NewProviders({ searchQuery }) {
    const [providers, setProviders] = useState(mockNewProviders)
    const [selectedProvider, setSelectedProvider] = useState(null)
    const [conversionScript, setConversionScript] = useState("")

    useEffect(() => {
        // Filtrer les prestataires en fonction de la recherche
        const filteredProviders = mockNewProviders.filter(provider =>
            provider.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setProviders(filteredProviders)
    }, [searchQuery])

    const handleConversion = (providerId: any) => {
        // Logique pour convertir le prestataire en abonné payant
        console.log(`Conversion du prestataire ${providerId}`)
    }

    useEffect(() => {
        if (selectedProvider) {
            // Générer un script de conversion personnalisé
            setConversionScript(`Bonjour ${selectedProvider.name},\n\nNous avons remarqué que vous avez reçu ${selectedProvider.callsReceived} appel(s) via notre plateforme. C'est le moment idéal pour passer à un abonnement payant et profiter de tous nos avantages premium. Voici ce que nous pouvons vous offrir...`)
        }
    }, [selectedProvider])

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Nouveaux Prestataires</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Appels reçus</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {providers.map((provider) => (
                        <TableRow key={provider.id}>

                            <TableCell>{provider.name}</TableCell>
                            <TableCell>{provider.registrationDate}</TableCell>
                            <TableCell>{provider.callsReceived}</TableCell>
                            <TableCell>
                                {provider.callsReceived >= 2 ? (
                                    <Badge variant="destructive">À convertir</Badge>
                                ) : (
                                    <Badge variant="secondary">En essai</Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" onClick={() => setSelectedProvider(provider)}>Convertir</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Convertir {selectedProvider?.name}</DialogTitle>
                                            <DialogDescription>Script de conversion suggéré</DialogDescription>
                                        </DialogHeader>
                                        <Textarea
                                            value={conversionScript}
                                            onChange={(e) => setConversionScript(e.target.value)}
                                            rows={10}
                                        />
                                        <DialogFooter>
                                            <Button onClick={() => handleConversion(selectedProvider?.id)}>Marquer comme converti</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}