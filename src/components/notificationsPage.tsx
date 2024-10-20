"use client"

import {useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Progress} from "@/components/ui/progress"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar"
import {
    AlertTriangle,
    Bell,
    Calendar as CalendarIcon,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    History,
    MessageSquare,
    PhoneCall,
    Zap
} from "lucide-react"

const initialNotifications = [
    {
        id: 1,
        type: 'expiration',
        message: "5 abonnements expirent dans 7 jours",
        priority: 'high',
        status: 'unread',
        score: 95,
        providers: [
            {
                id: 101,
                name: "Prestataire A",
                plan: "Premium",
                expirationDate: "2023-10-25",
                phone: "+33 1 23 45 67 89",
                lastContact: "2023-10-10",
                churnRisk: "Faible"
            },
            {
                id: 102,
                name: "Prestataire B",
                plan: "Standard",
                expirationDate: "2023-10-26",
                phone: "+33 1 23 45 67 90",
                lastContact: "2023-10-05",
                churnRisk: "Moyen"
            },
            {
                id: 103,
                name: "Prestataire C",
                plan: "Premium",
                expirationDate: "2023-10-27",
                phone: "+33 1 23 45 67 91",
                lastContact: "2023-09-30",
                churnRisk: "Élevé"
            },
            {
                id: 104,
                name: "Prestataire D",
                plan: "Basic",
                expirationDate: "2023-10-28",
                phone: "+33 1 23 45 67 92",
                lastContact: "2023-10-15",
                churnRisk: "Faible"
            },
            {
                id: 105,
                name: "Prestataire E",
                plan: "Standard",
                expirationDate: "2023-10-29",
                phone: "+33 1 23 45 67 93",
                lastContact: "2023-10-01",
                churnRisk: "Moyen"
            },
        ]
    },
    {
        id: 2,
        type: 'conversion',
        message: "3 nouveaux prestataires à convertir",
        priority: 'medium',
        status: 'unread',
        score: 80,
        providers: [
            {
                id: 201,
                name: "Nouveau Prestataire X",
                plan: "Essai",
                conversionProbability: "75%",
                phone: "+33 1 23 45 67 94",
                lastContact: "2023-10-12",
                churnRisk: "Faible"
            },
            {
                id: 202,
                name: "Nouveau Prestataire Y",
                plan: "Essai",
                conversionProbability: "60%",
                phone: "+33 1 23 45 67 95",
                lastContact: "2023-10-08",
                churnRisk: "Moyen"
            },
            {
                id: 203,
                name: "Nouveau Prestataire Z",
                plan: "Essai",
                conversionProbability: "80%",
                phone: "+33 1 23 45 67 96",
                lastContact: "2023-10-14",
                churnRisk: "Faible"
            },
        ]
    },
    {
        id: 3,
        type: 'performance',
        message: "Objectif mensuel atteint à 80%",
        priority: 'low',
        status: 'read',
        score: 70,
        details: {
            currentValue: 80000,
            targetValue: 100000,
            remainingDays: 7
        }
    },
    {
        id: 4,
        type: 'cancellation',
        message: "2 demandes de résiliation en attente",
        priority: 'high',
        status: 'unread',
        score: 90,
        providers: [
            {
                id: 401,
                name: "Prestataire M",
                plan: "Premium",
                reason: "Coût trop élevé",
                phone: "+33 1 23 45 67 97",
                lastContact: "2023-10-03",
                churnRisk: "Élevé"
            },
            {
                id: 402,
                name: "Prestataire N",
                plan: "Standard",
                reason: "Manque de fonctionnalités",
                phone: "+33 1 23 45 67 98",
                lastContact: "2023-10-07",
                churnRisk: "Moyen"
            },
        ]
    },
    {
        id: 5,
        type: 'billing',
        message: "Alerte de facturation : 3 paiements en retard",
        priority: 'high',
        status: 'unread',
        score: 85,
        providers: [
            {
                id: 501,
                name: "Prestataire P",
                plan: "Premium",
                amountDue: 500,
                daysLate: 15,
                phone: "+33 1 23 45 67 99",
                lastContact: "2023-09-25",
                churnRisk: "Élevé"
            },
            {
                id: 502,
                name: "Prestataire Q",
                plan: "Standard",
                amountDue: 300,
                daysLate: 10,
                phone: "+33 1 23 45 68 00",
                lastContact: "2023-09-30",
                churnRisk: "Moyen"
            },
            {
                id: 503,
                name: "Prestataire R",
                plan: "Basic",
                amountDue: 100,
                daysLate: 5,
                phone: "+33 1 23 45 68 01",
                lastContact: "2023-10-05",
                churnRisk: "Faible"
            },
        ]
    },
]

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(initialNotifications)
    const [activeTab, setActiveTab] = useState('all')
    const [selectedNotification, setSelectedNotification] = useState(null)
    const [expandedNotifications, setExpandedNotifications] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)

    const filterNotifications = (tab) => {
        switch (tab) {
            case 'unread':
                return notifications.filter(n => n.status === 'unread')
            case 'high':
                return notifications.filter(n => n.priority === 'high')
            default:
                return notifications.sort((a, b) => b.score - a.score)
        }
    }

    const handleAction = (notification, providerId = null) => {
        setSelectedNotification({...notification, selectedProviderId: providerId})
    }

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? {...n, status: 'read'} : n))
    }

    const toggleExpand = (id) => {
        setExpandedNotifications(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const getActionComponent = (notification) => {
        switch (notification.type) {
            case 'expiration':
                return (
                    <div className="space-y-4">
                        <p>Choisissez une action pour les abonnements expirants :</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une action"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="contact">Contacter les clients</SelectItem>
                                <SelectItem value="offer">Proposer une offre de renouvellement</SelectItem>
                                <SelectItem value="extend">Prolonger gratuitement pour 7 jours</SelectItem>
                            </SelectContent>
                        </Select>
                        <div>
                            <Label htmlFor="custom-offer">Offre personnalisée</Label>
                            <Textarea id="custom-offer" placeholder="Entrez une offre personnalisée..."/>
                        </div>
                    </div>
                )
            case 'conversion':
                return (
                    <div className="space-y-4">
                        <p>Planifier des actions pour la conversion :</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une action"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="call">Planifier un appel</SelectItem>
                                <SelectItem value="email">Envoyer un email personnalisé</SelectItem>
                                <SelectItem value="demo">Proposer une démo personnalisée</SelectItem>
                            </SelectContent>
                        </Select>
                        <div>
                            <Label htmlFor="conversion-notes">Notes pour la conversion</Label>
                            <Textarea id="conversion-notes"
                                      placeholder="Entrez vos notes pour la stratégie de conversion..."/>
                        </div>
                    </div>
                )
            case 'cancellation':
                return (
                    <div className="space-y-4">
                        <p>Gérer les demandes de résiliation :</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une action"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="contact">Contacter le client</SelectItem>
                                <SelectItem value="offer">Proposer une offre de rétention</SelectItem>
                                <SelectItem value="feedback">Demander un feedback</SelectItem>
                            </SelectContent>
                        </Select>
                        <div>
                            <Label htmlFor="retention-strategy">Stratégie de rétention</Label>
                            <Textarea id="retention-strategy" placeholder="Décrivez votre stratégie de rétention..."/>
                        </div>
                    </div>
                )
            case 'billing':
                return (
                    <div className="space-y-4">
                        <p>Gérer les paiements en retard :</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une action"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="remind">Envoyer un rappel</SelectItem>
                                <SelectItem value="call">Appeler le client</SelectItem>
                                <SelectItem value="plan">Proposer un plan de paiement</SelectItem>
                            </SelectContent>
                        </Select>
                        <div>
                            <Label htmlFor="payment-plan">Plan de paiement proposé</Label>
                            <Textarea id="payment-plan" placeholder="Décrivez le plan de paiement proposé..."/>
                        </div>
                    </div>
                )
            default:
                return (
                    <div className="space-y-4">
                        <p>Ajouter une note :</p>
                        <Textarea placeholder="Entrez votre note ici..."/>
                    </div>
                )
        }
    }

    return (
        <div className="container mx-auto p-4 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Centre de notifications</CardTitle>
                    <CardDescription>Gérez vos alertes et prenez des actions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="all">Toutes</TabsTrigger>
                            <TabsTrigger value="unread">Non lues</TabsTrigger>
                            <TabsTrigger value="high">Priorité haute</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <NotificationList
                                notifications={filterNotifications('all')}
                                onAction={handleAction}
                                onMarkAsRead={markAsRead}
                                expandedNotifications={expandedNotifications}
                                toggleExpand={toggleExpand}
                            />
                        </TabsContent>
                        <TabsContent value="unread">
                            <NotificationList
                                notifications={filterNotifications('unread')}
                                onAction={handleAction}
                                onMarkAsRead={markAsRead}
                                expandedNotifications={expandedNotifications}
                                toggleExpand={toggleExpand}
                            />
                        </TabsContent>
                        <TabsContent value="high">
                            <NotificationList
                                notifications={filterNotifications('high')}
                                onAction={handleAction}
                                onMarkAsRead={markAsRead}
                                expandedNotifications={expandedNotifications}
                                toggleExpand={toggleExpand}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Dialog open={selectedNotification !== null} onOpenChange={() => setSelectedNotification(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Action requise</DialogTitle>
                        <DialogDescription>
                            {selectedNotification?.message}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedNotification && getActionComponent(selectedNotification)}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedNotification(null)}>
                            Annuler
                        </Button>
                        <Button onClick={() => {
                            markAsRead(selectedNotification.id)
                            setSelectedNotification(null)
                        }}>
                            Confirmer l'action
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function NotificationList({notifications, onAction, onMarkAsRead, expandedNotifications, toggleExpand}) {
    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <Collapsible
                    key={notification.id}
                    open={expandedNotifications.includes(notification.id)}
                    onOpenChange={() => toggleExpand(notification.id)}
                >
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <NotificationIcon type={notification.type}/>
                                    <div>
                                        <p className={`font-medium ${notification.status === 'unread' ? 'text-primary' : 'text-muted-foreground'}`}>
                                            {notification.message}
                                        </p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Badge
                                                variant={notification.priority === 'high' ? 'destructive' : notification.priority === 'medium' ? 'default' : 'secondary'}>
                                                {notification.priority}
                                            </Badge>
                                            {notification.status === 'unread' && (
                                                <Badge variant="outline">Non lu</Badge>
                                            )}
                                            <Badge variant="secondary">Score: {notification.score}</Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => onMarkAsRead(notification.id)}>
                                        Marquer comme lu
                                    </Button>
                                    <Button size="sm" onClick={() => onAction(notification)}>
                                        Action
                                    </Button>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            {expandedNotifications.includes(notification.id) ? (
                                                <ChevronUp className="h-4 w-4"/>
                                            ) : (
                                                <ChevronDown className="h-4 w-4"/>
                                            )}
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                            </div>
                            <CollapsibleContent className="mt-4">
                                <NotificationDetails notification={notification} onAction={onAction}/>
                            </CollapsibleContent>
                        </CardContent>
                    </Card>
                </Collapsible>
            ))}
        </div>
    )
}

