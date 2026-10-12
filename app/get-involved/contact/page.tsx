import { generateMetadata } from "@/lib/seo";
import { generateFAQSchema } from "@/lib/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Building,
} from "lucide-react";
import Image from "next/image";

export const metadata = generateMetadata({
  title: "Contact Us - The Black Silk",
  description:
    "Get in touch with The Black Silk team. We're here to help with your legal technology questions and collaboration opportunities.",
  canonical: "https://theblacksilk.org/get-involved/contact",
});

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: ["info@theblacksilk.org", "partnerships@theblacksilk.org"],
    description: "For general inquiries and partnership opportunities",
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 11 4567 8900", "+91 11 4567 8901"],
    description: "Monday to Friday, 9:00 AM to 6:00 PM IST",
  },
  {
    icon: MapPin,
    title: "Address",
    details: [
      "The Black Silk Foundation",
      "123 Legal Tech Hub, Connaught Place",
      "New Delhi 110001, India",
    ],
    description: "Our headquarters in the heart of New Delhi",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 2:00 PM",
      "Sunday: Closed",
    ],
    description: "We're here to help during business hours",
  },
];

const departments = [
  {
    name: "General Inquiry",
    email: "info@theblacksilk.org",
    description: "General questions and information requests",
  },
  {
    name: "Partnerships",
    email: "partnerships@theblacksilk.org",
    description: "Collaboration and partnership opportunities",
  },
  {
    name: "Events",
    email: "events@theblacksilk.org",
    description: "Event inquiries and speaking opportunities",
  },
  {
    name: "Research",
    email: "research@theblacksilk.org",
    description: "Research collaboration and academic partnerships",
  },
  {
    name: "Media",
    email: "media@theblacksilk.org",
    description: "Press inquiries and media relations",
  },
  {
    name: "Careers",
    email: "careers@theblacksilk.org",
    description: "Job opportunities and career-related questions",
  },
];

const officeLocations = [
  {
    city: "New Delhi",
    address: "123 Legal Tech Hub, Connaught Place, New Delhi 110001",
    phone: "+91 11 4567 8900",
    email: "delhi@theblacksilk.org",
    type: "Headquarters",
    image: "/images/office-delhi.jpg",
  },
  {
    city: "Mumbai",
    address: "456 Innovation Center, Bandra Kurla Complex, Mumbai 400051",
    phone: "+91 22 4567 8900",
    email: "mumbai@theblacksilk.org",
    type: "Regional Office",
    image: "/images/office-mumbai.jpg",
  },
  {
    city: "Bangalore",
    address: "789 Tech Park, Electronic City, Bangalore 560100",
    phone: "+91 80 4567 8900",
    email: "bangalore@theblacksilk.org",
    type: "Research Center",
    image: "/images/office-bangalore.jpg",
  },
];

const faqs = [
  {
    question: "How can I get involved with The Black Silk?",
    answer:
      "There are many ways to get involved! You can join our membership program, attend our events, contribute to our research, or explore career opportunities. Visit our Get Involved section for more details.",
  },
  {
    question: "Do you offer consulting services?",
    answer:
      "Yes, we provide consulting services for legal technology implementation, policy development, and digital transformation. Contact our partnerships team for more information.",
  },
  {
    question: "How can I speak at your events?",
    answer:
      "We welcome expert speakers for our events. Please send your speaker proposal to events@theblacksilk.org with your bio, topic, and relevant experience.",
  },
  {
    question: "Can I collaborate on research projects?",
    answer:
      "We actively seek research collaborations with academics, practitioners, and organizations. Reach out to our research team with your proposal.",
  },
];

