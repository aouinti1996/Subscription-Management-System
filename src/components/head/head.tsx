"use client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Bell, Search, TrendingUp} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("")
    const [conversionOpportunities, setConversionOpportunities] = useState([])
    const [isOpportunitiesOpen, setIsOpportunitiesOpen] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState("thisMonth")

    useEffect(() => {
        // Simuler le chargement des notifications et des opportunités
        setConversionOpportunities([
            {id: 1, name: "Entreprise A", type: "Nouveau prestataire", value: 1200},
            {id: 2, name: "Entreprise B", type: "Renouvellement", value: 2400},
            {id: 3, name: "Entreprise C", type: "Upgrade", value: 800},
            {id: 4, name: "Entreprise D", type: "Cross-sell", value: 1500},
        ])
    }, [])
    return (
        <header className="flex justify-between items-center mb-6 container mx-auto p-6">
            <Link
            href={"/"}>
                <h1 className="text-2xl font-bold">Gestion des Abonnements Ijeni</h1>
            </Link>

            <div className="flex items-center space-x-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sélectionner la période"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="thisWeek">Cette semaine</SelectItem>
                        <SelectItem value="thisMonth">Ce mois</SelectItem>
                        <SelectItem value="thisQuarter">Ce trimestre</SelectItem>
                        <SelectItem value="thisYear">Cette année</SelectItem>
                    </SelectContent>
                </Select>
                <div className="relative">
                    <Input
                        type="search"
                        placeholder="Rechercher un prestataire..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                </div>
                <div className="relative">
                    <Link href="/notifications">
                        <Button variant="outline">
                            <Bell className="mr-2 h-4 w-4"/>
                            Notifications
                        </Button>
                    </Link>
                </div>
                <div className="relative">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsOpportunitiesOpen(true)}
                    >
                        <TrendingUp className="h-4 w-4"/>
                    </Button>
                    {conversionOpportunities.length > 0 && (
                        <span
                            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {conversionOpportunities.length}
                            </span>
                    )}
                </div>
            </div>
            <Dialog open={isOpportunitiesOpen} onOpenChange={setIsOpportunitiesOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Opportunités de conversion</DialogTitle>
                        <DialogDescription>
                            Voici les opportunités de conversion à saisir
                        </DialogDescription>
                    </DialogHeader>
                    <ul className="space-y-2">
                        {conversionOpportunities.map((opportunity) => (
                            <li key={opportunity.id}
                                className="p-2 bg-gray-100 rounded flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{opportunity.name}</p>
                                    <p className="text-sm text-gray-600">{opportunity.type}</p>
                                </div>
                                <div className="text-green-600 font-bold">{opportunity.value} €</div>
                            </li>
                        ))}
                    </ul>
                </DialogContent>
            </Dialog>
        </header>

    )
}