function NotificationDetails({notification, onAction}) {
    const [selectedDate, setSelectedDate] = useState(null)

    switch (notification.type) {
        case 'expiration':
        case 'conversion':
        case 'cancellation':
        case 'billing':
            return (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Prestataire</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>{getDetailHeader(notification.type)}</TableHead>
                            <TableHead>Téléphone</TableHead>
                            <TableHead>Dernier contact</TableHead>
                            <TableHead>Risque de churn</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notification.providers.map((provider) => (
                            <TableRow key={provider.id}>
                                <TableCell>{provider.name}</TableCell>
                                <TableCell>{provider.plan}</TableCell>
                                <TableCell>{getDetailValue(notification.type, provider)}</TableCell>
                                <TableCell>
                                    <Button variant="link" size="sm"
                                            onClick={() => window.open(`tel:${provider.phone}`)}>
                                        <PhoneCall className="h-4 w-4 mr-2"/>
                                        {provider.phone}
                                    </Button>
                                </TableCell>
                                <TableCell>{provider.lastContact}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={provider.churnRisk === 'Élevé' ? 'destructive' : provider.churnRisk === 'Moyen' ? 'default' : 'secondary'}>
                                        {provider.churnRisk}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button size="sm" onClick={() => onAction(notification, provider.id)}>
                                            {getActionText(notification.type)}
                                        </Button>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <CalendarIcon className="h-4 w-4"/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={setSelectedDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <Button variant="outline" size="sm">
                                            <History className="h-4 w-4"/>
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <MessageSquare className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        case 'performance':
            return (
                <div className="space-y-2">
                    <p>Valeur actuelle : {notification.details.currentValue} €</p>
                    <p>Objectif : {notification.details.targetValue} €</p>
                    <p>Jours restants : {notification.details.remainingDays}</p>
                    <Progress value={(notification.details.currentValue / notification.details.targetValue) * 100}/>
                </div>
            )
        default:
            return null
    }
}

function NotificationIcon({type}) {
    switch (type) {
        case 'expiration':
            return <Clock className="h-6 w-6 text-yellow-500"/>
        case 'conversion':
            return <Zap className="h-6 w-6 text-green-500"/>
        case 'performance':
            return <CheckCircle className="h-6 w-6 text-blue-500"/>
        case 'cancellation':
            return <AlertTriangle className="h-6 w-6 text-red-500"/>
        case 'billing':
            return <AlertTriangle className="h-6 w-6 text-red-500"/>
        default:
            return <Bell className="h-6 w-6 text-gray-500"/>
    }
}

function getDetailHeader(type) {
    switch (type) {
        case 'expiration':
            return 'Date d\'expiration'
        case 'conversion':
            return 'Probabilité de conversion'
        case 'cancellation':
            return 'Raison'
        case 'billing':
            return 'Montant dû'
        default:
            return 'Détails'
    }
}

function getDetailValue(type, provider) {
    switch (type) {
        case 'expiration':
            return provider.expirationDate
        case 'conversion':
            return provider.conversionProbability
        case 'cancellation':
            return provider.reason
        case 'billing':
            return `${provider.amountDue} € (${provider.daysLate} jours de retard)`
        default:
            return ''
    }
}

function getActionText(type) {
    switch (type) {
        case 'expiration':
            return 'Renouveler'
        case 'conversion':
            return 'Convertir'
        case 'cancellation':
            return 'Retenir'
        case 'billing':
            return 'Relancer'
        default:
            return 'Agir'
    }
}