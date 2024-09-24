"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SearchIcon, FilterIcon, MoreVerticalIcon, CalendarIcon, UserIcon, ClipboardIcon } from 'lucide-react'
import { consultations } from "@/lib/data";


export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConsultation, setSelectedConsultation] = useState(null)



  const filteredConsultations = consultations.filter(consultation => 
    consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-green-main">Past Doctor Consultations</h1>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
          <Input 
            className="pl-8" 
            placeholder="Search by patient name, doctor, or diagnosis..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-green-main text-green-main hover:bg-green-50">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Specialty</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cardiology</DropdownMenuItem>
              <DropdownMenuItem>Orthopedics</DropdownMenuItem>
              <DropdownMenuItem>Neurology</DropdownMenuItem>
              <DropdownMenuItem>Gastroenterology</DropdownMenuItem>
              <DropdownMenuItem>Dermatology</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Consultation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-2">
                <ClipboardIcon className="h-4 w-4 text-green-main" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Consultations</p>
                <p className="text-xl font-semibold">{consultations.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-100 p-2">
                <UserIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Unique Patients</p>
                <p className="text-xl font-semibold">{new Set(consultations.map(c => c.patientName)).size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-yellow-100 p-2">
                <UserIcon className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Unique Doctors</p>
                <p className="text-xl font-semibold">{new Set(consultations.map(c => c.doctor)).size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-purple-100 p-2">
                <CalendarIcon className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Range</p>
                <p className="text-xl font-semibold">{`${consultations[consultations.length - 1].date} - ${consultations[0].date}`}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Follow-up</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConsultations.map((consultation) => (
              <TableRow key={consultation.id}>
                <TableCell>{consultation.date}</TableCell>
                <TableCell className="font-medium">{consultation.patientName}</TableCell>
                <TableCell>{consultation.doctor}</TableCell>
                <TableCell>{consultation.specialty}</TableCell>
                <TableCell>{consultation.diagnosis}</TableCell>
                <TableCell>{consultation.followUp}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setSelectedConsultation(consultation)}>
                        <span className="sr-only">Open menu</span>
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Consultation Details</DialogTitle>
                        <DialogDescription>
                          Full details of the consultation for {selectedConsultation?.patientName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Date</Label>
                          <div className="col-span-3">{selectedConsultation?.date}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Doctor</Label>
                          <div className="col-span-3">{selectedConsultation?.doctor}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Specialty</Label>
                          <div className="col-span-3">{selectedConsultation?.specialty}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Reason</Label>
                          <div className="col-span-3">{selectedConsultation?.reason}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Diagnosis</Label>
                          <div className="col-span-3">{selectedConsultation?.diagnosis}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Treatment</Label>
                          <div className="col-span-3">{selectedConsultation?.treatment}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Follow-up</Label>
                          <div className="col-span-3">{selectedConsultation?.followUp}</div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}