"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Briefcase, Edit, Star, X, Info, Pen, Plus, Trash2, Upload } from "lucide-react"

interface Package {
  id: string
  name: "Basic" | "Premium" | "VIP"
  price: number
  services: string[]
}

interface PortfolioImage {
  id: string
  url: string
  alt: string
}

interface Provider {
  name: string
  email: string
  phone: string
  photo: string
  rating: number
  totalSessions: number
  yearsExperience: number
  specialties: string[]
  location: string
  subscriptionTier: "Free" | "Standard" | "Premium"
  bio?: string
}

interface ProfileTabProps {
  provider: Provider
}

const subscriptionColors = {
  Free: "bg-gray-100 text-gray-800",
  Standard: "bg-blue-100 text-blue-800",
  Premium: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
}

const subscriptionButtonText = {
  Free: "Upgrade Your Membership",
  Standard: "Upgrade to Premium",
  Premium: "Premium Member",
}

const subscriptionButtonHelpText = {
  Free: "Upgrading your membership will give you access to more clients and diverse reach to maximize your earnings.",
  Standard:
    "Upgrading to premium tier gives you access to high-end/VIP clients who pay well and access to all premium features of the app.",
  Premium: "You have access to all premium features and VIP clients.",
}

const packageColors = {
  Basic: "from-green-500 to-emerald-500",
  Premium: "from-purple-500 to-pink-500",
  VIP: "from-yellow-500 to-orange-500",
}

const packageBgColors = {
  Basic: "bg-green-50",
  Premium: "bg-purple-50",
  VIP: "bg-yellow-50",
}

export function ProfileTab({ provider }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPackages, setIsEditingPackages] = useState(false)
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null)
  const [showHelpText, setShowHelpText] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(provider.photo)
  const [newPackageService, setNewPackageService] = useState<Record<string, string>>({})

  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([
    { id: "1", url: "/relaxing-massage.png", alt: "Massage session" },
  ])

  const [packages, setPackages] = useState<Package[]>([
    { id: "basic", name: "Basic", price: 2500, services: ["Swedish Massage", "Deep Tissue"] },
    {
      id: "premium",
      name: "Premium",
      price: 4000,
      services: ["Swedish Massage", "Aromatherapy", "Hot Stone", "Couple's Massage"],
    },
    {
      id: "vip",
      name: "VIP",
      price: 6500,
      services: ["Full Body Therapy", "Aromatherapy", "Hot Stone", "Reflexology", "Premium Add-ons"],
    },
  ])

  const [formData, setFormData] = useState({
    name: provider.name,
    email: provider.email,
    phone: provider.phone,
    location: provider.location,
    yearsExperience: provider.yearsExperience,
    bio: provider.bio || "",
    specialties: provider.specialties,
  })
  const [newSpecialty, setNewSpecialty] = useState("")

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty)) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty],
      }))
      setNewSpecialty("")
    }
  }

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddPackageService = (packageId: string) => {
    const service = newPackageService[packageId]?.trim()
    if (service) {
      setPackages((prev) =>
        prev.map((pkg) => (pkg.id === packageId ? { ...pkg, services: [...pkg.services, service] } : pkg)),
      )
      setNewPackageService((prev) => ({ ...prev, [packageId]: "" }))
    }
  }

  const handleRemovePackageService = (packageId: string, service: string) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === packageId ? { ...pkg, services: pkg.services.filter((s) => s !== service) } : pkg)),
    )
  }

  const handlePackagePriceChange = (packageId: string, price: number) => {
    setPackages((prev) => prev.map((pkg) => (pkg.id === packageId ? { ...pkg, price } : pkg)))
  }

  const handleAddPortfolioImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPortfolioImages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            url: reader.result as string,
            alt: file.name,
          },
        ])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePortfolioImage = (id: string) => {
    setPortfolioImages((prev) => prev.filter((img) => img.id !== id))
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Edit Profile</span>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Profile Photo</label>
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={photoPreview || "/placeholder.svg"} />
                  <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => handleInputChange("yearsExperience", Number.parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell clients about yourself..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white min-h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Specialties</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add a specialty..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white"
                  onKeyPress={(e) => e.key === "Enter" && handleAddSpecialty()}
                />
                <Button
                  onClick={handleAddSpecialty}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 cursor-pointer group"
                  >
                    {specialty}
                    <button
                      onClick={() => handleRemoveSpecialty(specialty)}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Packages Editing View
  if (isEditingPackages) {
    return (
      <div className="space-y-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Edit Service Packages</span>
              <Button size="sm" variant="outline" onClick={() => setIsEditingPackages(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`p-6 rounded-xl ${packageBgColors[pkg.name]} border-2 border-gray-200`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{pkg.name} Package</h3>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Price (Ksh)</label>
                  <input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => handlePackagePriceChange(pkg.id, Number.parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Services</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newPackageService[pkg.id] || ""}
                      onChange={(e) => setNewPackageService((prev) => ({ ...prev, [pkg.id]: e.target.value }))}
                      placeholder="Add a service..."
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white"
                      onKeyPress={(e) => e.key === "Enter" && handleAddPackageService(pkg.id)}
                    />
                    <Button
                      onClick={() => handleAddPackageService(pkg.id)}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {pkg.services.map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white">
                        <span>{service}</span>
                        <button
                          onClick={() => handleRemovePackageService(pkg.id, service)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">Save Packages</Button>
              <Button variant="outline" onClick={() => setIsEditingPackages(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Provider Profile</span>
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-6 flex-col md:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={photoPreview || "/placeholder.svg"} />
              <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4 w-full">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl font-bold gradient-text">{formData.name}</h3>
                  <Badge className={subscriptionColors[provider.subscriptionTier]}>{provider.subscriptionTier}</Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.totalSessions} sessions)</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <p className="text-sm font-medium text-green-900">
                  Current Status: <span className="font-bold">Available</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.yearsExperience} years experience</span>
                </div>
              </div>

              {formData.bio && (
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-700">{formData.bio}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Packages */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Service Packages</span>
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              onClick={() => setIsEditingPackages(true)}
            >
              <Pen className="h-4 w-4 mr-2" />
              Edit Packages
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-xl p-6 ${packageBgColors[pkg.name]} border-2 border-gray-200 hover:shadow-lg transition-shadow`}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold gradient-text">Ksh {pkg.price}</span>
                    <span className="text-sm text-muted-foreground">/session</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3">Services Included:</p>
                  <ul className="space-y-2">
                    {pkg.services.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${packageColors[pkg.name]}`} />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio / Image Catalogue */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Portfolio Gallery</span>
            <label className="cursor-pointer">
              <input type="file" accept="image/*" onChange={handleAddPortfolioImage} className="hidden" />
              <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioImages.map((image) => (
              <div key={image.id} className="relative group rounded-lg overflow-hidden">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemovePortfolioImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Card */}
      {provider.subscriptionTier !== "Premium" && (
        <Card className="glass-card border-0 border-l-4 border-l-gradient-to-b from-pink-500 to-purple-500 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">Upgrade Your Account</h3>
                <p className="text-sm text-muted-foreground">{subscriptionButtonHelpText[provider.subscriptionTier]}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onMouseEnter={() => setShowHelpText(true)}
                    onMouseLeave={() => setShowHelpText(false)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  {showHelpText && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg whitespace-normal">
                      {subscriptionButtonHelpText[provider.subscriptionTier]}
                    </div>
                  )}
                </div>
                <Link href="/provider/subscription">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white whitespace-nowrap">
                    {subscriptionButtonText[provider.subscriptionTier]}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
