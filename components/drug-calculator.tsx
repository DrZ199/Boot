'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Drug {
  name: string
  dosePerKg: number
  maxDose: number
  frequency: string
  route: string
}

interface DrugData {
  [category: string]: Drug[]
}

export function DrugCalculator() {
  const [drugData, setDrugData] = useState<DrugData>({})
  const [category, setCategory] = useState<string>('')
  const [medication, setMedication] = useState<string>('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [dose, setDose] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/drugData')
      .then(response => response.json())
      .then(data => setDrugData(data))
      .catch(error => console.error('Error fetching drug data:', error))
  }, [])

  const calculateDose = () => {
    if (!weight || !category || !medication) {
      setDose('Please fill in all fields')
      return
    }

    const weightNum = parseFloat(weight)
    const selectedDrug = drugData[category].find(drug => drug.name === medication)

    if (!selectedDrug) {
      setDose('Drug not found')
      return
    }

    let calculatedDose = weightNum * selectedDrug.dosePerKg
    calculatedDose = Math.min(calculatedDose, selectedDrug.maxDose)

    setDose(`Recommended dose: ${calculatedDose.toFixed(2)} mg
Frequency: ${selectedDrug.frequency}
Route: ${selectedDrug.route}`)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="weight" className="text-sm font-medium">
            Weight (kg)
          </label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="age" className="text-sm font-medium">
            Age (months)
          </label>
          <Input
            id="age"
            type="number"
            placeholder="Enter age in months"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(drugData).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Medication</label>
          <Select value={medication} onValueChange={setMedication} disabled={!category}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={category ? "Select Medication" : "Select a category first"} />
            </SelectTrigger>
            <SelectContent>
              {category && drugData[category]?.map((drug) => (
                <SelectItem key={drug.name} value={drug.name}>
                  {drug.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" onClick={calculateDose}>
          Calculate Dose
        </Button>

        {dose && (
          <Alert>
            <AlertDescription className="whitespace-pre-line">{dose}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="flex items-center space-x-2 text-lg font-semibold">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <span>Safety Alerts</span>
        </h2>

        <Alert variant="destructive">
          <AlertDescription>
            Always verify dosage calculations
          </AlertDescription>
        </Alert>

        <Alert variant="warning">
          <AlertDescription>
            Check for drug interactions
          </AlertDescription>
        </Alert>

        <Alert>
          AlertDescription>
            Monitor renal function
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

