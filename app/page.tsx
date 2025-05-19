"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, FlameIcon as Fire, Menu, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("latest")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Refs for scroll functionality
  const topStoriesRef = useRef<HTMLDivElement>(null)
  const regionalRef = useRef<HTMLDivElement>(null)
  const opinionRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Function to handle smooth scrolling
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setMobileMenuOpen(false)
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const imageData = [
  { location: "Kathmandu", label: "Kathmandu Durbar Square", src: "/10.jpeg" },
  { location: "Everest", label: "Mount Everest Base Camp", src: "/11.jpg" },
  { location: "Pokhara", label: "Phewa Lake, Pokhara", src: "/12.jpeg" },
  { location: "Chitwan", label: "Chitwan National Park", src: "/13.jpg" },
];

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      // In a real app, you would fetch search results here
      setTimeout(() => {
        setIsSearching(false)
        alert(`Searching for: ${searchQuery}`)
        setSearchQuery("")
      }, 1000)
    }
  }

  // Breaking news ticker animation
  useEffect(() => {
    const ticker = document.getElementById("news-ticker")
    if (ticker) {
      const tickerWidth = ticker.offsetWidth
      const animationDuration = tickerWidth / 50 // Adjust speed based on width
      ticker.style.animation = `scroll ${animationDuration}s linear infinite`
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#222222] bg-black shadow-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-red-900/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="text-xl font-bold tracking-tighter">
                 <Image
                  src="/logo.png"
                  alt="logo"
                  width={120}
                  height={120}
                  className="object-cover transition-transform "
                />
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex md:gap-6">
            <button
              onClick={() => scrollToSection({ current: document.getElementById("top") })}
              className="text-sm font-medium hover:text-red-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection(topStoriesRef)}
              className="text-sm font-medium hover:text-red-700 transition-colors"
            >
              Top Stories
            </button>
            <button
              onClick={() => scrollToSection(regionalRef)}
              className="text-sm font-medium hover:text-red-700 transition-colors"
            >
              Regional
            </button>
            <button
              onClick={() => scrollToSection(galleryRef)}
              className="text-sm font-medium hover:text-red-700 transition-colors"
            >
              Gallery
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <form className="hidden md:block" onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search news..."
                  className="w-[200px] bg-gray-900 pl-8 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:ring-red-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-700 hover:bg-red-900/20 md:hidden"
              onClick={() => setIsSearching(!isSearching)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-[#222222] py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection({ current: document.getElementById("top") })}
                className="text-sm font-medium hover:text-red-700 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection(topStoriesRef)}
                className="text-sm font-medium hover:text-red-700 transition-colors"
              >
                Top Stories
              </button>
              <button
                onClick={() => scrollToSection(regionalRef)}
                className="text-sm font-medium hover:text-red-700 transition-colors"
              >
                Regional
              </button>
              <button
                onClick={() => scrollToSection(opinionRef)}
                className="text-sm font-medium hover:text-red-700 transition-colors"
              >
                Opinion
              </button>
              <button
                onClick={() => scrollToSection(galleryRef)}
                className="text-sm font-medium hover:text-red-700 transition-colors"
              >
                Gallery
              </button>
            </nav>
          </div>
        )}

        {/* Mobile search */}
        {isSearching && (
          <div className="md:hidden bg-black border-b border-[#222222] py-4 px-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search news..."
                  className="w-full bg-gray-900 pl-8 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:ring-red-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Breaking News Banner */}
      <div className="bg-red-700 py-3 px-4">
        <div className="container flex items-center gap-3 overflow-hidden">
          <Badge variant="outline" className="shrink-0 border-black bg-white text-red-500 px-3 py-1 text-sm font-bold">
            BREAKING
          </Badge>
          <div className="overflow-hidden whitespace-nowrap">
            <p id="news-ticker" className="inline-block whitespace-nowrap text-sm font-medium text-white">
              Nepal's Prime Minister announces new economic reforms • Heavy rainfall expected in eastern regions •
              National football team advances to semifinals • Government unveils new infrastructure plan • International
              aid arrives for flood victims in southern districts • Nepal's Prime Minister announces new economic
              reforms • Heavy rainfall expected in eastern regions • National football team advances to semifinals
            </p>
          </div>
        </div>
      </div>

      <main id="top" className="container px-4 py-6 md:px-6 md:py-8">
        {/* Featured News */}
        <section className="mb-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full overflow-hidden rounded-xl border-0 bg-[#111111] lg:col-span-2 hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/1.jpg"
                  alt="Featured news"
                  width={1200}
                  height={600}
                  className="object-cover transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 p-4 md:p-6">
                  <Badge className="mb-2 bg-red-700 hover:bg-red-800">Politics</Badge>
                  <h1 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
                    Nepal Parliament Passes Historic Infrastructure Bill
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="h-4 w-4" />
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <p className="text-gray-400">
                  The bill aims to modernize Nepal's infrastructure with a focus on sustainable development and
                  earthquake-resistant construction techniques. It includes provisions for new highways, bridges, and
                  public transportation systems.
                </p>
                <Button className="mt-4 bg-red-700 hover:bg-red-800">Read More</Button>
              </div>
            </Card>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              <Card className="overflow-hidden rounded-xl border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src="/2.jpeg"
                    alt="Economy news"
                    width={600}
                    height={300}
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 p-4">
                    <Badge className="mb-2 bg-red-700 hover:bg-red-800">Economy</Badge>
                    <h2 className="mb-2 text-lg font-bold">Nepal's Currency Strengthens Against US Dollar</h2>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Clock className="h-3 w-3" />
                      <span>5 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-400">
                    Economic experts attribute the strengthening to increased remittances and foreign investment in the
                    tourism sector.
                  </p>
                  <Button className="mt-3 bg-red-700 hover:bg-red-800 text-sm">Read More</Button>
                </div>
              </Card>
              <Card className="overflow-hidden rounded-xl border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src="/3.jpg"
                    alt="Sports news"
                    width={600}
                    height={300}
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 p-4">
                    <Badge className="mb-2 bg-red-700 hover:bg-red-800">Sports</Badge>
                    <h2 className="mb-2 text-lg font-bold">National Cricket Team Secures Victory in Asian Cup</h2>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Clock className="h-3 w-3" />
                      <span>8 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-400">
                    The team's outstanding performance has sparked celebrations across the country as they advance to
                    the finals.
                  </p>
                  <Button className="mt-3 bg-red-700 hover:bg-red-800 text-sm">Read More</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* News Categories */}
        <section ref={topStoriesRef} className="mb-10 scroll-mt-20">
          <Tabs defaultValue="latest" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Stories</h2>
              <TabsList className="bg-gray-900">
                <TabsTrigger value="latest" className="data-[state=active]:bg-red-700">
                  Latest
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="latest" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="/4.jpg"
                      alt="Tourism news"
                      width={400}
                      height={200}
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-transparent text-red-700 border-red-700">
                        Tourism
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mt-2">
                      Nepal's Tourism Industry Shows Strong Recovery Post-Pandemic
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-400">
                      Tourism numbers have increased by 45% compared to last year, bringing economic benefits to local
                      communities and boosting the hospitality sector.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center border-t border-[#222222]">
                    <Button className="text-xs font-medium text-white bg-red-700 hover:bg-red-800">
                      Read Full Story
                    </Button>
                    <div className="flex items-center gap-1">
                      <Fire className="h-3 w-3 text-red-700" />
                      <span className="text-xs">245 reads</span>
                    </div>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="/5.jpeg"
                      alt="Politics news"
                      width={400}
                      height={200}
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-transparent text-red-700 border-red-700">
                        Politics
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>3 hours ago</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mt-2">
                      Prime Minister Announces Cabinet Reshuffle Amid Policy Changes
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-400">
                      Three key ministries will see new leadership as the government pivots to focus on economic
                      development and infrastructure projects.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center border-t border-[#222222]">
                    <Button className="text-xs font-medium text-white bg-red-700 hover:bg-red-800">
                      Read Full Story
                    </Button>
                    <div className="flex items-center gap-1">
                      <Fire className="h-3 w-3 text-red-700" />
                      <span className="text-xs">312 reads</span>
                    </div>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="/6.jpeg"
                      alt="Health news"
                      width={400}
                      height={200}
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-transparent text-red-700 border-red-700">
                        Health
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>5 hours ago</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mt-2">
                      New Medical Facility Opens in Kathmandu with Advanced Technology
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-400">
                      The state-of-the-art hospital features the latest medical equipment and aims to reduce the need
                      for citizens to seek treatment abroad.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center border-t border-[#222222]">
                    <Button className="text-xs font-medium text-white bg-red-700 hover:bg-red-800">
                      Read Full Story
                    </Button>
                    <div className="flex items-center gap-1">
                      <Fire className="h-3 w-3 text-red-700" />
                      <span className="text-xs">187 reads</span>
                    </div>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="/7.png"
                      alt="Education news"
                      width={400}
                      height={200}
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-transparent text-red-700 border-red-700">
                        Education
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>6 hours ago</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mt-2">
                      Government Launches Digital Education Initiative for Rural Schools
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-400">
                      The program will provide tablets and internet access to over 500 schools in remote areas,
                      benefiting thousands of students.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center border-t border-[#222222]">
                    <Button className="text-xs font-medium text-white bg-red-700 hover:bg-red-800">
                      Read Full Story
                    </Button>
                    <div className="flex items-center gap-1">
                      <Fire className="h-3 w-3 text-red-700" />
                      <span className="text-xs">156 reads</span>
                    </div>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="/8.webp"
                      alt="Environment news"
                      width={400}
                      height={200}
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-transparent text-red-700 border-red-700">
                        Environment
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>8 hours ago</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mt-2">
                      Nepal Commits to Ambitious Carbon Neutrality Goals by 2045
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-400">
                      The plan includes major investments in renewable energy, forest conservation, and sustainable
                      transportation infrastructure.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center border-t border-[#222222]">
                    <Button className="text-xs font-medium text-white bg-red-700 hover:bg-red-800">
                      Read Full Story
                    </Button>
                    <div className="flex items-center gap-1">
                      <Fire className="h-3 w-3 text-red-700" />
                      <span className="text-xs">142 reads</span>
                    </div>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="/9.jpeg"
                      alt="Technology news"
                      width={400}
                      height={200}
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-transparent text-red-700 border-red-700">
                        Technology
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>10 hours ago</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mt-2">
                      Nepali Tech Startup Secures $5 Million in International Funding
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-400">
                      The Kathmandu-based company specializes in AI solutions for agriculture and will use the funding
                      to expand operations across South Asia.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center border-t border-[#222222]">
                    <Button className="text-xs font-medium text-white bg-red-700 hover:bg-red-800">
                      Read Full Story
                    </Button>
                    <div className="flex items-center gap-1">
                      <Fire className="h-3 w-3 text-red-700" />
                      <span className="text-xs">203 reads</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

           
           
          </Tabs>
        </section>

        {/* Newsletter Subscription */}
        <section className="mb-10">
          <div className="rounded-xl bg-gradient-to-r from-red-900 to-red-700 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="mb-2 text-2xl font-bold">Stay Updated with Nepal's Latest News</h2>
                <p className="mb-4 text-gray-200">
                  Subscribe to our newsletter and never miss important updates from across Nepal.
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <form
                  className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.target as HTMLFormElement
                    const email = (form.elements[0] as HTMLInputElement).value
                    if (email) {
                      alert(`Thank you for subscribing with: ${email}`)
                      form.reset()
                    }
                  }}
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 text-white placeholder:text-gray-300 focus-visible:ring-white border-white/50"
                    required
                  />
                  <Button type="submit" className="bg-white text-red-700 hover:bg-gray-200">
                    Subscribe
                  </Button>
                </form>
                <p className="mt-2 text-xs text-gray-200">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Regional News Section */}
        <section ref={regionalRef} className="mb-10 scroll-mt-20">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Regional Updates</h2>
            <Button variant="link" className="text-sm font-medium text-red-700 hover:text-red-600 p-0">
              View All Regions
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="overflow-hidden border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-4 border-b border-[#222222]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-red-700">Kathmandu Valley</h3>
                  <Badge className="bg-red-700">Capital</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  <li className="border-b border-[#222222] pb-3">
                    <button
                      className="hover:text-red-500 text-left w-full"
                      onClick={() => alert("Opening article: Traffic management plan implemented in key intersections")}
                    >
                      <span className="text-sm font-medium">
                        Traffic management plan implemented in key intersections
                      </span>
                    </button>
                    <p className="mt-1 text-xs text-gray-400">3 hours ago</p>
                  </li>
                  <li className="border-b border-[#222222] pb-3">
                    <button
                      className="hover:text-red-500 text-left w-full"
                      onClick={() => alert("Opening article: Cultural heritage sites see increase in local tourists")}
                    >
                      <span className="text-sm font-medium">
                        Cultural heritage sites see increase in local tourists
                      </span>
                    </button>
                    <p className="mt-1 text-xs text-gray-400">5 hours ago</p>
                  </li>
                  <li>
                    <button
                      className="hover:text-red-500 text-left w-full"
                      onClick={() => alert("Opening article: New water supply project to benefit 30,000 households")}
                    >
                      <span className="text-sm font-medium">New water supply project to benefit 30,000 households</span>
                    </button>
                    <p className="mt-1 text-xs text-gray-400">8 hours ago</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-4 border-b border-[#222222]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-red-700">Pokhara</h3>
                  <Badge className="bg-red-700">Tourism</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  <li className="border-b border-[#222222] pb-3">
                    <button
                      className="hover:text-red-500 text-left w-full"
                      onClick={() => alert("Opening article: Record number of tourists visit Phewa Lake this month")}
                    >
                      <span className="text-sm font-medium">Record number of tourists visit Phewa Lake this month</span>
                    </button>
                    <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                  </li>
                  <li className="border-b border-[#222222] pb-3">
                    <button
                      className="hover:text-red-500 text-left w-full"
                      onClick={() => alert("Opening article: New paragliding routes approved by aviation authority")}
                    >
                      <span className="text-sm font-medium">New paragliding routes approved by aviation authority</span>
                    </button>
                    <p className="mt-1 text-xs text-gray-400">6 hours ago</p>
                  </li>
                  <li>
                    <button
                      className="hover:text-red-500 text-left w-full"
                      onClick={() => alert("Opening article: Local businesses report 40% increase in revenue")}
                    >
                      <span className="text-sm font-medium">Local businesses report 40% increase in revenue</span>
                    </button>
                    <p className="mt-1 text-xs text-gray-400">10 hours ago</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-0 bg-[#111111] hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-4 border-b border-[#222222]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-red-700">Eastern Nepal</h3>
                  <Badge className="bg-red-700">Agriculture</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  <li className="border-b border-[#222222] pb-3">
                    <button
                      className="hover:text-red-500 text-left w-full"
                      onClick={() => alert("Opening article: Tea exports reach all-time high in first quarter")}
                    >
                      <span className="text-sm font-medium">Tea exports reach all-time high in first quarter</span>
                    </button>
                    <p className="mt-1 text-xs text-gray-400">4 hours ago</p>
                  </li>
                  <li className="border-b border-[#222222] pb-3">
                    <button
                      className="hover:text-red-500 text-left w-full"
                      onClick={() => alert("Opening article: New agricultural techniques boost crop yields by 25%")}
                    >
                      <span className="text-sm font-medium">New agricultural techniques boost crop yields by 25%</span>
                    </button>
                    <p className="mt-1 text-xs text-gray-400">7 hours ago</p>
                  </li>
                  <li>
                    <button
                      className="hover:text-red-500 text-left w-full"
                      onClick={() => alert("Opening article: Government subsidies help small-scale farmers")}
                    >
                      <span className="text-sm font-medium">Government subsidies help small-scale farmers</span>
                    </button>
                    <p className="mt-1 text-xs text-gray-400">12 hours ago</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>


        {/* Photo Gallery Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {imageData.map(({ location, label, src }) => (
    <div
      key={location}
      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
      onClick={() => alert(`Opening full-size image of ${location}`)}
    >
      <Image
        src={src}
        alt={location}
        fill
        className="object-cover transition-transform hover:scale-105 duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 p-3">
        <p className="text-sm font-medium text-white">{label}</p>
      </div>
    </div>
  ))}
</div>



        {/* Popular Tags Section */}
        <section className="mb-10">
          <h2 className="mb-6 text-2xl font-bold">Popular Topics</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "#NepalPolitics", featured: true },
              { name: "#Tourism", featured: false },
              { name: "#MountEverest", featured: false },
              { name: "#NepalEconomy", featured: false },
              { name: "#COVID19", featured: true },
              { name: "#Agriculture", featured: false },
              { name: "#Education", featured: false },
              { name: "#NepalCricket", featured: true },
              { name: "#Infrastructure", featured: false },
              { name: "#ClimateChange", featured: false },
            ].map((tag) => (
              <button
                key={tag.name}
                className={`rounded-full ${
                  tag.featured ? "bg-red-900 hover:bg-red-800" : "bg-gray-800 hover:bg-gray-700"
                } px-4 py-2 text-sm font-medium text-white transition-colors`}
                onClick={() => alert(`Searching for topic: ${tag.name}`)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
 
    <footer className="border-t border-[#222222] bg-black py-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo & Socials */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="text-xl font-bold tracking-tighter">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={120}
                  height={120}
                  className="object-cover transition-transform"
                />
              </div>
            </Link>
            <p className="mb-4 text-sm text-gray-400">
              Your trusted source for the latest news and updates from Nepal, delivered 24/7.
            </p>
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61559843632740"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:bg-red-900/20 p-2 rounded-full transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Twitter */}
             <a
  href="https://www.tiktok.com/@nepalinlast24hour_?_t=ZS-8wTnAoO2E6b&_r=1"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-white hover:bg-red-900/20 p-2 rounded-full transition-colors"
>
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 0h4a8 8 0 01-8 8v8a4 4 0 11-4-4h0V8a8 8 0 108 8V8a12 12 0 004 0V4a8 8 0 01-4 0V0z" />
  </svg>
</a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/nepalinlast24hours/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:bg-red-900/20 p-2 rounded-full transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Categories</h3>
            <ul className="space-y-2 text-sm">
              {["Politics", "Economy", "Sports", "Entertainment", "Technology", "Health"].map((category) => (
                <li key={category}>
                  <button
                    className="text-gray-400 hover:text-red-700 transition-colors"
                    onClick={() => alert(`Opening ${category} category`)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "About Us", action: "Opening About Us page" },
                { name: "Contact Us", action: "Opening Contact Us page" },
                { name: "Advertise", action: "Opening Advertise page" },
                { name: "Privacy Policy", action: "Opening Privacy Policy page" },
                { name: "Terms of Service", action: "Opening Terms of Service page" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    className="text-gray-400 hover:text-red-700 transition-colors"
                    onClick={() => alert(link.action)}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>
            <address className="not-italic">
              <p className="mb-2 text-sm text-gray-400">Kathmandu, Nepal</p>
              <p className="mb-2 text-sm text-gray-400">Email: nepalinlast24hour@gmail.com</p>
              <p className="mb-4 text-sm text-gray-400">Phone: +977 9763487935</p>
            </address>
        <a
  href="https://wa.me/9779763487935?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
>
  Contact Us
</a>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-[#222222] pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Nepal in Last 24 Hour. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    </div>
  )
}
