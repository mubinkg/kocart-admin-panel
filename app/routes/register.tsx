import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { ChevronLeft, ChevronRight, Upload, X } from "lucide-react"

interface FormData {
  // Personal Details
  name: string
  mobile: string
  email: string
  password: string
  confirmPassword: string
  address: string

  // Documents
  addressProof: File | null
  nationalId: File | null
  businessLicense: File | null

  // Bank Details
  accountNumber: string
  accountName: string
  bankCode: string
  bankName: string
}

const initialFormData: FormData = {
  name: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  addressProof: null,
  nationalId: null,
  businessLicense: null,
  accountNumber: "",
  accountName: "",
  bankCode: "",
  bankName: "",
}

export default function MultiStepRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  const FileUploadField = ({
    label,
    file,
    onChange,
  }: {
    label: string
    file: File | null
    onChange: (file: File | null) => void
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-600">{label}</Label>
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
        {file ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{file.name}</span>
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement("input")
                  input.type = "file"
                  input.accept = ".pdf,.jpg,.jpeg,.png"
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) onChange(file)
                  }
                  input.click()
                }}
              >
                Choose
              </Button>
              <Button type="button" variant="outline" size="sm" disabled>
                Upload
              </Button>
              <Button type="button" variant="outline" size="sm" disabled>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Details</h3>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-600">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-sm font-medium text-gray-600">
                Mobile
              </Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                placeholder="Enter your mobile number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-600">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-600">
                Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your address"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Document Upload</h3>

            <FileUploadField
              label="Address Proof"
              file={formData.addressProof}
              onChange={(file) => handleFileChange("addressProof", file)}
            />

            <FileUploadField
              label="National Identity Card"
              file={formData.nationalId}
              onChange={(file) => handleFileChange("nationalId", file)}
            />

            <FileUploadField
              label="Business Licence"
              file={formData.businessLicense}
              onChange={(file) => handleFileChange("businessLicense", file)}
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Bank Details</h3>

            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-600">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                placeholder="Enter account number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName" className="text-sm font-medium text-gray-600">
                Account Name
              </Label>
              <Input
                id="accountName"
                value={formData.accountName}
                onChange={(e) => handleInputChange("accountName", e.target.value)}
                placeholder="Enter account name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankCode" className="text-sm font-medium text-gray-600">
                Bank Code
              </Label>
              <Input
                id="bankCode"
                value={formData.bankCode}
                onChange={(e) => handleInputChange("bankCode", e.target.value)}
                placeholder="Enter bank code"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName" className="text-sm font-medium text-gray-600">
                Bank Name
              </Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                placeholder="Enter bank name"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Review & Confirm</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Personal Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Name:</span> {formData.name}
                  </p>
                  <p>
                    <span className="font-medium">Mobile:</span> {formData.mobile}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {formData.email}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {formData.address}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Address Proof:</span>{" "}
                    {formData.addressProof ? formData.addressProof.name : "Not uploaded"}
                  </p>
                  <p>
                    <span className="font-medium">National ID:</span>{" "}
                    {formData.nationalId ? formData.nationalId.name : "Not uploaded"}
                  </p>
                  <p>
                    <span className="font-medium">Business License:</span>{" "}
                    {formData.businessLicense ? formData.businessLicense.name : "Not uploaded"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Bank Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Account Number:</span> {formData.accountNumber}
                  </p>
                  <p>
                    <span className="font-medium">Account Name:</span> {formData.accountName}
                  </p>
                  <p>
                    <span className="font-medium">Bank Code:</span> {formData.bankCode}
                  </p>
                  <p>
                    <span className="font-medium">Bank Name:</span> {formData.bankName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">kecart</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Seller Registration</CardTitle>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {renderStep()}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button type="button" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Submit
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