export default function ContactPage() {
  const jsonLd = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 bg-black text-white border-b border-neutral-800">
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
                <MessageSquare className="h-3.5 w-3.5 mr-2 text-white" />
                <span>Get in Touch</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                We're here to help with your legal technology questions and
                collaboration opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border border-neutral-200 rounded-none shadow-none text-center group hover:border-black transition-colors"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-black border border-neutral-800 rounded-none flex items-center justify-center mx-auto mb-6 group-hover:bg-neutral-900 transition-colors">
                        <info.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-serif font-normal text-black mb-4">
                        {info.title}
                      </h3>
                      <div className="space-y-2 mb-4">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-neutral-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-neutral-500 text-xs">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24 bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form */}
                <div>
                  <div className="mb-8">
                    <h2 className="text-3xl font-serif font-normal text-black mb-4">
                      Send us a Message
                    </h2>
                    <p className="text-neutral-600">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>
                  </div>

                  <Card className="border border-neutral-200 rounded-none shadow-none">
                    <CardContent className="p-8">
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                              First Name *
                            </label>
                            <Input
                              placeholder="Enter your first name"
                              className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                              Last Name *
                            </label>
                            <Input
                              placeholder="Enter your last name"
                              className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                            Organization
                          </label>
                          <Input
                            placeholder="Your organization or company"
                            className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                            Department *
                          </label>
                          <Select required>
                            <SelectTrigger className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black">
                              <SelectValue placeholder="Select the relevant department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem
                                  key={dept.name}
                                  value={dept.name
                                    .toLowerCase()
                                    .replace(" ", "-")}
                                >
                                  {dept.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                            Subject *
                          </label>
                          <Input
                            placeholder="Brief subject of your inquiry"
                            className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                            Message *
                          </label>
                          <Textarea
                            placeholder="Please provide details about your inquiry..."
                            className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black min-h-[150px]"
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-black hover:bg-neutral-800 !text-white rounded-none font-mono text-xs uppercase tracking-wider"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Departments */}
                <div className="space-y-8">
                  {/* Departments */}
                  <div>
                    <h3 className="text-2xl font-serif font-normal text-black mb-6">
                      Departments
                    </h3>
                    <div className="space-y-4">
                      {departments.map((dept, index) => (
                        <Card
                          key={index}
                          className="border border-neutral-200 rounded-none shadow-none hover:border-black transition-colors"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-black mb-2">
                                  {dept.name}
                                </h4>
                                <p className="text-sm text-neutral-600 mb-3">
                                  {dept.description}
                                </p>
                                <Badge variant="outline" className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider">
                                  {dept.email}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-24 bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                  Our Offices
                </h2>
                <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                  Visit us at our offices across India or connect with us
                  virtually
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {officeLocations.map((office, index) => (
                  <Card
                    key={index}
                    className="border border-neutral-200 rounded-none shadow-none hover:border-black transition-colors overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={office.image || "/placeholder.svg"}
                        alt={`${office.city} Office`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="rounded-none border-black bg-black text-white hover:bg-black font-mono text-[10px] uppercase tracking-wider">
                          {office.type}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-serif font-normal mb-1">
                          {office.city}
                        </h3>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-neutral-700 mt-1 flex-shrink-0" />
                          <p className="text-sm text-neutral-600">
                            {office.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-neutral-700 flex-shrink-0" />
                          <p className="text-sm text-neutral-600">
                            {office.phone}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-neutral-700 flex-shrink-0" />
                          <p className="text-sm text-neutral-600">
                            {office.email}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-none border-black text-black hover:bg-black hover:text-white font-mono text-xs uppercase tracking-wider mt-6"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions (FAQ) */}
        <section className="py-20 lg:py-28 bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                Before You Write
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-black tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-neutral-600 text-base sm:text-lg font-sans">
                Quick answers about getting involved, consulting, speaking at
                our events, and research collaborations.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-neutral-200 bg-white px-6 py-2 rounded-none hover:border-black transition-colors data-[state=open]:border-black"
                >
                  <AccordionTrigger className="text-left font-serif text-lg sm:text-xl font-medium text-black hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed pt-2 pb-6 border-t border-neutral-100">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </>
  );
}
