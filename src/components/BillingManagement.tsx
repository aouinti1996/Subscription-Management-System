"use client"

import {useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ArrowUpDown, CreditCard, DollarSign, FileText, RefreshCcw} from "lucide-react"

const invoices = [
    {id: "INV-001", customer: "Entreprise A", amount: 1500, date: "2023-10-15", status: "Payée"},
    {id: "INV-002", customer: "Entreprise B", amount: 2000, date: "2023-10-14", status: "En attente"},
    {id: "INV-003", customer: "Entreprise C", amount: 1000, date: "2023-10-13", status: "En retard"},
    {id: "INV-004", customer: "Entreprise D", amount: 3000, date: "2023-10-12", status: "Payée"},
    {id: "INV-005", customer: "Entreprise E", amount: 1800, date: "2023-10-11", status: "En attente"},
]

export default function BillingManagement() {
    const [sortColumn, setSortColumn] = useState("")
    const [sortDirection, setSortDirection] = useState("asc")
    const [selectedInvoice, setSelectedInvoice] = useState(null)

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedInvoices = [...invoices].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    return (
        <div className="space-y-4">
            <Tabs defaultValue="invoices">
                <TabsList>
                    <TabsTrigger value="invoices">Factures</TabsTrigger>
                    <TabsTrigger value="payments">Paiements</TabsTrigger>
                    <TabsTrigger value="settings">Paramètres de facturation</TabsTrigger>
                </TabsList>
                <TabsContent value="invoices">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion des factures</CardTitle>
                            <CardDescription>Visualisez et gérez toutes les factures</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Numéro</TableHead>
                                        <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                                            Client {sortColumn === "customer" &&
                                            <ArrowUpDown className="ml-2 h-4 w-4 inline"/>}
                                        </TableHead>
                                        <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                                            Montant {sortColumn === "amount" &&
                                            <ArrowUpDown className="ml-2 h-4 w-4 inline"/>}
                                        </TableHead>
                                        <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                                            Date {sortColumn === "date" &&
                                            <ArrowUpDown className="ml-2 h-4 w-4 inline"/>}
                                        </TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedInvoices.map((invoice) => (
                                        <TableRow key={invoice.id}>
                                            <TableCell className="font-medium">{invoice.id}</TableCell>
                                            <TableCell>{invoice.customer}</TableCell>
                                            <TableCell>{invoice.amount} €</TableCell>
                                            <TableCell>{invoice.date}</TableCell>
                                            <TableCell>{invoice.status}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm"
                                                        onClick={() => setSelectedInvoice(invoice)}>
                                                    Détails
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historique des paiements</CardTitle>
                            <CardDescription>Consultez l'historique des transactions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Ajoutez ici un tableau similaire pour l'historique des paiements */}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paramètres de facturation</CardTitle>
                            <CardDescription>Configurez vos préférences de facturation</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="billing-cycle">Cycle de facturation</Label>
                                        <Select defaultValue="monthly">
                                            <SelectTrigger id="billing-cycle">
                                                <SelectValue placeholder="Sélectionnez un cycle"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="monthly">Mensuel</SelectItem>
                                                <SelectItem value="quarterly">Trimestriel</SelectItem>
                                                <SelectItem value="annually">Annuel</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="payment-method">Méthode de paiement par défaut</Label>
                                        <Select defaultValue="card">
                                            <SelectTrigger id="payment-method">
                                                <SelectValue placeholder="Sélectionnez une méthode"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="card">Carte bancaire</SelectItem>
                                                <SelectItem value="transfer">Virement bancaire</SelectItem>
                                                <SelectItem value="paypal">PayPal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="invoice-email">Email de facturation</Label>
                                    <Input id="invoice-email" type="email" placeholder="facturation@entreprise.com"/>
                                </div>
                                <Button type="submit">Enregistrer les paramètres</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={selectedInvoice !== null} onOpenChange={() => setSelectedInvoice(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Détails de la facture</DialogTitle>
                        <DialogDescription>
                            Informations détaillées pour la facture {selectedInvoice?.id}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Client</Label>
                            <div className="col-span-3">{selectedInvoice?.customer}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Montant</Label>
                            <div className="col-span-3">{selectedInvoice?.amount} €</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Date</Label>
                            <div className="col-span-3">{selectedInvoice?.date}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Statut</Label>
                            <div className="col-span-3">{selectedInvoice?.status}</div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
                            Fermer
                        </Button>
                        <Button>Télécharger PDF</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <CardTitle>Aperçu de la facturation</CardTitle>
                    <CardDescription>Résumé des indicateurs clés de facturation</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Chiffre d'affaires du mois</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">45,231 €</div>
                                <p className="text-xs text-muted-foreground">+20.1% par rapport au mois dernier</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Factures impayées</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-xs text-muted-foreground">3,500 € en attente</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taux de recouvrement</CardTitle>
                                <RefreshCcw className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">98.5%</div>
                                <p className="text-xs text-muted-foreground">+2.7% par rapport au trimestre
                                    précédent</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Prochaine facturation</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">01/11/2023</div>
                                <p className="text-xs text-muted-foreground">Dans 7 jours</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}