"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, SearchIcon, EditIcon, EyeIcon, SendIcon } from 'lucide-react'

export default function Component() {
  const [chiefComplaints, setChiefComplaints] = useState([{ complaint: '', since: '', history: '' }])
  const [diagnoses, setDiagnoses] = useState([{ diagnosis: '', type: '', details: '' }])
  const [medications, setMedications] = useState([{ name: '', frequency: '', duration: '', route: '', instructions: '' }])
  const [examination, setExamination] = useState('')
  const [investigation, setInvestigation] = useState('')

  const addChiefComplaint = () => {
    setChiefComplaints([...chiefComplaints, { complaint: '', since: '', history: '' }])
  }

  const addDiagnosis = () => {
    setDiagnoses([...diagnoses, { diagnosis: '', type: '', details: '' }])
  }

  const addMedication = () => {
    setMedications([...medications, { name: '', frequency: '', duration: '', route: '', instructions: '' }])
  }

  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select visit template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="template1">Template 1</SelectItem>
              <SelectItem value="template2">Template 2</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select data template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="data1">Data Template 1</SelectItem>
              <SelectItem value="data2">Data Template 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vitals</CardTitle>
          <Button variant="ghost" size="sm"><EditIcon className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <Label>Blood Glucose</Label>
              <div className="text-2xl font-bold">120 mg/dl</div>
            </div>
            <div>
              <Label>Temperature</Label>
              <div className="text-2xl font-bold">98.7 °F</div>
            </div>
            <div>
              <Label>Blood Pressure</Label>
              <div className="text-2xl font-bold">120/80 mmHg</div>
            </div>
            <div>
              <Label>Weight</Label>
              <div className="text-2xl font-bold">70 kg</div>
            </div>
            <div>
              <Label>SpO2</Label>
              <div className="text-2xl font-bold">98%</div>
            </div>
            <div>
              <Label>Respiratory Rate</Label>
              <div className="text-2xl font-bold">16 /min</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chief Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <Input className="pl-8" placeholder="Search Chief Complaints" />
            </div>
            {chiefComplaints.map((complaint, index) => (
              <div key={index} className="flex space-x-2">
                <Input placeholder="Fever" value={complaint.complaint} onChange={(e) => {
                  const newComplaints = [...chiefComplaints]
                  newComplaints[index].complaint = e.target.value
                  setChiefComplaints(newComplaints)
                }} />
                <Select value={complaint.since} onValueChange={(value) => {
                  const newComplaints = [...chiefComplaints]
                  newComplaints[index].since = value
                  setChiefComplaints(newComplaints)
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Since When" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1day">1 day</SelectItem>
                    <SelectItem value="2days">2 days</SelectItem>
                    <SelectItem value="1week">1 week</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Complaint History (max 400 characters)" value={complaint.history} onChange={(e) => {
                  const newComplaints = [...chiefComplaints]
                  newComplaints[index].history = e.target.value
                  setChiefComplaints(newComplaints)
                }} />
              </div>
            ))}
            <Button onClick={addChiefComplaint} variant="outline" className="w-full">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Chief Complaint
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle >Examinations</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Enter examination details here..." 
            className="min-h-[100px]"
            value={examination}
            onChange={(e) => setExamination(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diagnosis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <Input className="pl-8" placeholder="Search Diagnosis" />
            </div>
            {diagnoses.map((diagnosis, index) => (
              <div key={index} className="flex space-x-2">
                <Input placeholder="Fever" value={diagnosis.diagnosis} onChange={(e) => {
                  const newDiagnoses = [...diagnoses]
                  newDiagnoses[index].diagnosis = e.target.value
                  setDiagnoses(newDiagnoses)
                }} />
                <Select value={diagnosis.type} onValueChange={(value) => {
                  const newDiagnoses = [...diagnoses]
                  newDiagnoses[index].type = value
                  setDiagnoses(newDiagnoses)
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Diagnosis Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="provisional">Provisional</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Diagnosis details (max 400 characters)" value={diagnosis.details} onChange={(e) => {
                  const newDiagnoses = [...diagnoses]
                  newDiagnoses[index].details = e.target.value
                  setDiagnoses(newDiagnoses)
                }} />
              </div>
            ))}
            <Button onClick={addDiagnosis} variant="outline" className="w-full">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Diagnosis
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investigation</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Enter investigation details here..." 
            className="min-h-[100px]"
            value={investigation}
            onChange={(e) => setInvestigation(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <Input className="pl-8" placeholder="Search medication and add" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Instructions</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medications.map((medication, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input placeholder="e.g. MOXITON TABLET" value={medication.name} onChange={(e) => {
                        const newMedications = [...medications]
                        newMedications[index].name = e.target.value
                        setMedications(newMedications)
                      }} />
                    </TableCell>
                    <TableCell>
                      <Input placeholder="0-0-0" value={medication.frequency} onChange={(e) => {
                        const newMedications = [...medications]
                        newMedications[index].frequency = e.target.value
                        setMedications(newMedications)
                      }} />
                    </TableCell>
                    <TableCell>
                      <Input placeholder="0 days" value={medication.duration} onChange={(e) => {
                        const newMedications = [...medications]
                        newMedications[index].duration = e.target.value
                        setMedications(newMedications)
                      }} />
                    </TableCell>
                    <TableCell>
                      <Select value={medication.route} onValueChange={(value) => {
                        const newMedications = [...medications]
                        newMedications[index].route = value
                        setMedications(newMedications)
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Route" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oral">Oral</SelectItem>
                          <SelectItem value="topical">Topical</SelectItem>
                          <SelectItem value="intravenous">Intravenous</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Before Meal" value={medication.instructions} onChange={(e) => {
                        const newMedications = [...medications]
                        newMedications[index].instructions = e.target.value
                        setMedications(newMedications)
                      }} />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={addMedication} variant="outline" className="w-full">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <Input className="pl-8" placeholder="Search Advice" />
            </div>
            <Input placeholder="e.g. Salt water gargles" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Follow Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1week">1 week</SelectItem>
                <SelectItem value="2weeks">2 weeks</SelectItem>
                <SelectItem value="1month">1 month</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" placeholder="Enter or select date" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2 overflow-x-auto">
              <Button variant="outline">Nebulizer</Button>
              <Button variant="outline">Inhaler</Button>
              <Button variant="outline">Omron Device 1</Button>
              <Button variant="outline">Omron Device 2</Button>
              <Button variant="outline">Omron Device 3</Button>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              <Button variant="outline">Care 360</Button>
              <Button variant="outline">Diabetes Care Plan</Button>
              <Button variant="outline">Arthritis Care Plan</Button>
              <Button variant="outline">Weight Loss Plan</Button>
              <Button variant="outline">Hypertension Plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
              <EyeIcon className="mr-2 h-4 w-4" />
              Preview Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Prescription Preview</DialogTitle>
              <DialogDescription>
                Review the prescription details before submitting.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[400px] overflow-y-auto">
              {/* Add prescription preview content here */}
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">Confirm and Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button className="bg-green-600 hover:bg-green-700">
          <SendIcon className="mr-2 h-4 w-4" />
          Submit Prescription
        </Button>
      </div>
    </div>
  )
}