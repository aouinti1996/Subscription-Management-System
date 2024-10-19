"use client"

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const mockSubscribedProviders = [
    { id: 1, name: "Prestataire A", startDate: "2023-01-01", expirationDate: "2023-12-31", callsReceived: 150 },
    { id: 2, name: "Prestataire B", startDate: "2023-03-15", expirationDate: "2023-09-15", callsReceived: 75 },
    { id: 3, name: "Prestataire C", startDate: "2023-06-01", expirationDate: "2024-05-31", callsReceived: 200 },
]

export default function SubscribedProviders({ searchQuery }) {
    const [providers, setProviders] = useState(mockSubscribedProviders)
    const [selectedProvider, setSelectedProvider] = useState(null)

    useEffect(() => {
        // Filtrer les prestataires en fonction de la recherche
        const filteredProviders = mockSubscribedProviders.filter(provider =>
            provider.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setProviders(filteredProviders)
    }, [searchQuery])

    const handleRenewal = (providerId) => {
        // Logique pour renouveler l'abonnement
        console.log(`Renouvellement pour le prestataire ${providerId}`)
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Prestataires Abonnés</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Date de début</TableHead>
                        <TableHead>Date d'expiration</TableHead>
                        <TableHead>Appels reçus</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {providers.map((provider) => (
                        <TableRow key={provider.id}>
                            <TableCell>{provider.name}</TableCell>
                            <TableCell>{provider.startDate}</TableCell>
                            <TableCell>{provider.expirationDate}</TableCell>
                            <TableCell>{provider.callsReceived}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" onClick={() => setSelectedProvider(provider)}>Détails</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{selectedProvider?.name}</DialogTitle>
                                            <DialogDescription>Détails de l'abonnement et actions</DialogDescription>
                                        </DialogHeader>
                                        {selectedProvider && (
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="startDate">Date de début</Label>
                                                    <Input id="startDate" value={selectedProvider.startDate} className="col-span-3" readOnly />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="expirationDate">Date d'expiration</Label>
                                                    <Input id="expirationDate" value={selectedProvider.expirationDate} className="col-span-3" readOnly />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="callsReceived">Appels reçus</Label>
                                                    <Input id="callsReceived" value={selectedProvider.callsReceived} className="col-span-3" readOnly />
                                                </div>
                                            </div>
                                        )}
                                        <DialogFooter>
                                            <Button onClick={() => handleRenewal(selectedProvider?.id)}>Renouveler l'abonnement</Button>
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