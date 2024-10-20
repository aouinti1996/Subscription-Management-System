    "use client"

    import { useState } from 'react'
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
    import { Button } from "@/components/ui/button"
    import { Badge } from "@/components/ui/badge"
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"
    import { Textarea } from "@/components/ui/textarea"
    import { AlertCircle } from "lucide-react"
    import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

    const initialTasks = [
        {
            id: 1,
            providerName: "Prestataire A",
            type: "renew",
            priority: "high",
            expirationDate: "2023-10-25",
            lastContact: "2023-10-10",
            plan: "Premium",
            phone: "+33 1 23 45 67 89",
            churnRisk: "Élevé",
            callsLastMonth: 15
        },
        {
            id: 2,
            providerName: "Prestataire B",
            type: "convert",
            priority: "medium",
            trialEndDate: "2023-10-30",
            lastContact: "2023-10-05",
            plan: "Essai",
            phone: "+33 1 23 45 67 90",
            conversionProbability: "75%",
            callsLastMonth: 8
        },
        {
            id: 3,
            providerName: "Prestataire C",
            type: "retain",
            priority: "high",
            lastContact: "2023-09-30",
            plan: "Standard",
            phone: "+33 1 23 45 67 91",
            churnRisk: "Moyen",
            callsLastMonth: 5
        },
        {
            id: 4,
            providerName: "Prestataire D",
            type: "boost",
            priority: "medium",
            lastContact: "2023-10-15",
            plan: "Premium",
            phone: "+33 1 23 45 67 92",
            callsLastMonth: 2
        },
        {
            id: 5,
            providerName: "Prestataire E",
            type: "renew",
            priority: "low",
            expirationDate: "2023-11-05",
            lastContact: "2023-10-01",
            plan: "Basic",
            phone: "+33 1 23 45 67 93",
            churnRisk: "Faible",
            callsLastMonth: 10
        },
    ]

    export default function DailyTaskList() {
        const [tasks, setTasks] = useState(initialTasks)
        const [activeTab, setActiveTab] = useState('all')
        const [selectedTask, setSelectedTask] = useState(null)

        const filterTasks = (tab) => {
            switch (tab) {
                case 'renew':
                    return tasks.filter(t => t.type === 'renew')
                case 'convert':
                    return tasks.filter(t => t.type === 'convert')
                case 'retain':
                    return tasks.filter(t => t.type === 'retain')
                case 'boost':
                    return tasks.filter(t => t.type === 'boost')
                case 'reduce-visibility':
                    return tasks.filter(t => t.callsLastMonth > 10)
                default:
                    return tasks.sort((a, b) => {
                        const priorityOrder = { high: 3, medium: 2, low: 1 }
                        return priorityOrder[b.priority] - priorityOrder[a.priority]
                    })
            }
        }

        const handleAction = (task) => {
            setSelectedTask(task)
        }

        const getActionComponent = (task) => {
            switch (task.type) {
                case 'renew':
                    return (
                        <div className="space-y-4">
                            <p>Action pour le renouvellement de l'abonnement :</p>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="call">Appeler le prestataire</SelectItem>
                                    <SelectItem value="email">Envoyer un email de renouvellement</SelectItem>
                                    <SelectItem value="offer">Proposer une offre spéciale</SelectItem>
                                </SelectContent>
                            </Select>
                            <div>
                                <Label htmlFor="renewal-notes">Notes pour le renouvellement</Label>
                                <Textarea id="renewal-notes" placeholder="Entrez vos notes pour le renouvellement..." />
                            </div>
                        </div>
                    )
                case 'convert':
                    return (
                        <div className="space-y-4">
                            <p>Action pour la conversion :</p>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="demo">Proposer une démo personnalisée</SelectItem>
                                    <SelectItem value="call">Planifier un appel de suivi</SelectItem>
                                    <SelectItem value="offer">Envoyer une offre de conversion</SelectItem>
                                </SelectContent>
                            </Select>
                            <div>
                                <Label htmlFor="conversion-notes">Notes pour la conversion</Label>
                                <Textarea id="conversion-notes" placeholder="Entrez vos notes pour la stratégie de conversion..." />
                            </div>
                        </div>
                    )
                case 'retain':
                    return (
                        <div className="space-y-4">
                            <p>Action pour la rétention :</p>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="call">Appeler pour discuter des besoins</SelectItem>
                                    <SelectItem value="offer">Proposer un plan personnalisé</SelectItem>
                                    <SelectItem value="feedback">Demander un feedback détaillé</SelectItem>
                                </SelectContent>
                            </Select>
                            <div>
                                <Label htmlFor="retention-notes">Notes pour la rétention</Label>
                                <Textarea id="retention-notes" placeholder="Entrez votre stratégie de rétention..." />
                            </div>
                        </div>
                    )
                case 'boost':
                    return (
                        <div className="space-y-4">
                            <p>Action pour le boost :</p>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="profile">Optimiser le profil</SelectItem>
                                    <SelectItem value="visibility">Augmenter la visibilité</SelectItem>
                                    <SelectItem value="promotion">Lancer une promotion temporaire</SelectItem>
                                </SelectContent>
                            </Select>
                            <div>
                                <Label htmlFor="boost-notes">Notes pour le boost</Label>
                                <Textarea id="boost-notes" placeholder="Entrez votre stratégie de boost..." />
                            </div>
                        </div>
                    )
                case 'reduce-visibility':
                    return (
                        <div className="space-y-4">
                            <p>Action pour réduire la visibilité :</p>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reduce-search-ranking">Réduire le classement dans les résultats de recherche</SelectItem>
                                    <SelectItem value="limit-daily-views">Limiter le nombre de vues quotidiennes du profil</SelectItem>
                                    <SelectItem value="remove-featured">Retirer des listes de prestataires en vedette</SelectItem>
                                    <SelectItem value="adjust-algorithm">Ajuster l'algorithme de recommandation</SelectItem>
                                </SelectContent>
                            </Select>
                            <div>
                                <Label htmlFor="visibility-reduction-percentage">Pourcentage de réduction de visibilité</Label>
                                <Input
                                    id="visibility-reduction-percentage"
                                    type="number"
                                    placeholder="Ex: 30"
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div>
                                <Label htmlFor="visibility-notes">Notes pour la réduction de visibilité</Label>
                                <Textarea
                                    id="visibility-notes"
                                    placeholder="Entrez vos notes pour la stratégie de réduction de visibilité..."
                                />
                            </div>
                        </div>
                    )
                default:
                    return null
            }
        }

        return (
            <div className="container mx-auto p-4 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Liste des tâches journalières</CardTitle>
                        <CardDescription>Gérez vos actions prioritaires pour aujourd'hui</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Attention</AlertTitle>
                            <AlertDescription>
                                {tasks.filter(t => t.callsLastMonth > 4).length} prestataire(s) reçoivent plus de 4 appels
                                par mois et nécessitent une réduction de visibilité.
                            </AlertDescription>
                        </Alert>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="all">Toutes</TabsTrigger>
                                <TabsTrigger value="renew">À renouveler</TabsTrigger>
                                <TabsTrigger value="convert">À convertir</TabsTrigger>
                                <TabsTrigger value="retain">À retenir</TabsTrigger>
                                <TabsTrigger value="boost">À booster</TabsTrigger>
                                <TabsTrigger value="reduce-visibility">Réduire visibilité</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all">
                                <TaskTable tasks={filterTasks('all')} onAction={handleAction} />
                            </TabsContent>
                            <TabsContent value="renew">
                                <TaskTable tasks={filterTasks('renew')} onAction={handleAction} />
                            </TabsContent>
                            <TabsContent value="convert">
                                <TaskTable tasks={filterTasks('convert')} onAction={handleAction} />
                            </TabsContent>
                            <TabsContent value="retain">
                                <TaskTable tasks={filterTasks('retain')} onAction={handleAction} />
                            </TabsContent>
                            <TabsContent value="boost">
                                <TaskTable tasks={filterTasks('boost')} onAction={handleAction} />
                            </TabsContent>
                            <TabsContent value="reduce-visibility">
                                <TaskTable tasks={filterTasks('reduce-visibility')} onAction={handleAction} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Dialog open={selectedTask !== null} onOpenChange={() => setSelectedTask(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Action pour {selectedTask?.providerName}</DialogTitle>
                            <DialogDescription>
                                Type d'action : {getTypeLabel(selectedTask?.type)}
                            </DialogDescription>
                        </DialogHeader>
                        {selectedTask && getActionComponent(selectedTask)}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setSelectedTask(null)}>
                                Annuler
                            </Button>
                            <Button onClick={() => {
                                // Ici, vous pouvez ajouter la logique pour enregistrer l'action
                                setSelectedTask(null)
                            }}>
                                Confirmer l'action
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    function TaskTable({ tasks, onAction }) {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Prestataire</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Priorité</TableHead>
                        <TableHead>Détails</TableHead>
                        <TableHead>Dernier contact</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Appels (dernier mois)</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.providerName}</TableCell>
                            <TableCell>
                                <Badge variant={getTypeBadgeVariant(task.type)}>
                                    {getTypeLabel(task.type)}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={getPriorityBadgeVariant(task.priority)}>
                                    {task.priority}
                                </Badge>
                            </TableCell>
                            <TableCell>{getTaskDetails(task)}</TableCell>
                            <TableCell>{task.lastContact}</TableCell>
                            <TableCell>{task.plan}</TableCell>
                            <TableCell>{task.callsLastMonth}</TableCell>
                            <TableCell>
                                <Button size="sm" onClick={() => onAction(task)}>
                                    {getActionText(task.type)}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    function getTypeBadgeVariant(type) {
        switch (type) {
            case 'renew':
                return 'default'
            case 'convert':
                return 'secondary'
            case 'retain':
                return 'destructive'
            case 'boost':
                return 'outline'
            case 'reduce-visibility':
                return 'warning'
            default:
                return 'default'
        }
    }

    function getPriorityBadgeVariant(priority) {
        switch (priority) {
            case 'high':
                return 'destructive'
            case 'medium':
                return 'default'
            case 'low':
                return 'secondary'
            default:
                return 'default'
        }
    }

    function getTypeLabel(type) {
        switch (type) {
            case 'renew':
                return 'À renouveler'
            case  'convert':
                return 'À convertir'
            case 'retain':
                return 'À retenir'
            case 'boost':
                return 'À booster'
            case 'reduce-visibility':
                return 'Réduire visibilité'
            default:
                return type
        }
    }

    function getTaskDetails(task) {
        switch (task.type) {
            case 'renew':
                return `Expire le ${task.expirationDate}`
            case 'convert':
                return `Fin d'essai le ${task.trialEndDate}`
            case 'retain':
                return `Risque de churn : ${task.churnRisk}`
            case 'boost':
                return 'Besoin de plus dappels'
            case 'reduce-visibility':
                return `${task.callsLastMonth} appels le mois dernier`
            default:
                return ''
        }
    }

    function getActionText(type) {
        switch (type) {
            case 'renew':
                return 'Renouveler'
            case 'convert':
                return 'Convertir'
            case 'retain':
                return 'Retenir'
            case 'boost':
                return 'Booster'
            case 'reduce-visibility':
                return 'Réduire visibilité'
            default:
                return 'Agir'
        }
    }