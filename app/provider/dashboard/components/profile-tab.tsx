"use client"

import type React from "react"
import { useMemo, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BriefcaseBusiness, Edit3, ImagePlus, Info, Mail, MapPin, Phone, Plus, Star, Trash2, Upload, X } from "lucide-react"

interface ServicePackage {
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

const subscriptionStyles = {
  Free: "border-slate-200 bg-slate-100 text-slate-700",
  Standard: "border-blue-200 bg-blue-100 text-blue-700",
  Premium: "border-teal-200 bg-teal-100 text-teal-700",
}

const packageStyles: Record<ServicePackage["name"], string> = {
  Basic: "border-emerald-200 bg-emerald-50",
  Premium: "border-blue-200 bg-blue-50",
  VIP: "border-amber-200 bg-amber-50",
}

const upgradeNotes = {
  Free: "Move to Standard or Premium to increase profile visibility and booking volume.",
  Standard: "Premium unlocks advanced analytics, VIP support, and top search placement.",
  Premium: "You have full access to premium tools and provider priority channels.",
}

export function ProfileTab({ provider }: ProfileTabProps) {
  const initialProfile = {
    name: provider.name,
    email: provider.email,
    phone: provider.phone,
    location: provider.location,
    yearsExperience: provider.yearsExperience,
    bio: provider.bio || "",
    specialties: provider.specialties,
  }

  const initialPackages: ServicePackage[] = [
    { id: "basic", name: "Basic", price: 2500, services: ["Swedish massage", "Deep tissue"] },
    { id: "premium", name: "Premium", price: 4000, services: ["Swedish massage", "Aromatherapy", "Hot stone"] },
    { id: "vip", name: "VIP", price: 6500, services: ["Full-body therapy", "Aromatherapy", "Reflexology", "Premium add-ons"] },
  ]

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingPackages, setIsEditingPackages] = useState(false)
  const [newSpecialty, setNewSpecialty] = useState("")
  const [newPackageService, setNewPackageService] = useState<Record<string, string>>({})

  const [savedProfile, setSavedProfile] = useState(initialProfile)
  const [formData, setFormData] = useState(initialProfile)
  const [savedPhoto, setSavedPhoto] = useState(provider.photo)
  const [photoPreview, setPhotoPreview] = useState(provider.photo)

  const [savedPackages, setSavedPackages] = useState(initialPackages)
  const [packages, setPackages] = useState(initialPackages)

  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([
    { id: "1", url: "/professional-relaxing-spa-massage-therapy-serene-w.jpg", alt: "Massage treatment room" },
    { id: "2", url: "/services/hot-stone.png", alt: "Hot stone setup" },
  ])

  const profileCompleteness = useMemo(() => {
    let score = 45
    if (formData.bio.trim().length > 50) score += 20
    if (formData.specialties.length >= 3) score += 20
    if (portfolioImages.length >= 2) score += 15
    return Math.min(100, score)
  }, [formData.bio, formData.specialties, portfolioImages.length])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSpecialty = () => {
    const value = newSpecialty.trim()
    if (!value || formData.specialties.includes(value)) return
    setFormData((prev) => ({ ...prev, specialties: [...prev.specialties, value] }))
    setNewSpecialty("")
  }

