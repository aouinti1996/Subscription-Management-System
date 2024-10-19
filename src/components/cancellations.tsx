"use client"

import {useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {AlertTriangle, ArrowUpDown, CheckCircle2, XCircle} from "lucide-react"

const cancellationRequests = [
    {id: 1, customer: "Entreprise A", plan: "Premium", requestDate: "2023-10-15", status: "En attente"},
    {id: 2, customer: "Entreprise B", plan: "Standard", requestDate: "2023-10-14", status: "En cours de traitement"},
    {id: 3, customer: "Entreprise C", plan: "Basic", requestDate: "2023-10-13", status: "Résolu"},
    {id: 4, customer: "Entreprise D", plan: "Premium", requestDate: "2023-10-12", status: "En attente"},
    {id: 5, customer: "Entreprise E", plan: "Standard", requestDate: "2023-10-11", status: "Résolu"},
]

export default function Cancellations() {
    const [sortColumn, setSortColumn] = useState("")
    const [sortDirection, setSortDirection] = useState("asc")
    const [selectedRequest, setSelectedRequest] = useState(null)

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedRequests = [...cancellationRequests].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des résiliations</CardTitle>
                    <CardDescription>Gérez les demandes de résiliation et mettez en place des stratégies de
                        rétention</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                                    Client {sortColumn === "customer" && <ArrowUpDown className="ml-2 h-4 w-4 inline"/>}
                                </TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("requestDate")}>
                                    Date de demande {sortColumn === "requestDate" &&
                                    <ArrowUpDown className="ml-2 h-4 w-4 inline"/>}
                                </TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell className="font-medium">{request.id}</TableCell>
                                    <TableCell>{request.customer}</TableCell>
                                    <TableCell>{request.plan}</TableCell>
                                    <TableCell>{request.requestDate}</TableCell>
                                    <TableCell>{request.status}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                            Gérer
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={selectedRequest !== null} onOpenChange={() => setSelectedRequest(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Gérer la demande de résiliation</DialogTitle>
                        <DialogDescription>
                            Détails de la demande de résiliation pour {selectedRequest?.customer}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reason" className="text-right">
                                Raison
                            </Label>
                            <Select defaultValue="price">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Sélectionnez une raison"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price">Prix trop élevé</SelectItem>
                                    <SelectItem value="features">Fonctionnalités manquantes</SelectItem>
                                    <SelectItem value="competitor">Passage à un concurrent</SelectItem>
                                    <SelectItem value="usage">Utilisation insuffisante</SelectItem>
                                    <SelectItem value="other">Autre</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="feedback" className="text-right">
                                Commentaire
                            </Label>
                            <Textarea id="feedback" className="col-span-3" placeholder="Commentaire du client"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="retention-offer" className="text-right">
                                Offre de rétention
                            </Label>
                            <Select defaultValue="discount">
                                <SelectTrigger id="retention-offer" className="col-span-3">
                                    <SelectValue placeholder="Sélectionnez une offre"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="discount">Remise de 20% pour 3 mois</SelectItem>
                                    <SelectItem value="upgrade">Upgrade gratuit pour 1 mois</SelectItem>
                                    <SelectItem value="support">Support dédié pendant 1 mois</SelectItem>
                                    <SelectItem value="pause">Pause de l'abonnement pour 1 mois</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                            Annuler
                        </Button>
                        <Button onClick={() => setSelectedRequest(null)}>Appliquer et sauvegarder</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <CardTitle>Analyse des résiliations</CardTitle>
                    <CardDescription>Aperçu des tendances de résiliation</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taux de résiliation</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4.2%</div>
                                <p className="text-xs text-muted-foreground">+0.1% par rapport au mois dernier</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Résiliations évitées</CardTitle>
                                <CheckCircle2 className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">24</div>
                                <p className="text-xs text-muted-foreground">Ce mois-ci</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Raison principale</CardTitle>
                                <XCircle className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Prix</div>
                                <p className="text-xs text-muted-foreground">38% des résiliations</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Valeur sauvée</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">9,450 €</div>
                                <p className="text-xs text-muted-foreground">MRR sauvé ce mois-ci</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}