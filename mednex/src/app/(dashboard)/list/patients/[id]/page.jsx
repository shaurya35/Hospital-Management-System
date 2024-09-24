import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Clock,
  FileText,
  Activity,
  Pill,
  ChevronRight,
} from "lucide-react";

export default function Component() {
  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between mb-6"></div>

      {/* Patient Information */}
      <Card className="mb-6">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt="Sarah Johnson"
            />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Avni Agarwal</h2>
            <p className="text-muted-foreground">Female, 48 years old</p>
            <p className="text-muted-foreground">Patient ID: SUPT240001</p>
          </div>
        </CardContent>
      </Card>

      {/* Medical History Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Medical History Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Diagnosed with Type 2 Diabetes (2018)</li>
            <li>Appendectomy (2015)</li>
            <li>Allergic to penicillin</li>
            <li>Family history of heart disease</li>
          </ul>
        </CardContent>
      </Card>

      {/* Current Medications */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Purpose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Metformin</TableCell>
                <TableCell>500mg</TableCell>
                <TableCell>Twice daily</TableCell>
                <TableCell>Diabetes management</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lisinopril</TableCell>
                <TableCell>10mg</TableCell>
                <TableCell>Once daily</TableCell>
                <TableCell>Blood pressure control</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Atorvastatin</TableCell>
                <TableCell>20mg</TableCell>
                <TableCell>Once daily</TableCell>
                <TableCell>Cholesterol management</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Endocrinologist Check-up</p>
                <p className="text-sm text-muted-foreground">
                  June 15, 2023 at 10:00 AM
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Nutritionist Consultation</p>
                <p className="text-sm text-muted-foreground">
                  June 22, 2023 at 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Test Results */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Normal Range</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>HbA1c</TableCell>
                <TableCell>May 1, 2023</TableCell>
                <TableCell>7.1%</TableCell>
                <TableCell>&lt; 5.7%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Blood Pressure</TableCell>
                <TableCell>May 1, 2023</TableCell>
                <TableCell>128/82 mmHg</TableCell>
                <TableCell>&lt; 120/80 mmHg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cholesterol (Total)</TableCell>
                <TableCell>May 1, 2023</TableCell>
                <TableCell>195 mg/dL</TableCell>
                <TableCell>&lt; 200 mg/dL</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Vital Signs Trends */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vital Signs Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="blood-sugar">
            <TabsList>
              <TabsTrigger value="blood-sugar">Blood Sugar</TabsTrigger>
              <TabsTrigger value="blood-pressure">Blood Pressure</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
            </TabsList>
            <TabsContent value="blood-sugar">
              <div className="h-[200px] flex items-center justify-center bg-muted">
                <Activity className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Blood sugar trend over the last 3 months
              </p>
            </TabsContent>
            <TabsContent value="blood-pressure">
              <div className="h-[200px] flex items-center justify-center bg-muted">
                <Activity className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Blood pressure trend over the last 3 months
              </p>
            </TabsContent>
            <TabsContent value="weight">
              <div className="h-[200px] flex items-center justify-center bg-muted">
                <Activity className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Weight trend over the last 3 months
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Treatment Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Diabetes Management</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Continue Metformin as prescribed</li>
                <li>Monitor blood sugar levels daily</li>
                <li>Follow recommended diet plan</li>
                <li>Exercise for 30 minutes, 5 days a week</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cardiovascular Health</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Continue Lisinopril and Atorvastatin as prescribed</li>
                <li>Reduce sodium intake</li>
                <li>Increase consumption of fruits and vegetables</li>
                <li>Quit smoking</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Follow-up</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Schedule quarterly check-ups with primary care physician
                </li>
                <li>Annual eye exam</li>
                <li>Foot exam every 6 months</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