  const removeSpecialty = (specialty: string) => {
    setFormData((prev) => ({ ...prev, specialties: prev.specialties.filter((item) => item !== specialty) }))
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setPhotoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const saveProfile = () => {
    setSavedProfile(formData)
    setSavedPhoto(photoPreview)
    setIsEditingProfile(false)
  }

  const cancelProfileEdit = () => {
    setFormData(savedProfile)
    setPhotoPreview(savedPhoto)
    setIsEditingProfile(false)
  }

  const addPackageService = (packageId: string) => {
    const service = newPackageService[packageId]?.trim()
    if (!service) return
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === packageId ? { ...pkg, services: [...pkg.services, service] } : pkg)),
    )
    setNewPackageService((prev) => ({ ...prev, [packageId]: "" }))
  }

  const removePackageService = (packageId: string, service: string) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === packageId ? { ...pkg, services: pkg.services.filter((item) => item !== service) } : pkg)),
    )
  }

  const updatePackagePrice = (packageId: string, price: number) => {
    setPackages((prev) => prev.map((pkg) => (pkg.id === packageId ? { ...pkg, price } : pkg)))
  }

  const savePackageChanges = () => {
    setSavedPackages(packages)
    setIsEditingPackages(false)
  }

  const cancelPackageEdit = () => {
    setPackages(savedPackages)
    setIsEditingPackages(false)
  }

  const addPortfolioImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPortfolioImages((prev) => [...prev, { id: Date.now().toString(), url: reader.result as string, alt: file.name }])
    }
    reader.readAsDataURL(file)
  }

  const removePortfolioImage = (imageId: string) => {
    setPortfolioImages((prev) => prev.filter((item) => item.id !== imageId))
  }

  return (
    <div className="space-y-4">
      <Card className="provider-card">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg text-slate-900">Provider profile</CardTitle>
          {!isEditingProfile && (
            <Button size="sm" variant="outline" className="border-slate-300 text-slate-700" onClick={() => setIsEditingProfile(true)}>
              <Edit3 className="h-4 w-4" />
              Edit profile
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditingProfile ? (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={photoPreview || "/placeholder.svg"} />
                  <AvatarFallback className="bg-slate-200 text-slate-700">{provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  <Button type="button" variant="outline" className="border-slate-300 text-slate-700">
                    <Upload className="h-4 w-4" />
                    Change photo
                  </Button>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Full name</label>
                  <Input value={formData.name} className="provider-input" onChange={(event) => handleInputChange("name", event.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input type="email" value={formData.email} className="provider-input" onChange={(event) => handleInputChange("email", event.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Phone</label>
                  <Input value={formData.phone} className="provider-input" onChange={(event) => handleInputChange("phone", event.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <Input value={formData.location} className="provider-input" onChange={(event) => handleInputChange("location", event.target.value)} />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Years of experience</label>
                  <Input
                    type="number"
                    value={formData.yearsExperience}
                    className="provider-input"
                    onChange={(event) => handleInputChange("yearsExperience", Number(event.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Bio</label>
                <Textarea
                  value={formData.bio}
                  className="provider-input min-h-24"
                  placeholder="Summarize your treatment style and expertise."
                  onChange={(event) => handleInputChange("bio", event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Specialties</label>
                <div className="flex gap-2">
                  <Input
                    value={newSpecialty}
                    className="provider-input"
                    placeholder="Add specialty"
                    onChange={(event) => setNewSpecialty(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault()
                        addSpecialty()
                      }
                    }}
                  />
                  <Button type="button" className="provider-primary-btn" onClick={addSpecialty}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty) => (
                    <Badge key={specialty} className="provider-badge gap-1">
                      {specialty}
                      <button type="button" onClick={() => removeSpecialty(specialty)} aria-label={`Remove ${specialty}`}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                <Button className="provider-primary-btn" onClick={saveProfile}>
                  Save profile
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700" onClick={cancelProfileEdit}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={savedPhoto || "/placeholder.svg"} />
                    <AvatarFallback className="bg-slate-200 text-slate-700">{provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold text-slate-900">{savedProfile.name}</h3>
                      <Badge className={subscriptionStyles[provider.subscriptionTier]}>{provider.subscriptionTier}</Badge>
                    </div>
                    <p className="text-sm text-slate-600">{savedProfile.bio || "No bio added yet."}</p>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {provider.rating}
                      </span>
                      <span>{provider.totalSessions} sessions completed</span>
                    </div>
                  </div>
                </div>
                <div className="provider-card-muted w-full p-3 md:max-w-64">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Profile completion</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{profileCompleteness}%</p>
                </div>
              </div>

              <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                <div className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-500" />
                  {savedProfile.email}
                </div>
                <div className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  {savedProfile.phone}
                </div>
                <div className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  {savedProfile.location}
                </div>
                <div className="inline-flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-slate-500" />
                  {savedProfile.yearsExperience} years experience
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {savedProfile.specialties.map((specialty) => (
                  <Badge key={specialty} className="provider-badge">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="provider-card">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg text-slate-900">Service packages</CardTitle>
          {!isEditingPackages && (
            <Button size="sm" variant="outline" className="border-slate-300 text-slate-700" onClick={() => setIsEditingPackages(true)}>
              <Edit3 className="h-4 w-4" />
              Edit packages
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditingPackages ? (
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="provider-card-muted space-y-3 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold text-slate-900">{pkg.name}</h3>
                    <div className="w-full sm:w-36">
                      <Input
                        type="number"
                        className="provider-input"
                        value={pkg.price}
                        onChange={(event) => updatePackagePrice(pkg.id, Number(event.target.value))}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      className="provider-input"
                      placeholder="Add package service"
                      value={newPackageService[pkg.id] || ""}
                      onChange={(event) => setNewPackageService((prev) => ({ ...prev, [pkg.id]: event.target.value }))}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault()
                          addPackageService(pkg.id)
                        }
                      }}
                    />
                    <Button type="button" className="provider-primary-btn" onClick={() => addPackageService(pkg.id)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {pkg.services.map((service) => (
                      <div key={service} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                        <span className="text-slate-700">{service}</span>
                        <button type="button" onClick={() => removePackageService(pkg.id, service)} className="text-rose-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                <Button className="provider-primary-btn" onClick={savePackageChanges}>
                  Save packages
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700" onClick={cancelPackageEdit}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              {savedPackages.map((pkg) => (
                <article key={pkg.id} className={`rounded-xl border p-4 ${packageStyles[pkg.name]}`}>
                  <div className="mb-3 flex items-baseline justify-between">
                    <h3 className="font-semibold text-slate-900">{pkg.name}</h3>
                    <p className="text-lg font-semibold text-slate-900">${pkg.price}</p>
                  </div>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {pkg.services.map((service) => (
                      <li key={service} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="provider-card">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg text-slate-900">Portfolio gallery</CardTitle>
          <label className="cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={addPortfolioImage} />
            <Button type="button" variant="outline" className="border-slate-300 text-slate-700">
              <ImagePlus className="h-4 w-4" />
              Add image
            </Button>
          </label>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {portfolioImages.map((image) => (
              <figure key={image.id} className="group relative overflow-hidden rounded-lg border border-slate-200">
                <img src={image.url || "/placeholder.svg"} alt={image.alt} className="h-36 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePortfolioImage(image.id)}
                  className="absolute right-2 top-2 rounded-full bg-rose-600 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </figure>
            ))}
          </div>
        </CardContent>
      </Card>

      {provider.subscriptionTier !== "Premium" && (
        <Card className="provider-card">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-slate-900">Upgrade your membership</p>
              <p className="text-sm text-slate-600">{upgradeNotes[provider.subscriptionTier]}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="provider-badge gap-1">
                <Info className="h-3.5 w-3.5" />
                {provider.subscriptionTier} tier
              </Badge>
              <Link href="/provider/subscription">
                <Button className="provider-primary-btn">View options</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
