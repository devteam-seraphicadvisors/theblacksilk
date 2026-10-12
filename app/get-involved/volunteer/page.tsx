import { generateMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Heart,
  Users,
  Clock,
  Award,
  BookOpen,
  Code,
  Megaphone,
  Camera,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = generateMetadata({
  title: "Volunteer Opportunities - The Black Silk",
  description:
    "Make a difference in legal technology. Explore volunteer opportunities and contribute to our mission of transforming legal practice.",
  canonical: "https://theblacksilk.org/get-involved/volunteer",
});

const volunteerRoles = [
  {
    id: 1,
    title: "Content Writer & Researcher",
    category: "Content",
    commitment: "5-10 hours/week",
    location: "Remote",
    description:
      "Help create compelling content for our blog, research papers, and educational materials on legal technology topics.",
    responsibilities: [
      "Write blog posts and articles on legal tech topics",
      "Conduct research for white papers and reports",
      "Edit and proofread content for accuracy",
      "Collaborate with subject matter experts",
    ],
    skills: [
      "Excellent writing skills",
      "Research abilities",
      "Legal background preferred",
      "Attention to detail",
    ],
    icon: BookOpen,
    color: "emerald",
    featured: true,
  },
  {
    id: 2,
    title: "Event Coordinator",
    category: "Events",
    commitment: "10-15 hours/week",
    location: "Hybrid",
    description:
      "Support our events team in organizing symposiums, workshops, and networking events across India.",
    responsibilities: [
      "Assist in event planning and coordination",
      "Manage event registrations and communications",
      "Coordinate with speakers and vendors",
      "Support on-site event execution",
    ],
    skills: [
      "Event management experience",
      "Strong organizational skills",
      "Communication skills",
      "Team player",
    ],
    icon: Users,
    color: "gold",
    featured: true,
  },
  {
    id: 3,
    title: "Web Developer",
    category: "Technology",
    commitment: "8-12 hours/week",
    location: "Remote",
    description:
      "Contribute to our digital platforms and help build tools that support the legal technology community.",
    responsibilities: [
      "Develop and maintain website features",
      "Build interactive tools and resources",
      "Optimize user experience and performance",
      "Collaborate with design and content teams",
    ],
    skills: [
      "Web development (React, Next.js)",
      "UI/UX design understanding",
      "Version control (Git)",
      "Problem-solving",
    ],
    icon: Code,
    color: "navy",
    featured: false,
  },
  {
    id: 4,
    title: "Social Media Manager",
    category: "Marketing",
    commitment: "6-8 hours/week",
    location: "Remote",
    description:
      "Manage our social media presence and help amplify our message across various digital platforms.",
    responsibilities: [
      "Create and schedule social media content",
      "Engage with community members online",
      "Monitor social media analytics",
      "Develop social media strategies",
    ],
    skills: [
      "Social media expertise",
      "Content creation",
      "Analytics tools",
      "Creative thinking",
    ],
    icon: Megaphone,
    color: "emerald",
    featured: false,
  },
  {
    id: 5,
    title: "Video Content Creator",
    category: "Media",
    commitment: "5-10 hours/week",
    location: "Remote/On-site",
    description:
      "Create engaging video content for our events, educational series, and promotional materials.",
    responsibilities: [
      "Film and edit event highlights",
      "Create educational video content",
      "Manage video production workflow",
      "Collaborate with marketing team",
    ],
    skills: [
      "Video editing software",
      "Camera operation",
      "Storytelling",
      "Creative vision",
    ],
    icon: Camera,
    color: "gold",
    featured: false,
  },
  {
    id: 6,
    title: "Community Moderator",
    category: "Community",
    commitment: "4-6 hours/week",
    location: "Remote",
    description:
      "Help moderate our online forums and communities, ensuring productive discussions and member engagement.",
    responsibilities: [
      "Monitor forum discussions",
      "Facilitate community engagement",
      "Respond to member inquiries",
      "Enforce community guidelines",
    ],
    skills: [
      "Communication skills",
      "Conflict resolution",
      "Legal tech interest",
      "Patience and empathy",
    ],
    icon: Heart,
    color: "navy",
    featured: false,
  },
];

const volunteerBenefits = [
  {
    icon: Award,
    title: "Recognition & Certificates",
    description:
      "Receive certificates and recognition for your contributions to the legal tech community",
  },
  {
    icon: BookOpen,
    title: "Skill Development",
    description:
      "Gain valuable experience and develop new skills in legal technology and related fields",
  },
  {
    icon: Users,
    title: "Networking Opportunities",
    description:
      "Connect with legal professionals, technologists, and thought leaders in the industry",
  },
  {
    icon: Heart,
    title: "Make an Impact",
    description:
      "Contribute to meaningful change in the legal system and help shape the future of law",
  },
];

const volunteerStats = [
  { label: "Active Volunteers", value: "150+", icon: Users },
  { label: "Hours Contributed", value: "5,000+", icon: Clock },
  { label: "Projects Completed", value: "50+", icon: Award },
  { label: "Satisfaction Rate", value: "96%", icon: Heart },
];

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Content Writer Volunteer",
    content:
      "Volunteering with The Black Silk has been incredibly rewarding. I've learned so much about legal technology while contributing to meaningful research.",
    image: "/images/volunteer-ananya.jpg",
    duration: "8 months",
  },
  {
    name: "Rajesh Kumar",
    role: "Event Coordinator Volunteer",
    content:
      "The experience of organizing events with The Black Silk has enhanced my project management skills and expanded my professional network significantly.",
    image: "/images/volunteer-rajesh.jpg",
    duration: "1 year",
  },
  {
    name: "Priya Patel",
    role: "Web Developer Volunteer",
    content:
      "Contributing to The Black Silk's digital platforms has allowed me to work on impactful projects while developing my technical skills.",
    image: "/images/volunteer-priya.jpg",
    duration: "6 months",
  },
];

export default function VolunteerPage() {
  const featuredRoles = volunteerRoles.filter((role) => role.featured);
  const regularRoles = volunteerRoles.filter((role) => !role.featured);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Heart className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Make a Difference</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Volunteer with Us
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Join our community of passionate volunteers and help transform the
              future of legal technology in India
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Stats */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {volunteerStats.map((stat, index) => (
                <Card
                  key={index}
                  className="border border-neutral-200 rounded-none shadow-none text-center group hover:border-black transition-colors"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-black border border-neutral-800 rounded-none flex items-center justify-center mx-auto mb-6 group-hover:bg-neutral-900 transition-colors">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-serif font-normal text-black mb-2">
                      {stat.value}
                    </div>
                    <div className="text-neutral-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Volunteer Roles */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Featured Opportunities
              </h2>
              <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                High-impact volunteer roles that are currently in high demand
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredRoles.map((role) => (
                <Card
                  key={role.id}
                  className="border border-neutral-200 rounded-none shadow-none hover:border-black transition-colors group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="rounded-none border-black bg-black text-white hover:bg-black font-mono text-[10px] uppercase tracking-wider">
                        Featured
                      </Badge>
                      <Badge variant="outline" className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider">{role.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 bg-black border border-neutral-800 rounded-none flex items-center justify-center group-hover:bg-neutral-900 transition-colors`}
                      >
                        <role.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-serif font-normal text-black group-hover:text-neutral-700 transition-colors">
                          {role.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-neutral-500 mt-1">
                          <span>{role.commitment}</span>
                          <span>•</span>
                          <span>{role.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-600 leading-relaxed">
                      {role.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-6">
                      <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-700 mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {role.responsibilities
                          .slice(0, 3)
                          .map((responsibility, index) => (
                            <li
                              key={index}
                              className="text-sm text-neutral-600 flex items-start"
                            >
                              <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0" />
                              {responsibility}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-700 mb-3">
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.slice(0, 3).map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {role.skills.length > 3 && (
                          <Badge variant="outline" className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider">
                            +{role.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-black hover:bg-neutral-800 !text-white rounded-none font-mono text-xs uppercase tracking-wider"
                      asChild
                    >
                      <Link href={`#apply-${role.id}`}>
                        Apply for This Role
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Volunteer Roles */}
      <section className="py-24 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-normal text-black mb-12">
              All Volunteer Opportunities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularRoles.map((role) => (
                <Card
                  key={role.id}
                  className="border border-neutral-200 rounded-none shadow-none hover:border-black transition-colors group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 bg-black border border-neutral-800 rounded-none flex items-center justify-center group-hover:bg-neutral-900 transition-colors`}
                      >
                        <role.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <Badge variant="outline" className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider mb-1">
                          {role.category}
                        </Badge>
                        <h3 className="text-lg font-serif font-normal text-black group-hover:text-neutral-700 transition-colors">
                          {role.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                      {role.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                      <span>{role.commitment}</span>
                      <span>{role.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {role.skills.slice(0, 2).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {role.skills.length > 2 && (
                        <Badge variant="outline" className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider">
                          +{role.skills.length - 2}
                        </Badge>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full rounded-none border-black text-black hover:bg-black hover:text-white font-mono text-xs uppercase tracking-wider"
                      asChild
                    >
                      <Link href={`#apply-${role.id}`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Why Volunteer with Us?
              </h2>
              <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                Discover the benefits of joining our volunteer community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {volunteerBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border border-neutral-200 rounded-none shadow-none text-center group hover:border-black transition-colors"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-black border border-neutral-800 rounded-none flex items-center justify-center mx-auto mb-6 group-hover:bg-neutral-900 transition-colors">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-serif font-normal text-black mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-white border-b border-neutral-200" id="apply">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Apply to Volunteer
              </h2>
              <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                Ready to make a difference? Fill out the application form below
              </p>
            </div>

            <Card className="border border-neutral-200 rounded-none shadow-none">
              <CardContent className="p-8 md:p-12">
                <form className="space-y-8">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                        Current Occupation
                      </label>
                      <Input
                        placeholder="Your current job or student status"
                        className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                        Organization
                      </label>
                      <Input
                        placeholder="Your current organization or university"
                        className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black"
                      />
                    </div>
                  </div>

                  {/* Volunteer Preferences */}
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                      Preferred Volunteer Role *
                    </label>
                    <Select required>
                      <SelectTrigger className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black">
                        <SelectValue placeholder="Select your preferred volunteer role" />
                      </SelectTrigger>
                      <SelectContent>
                        {volunteerRoles.map((role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.title} - {role.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                      Time Commitment *
                    </label>
                    <Select required>
                      <SelectTrigger className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black">
                        <SelectValue placeholder="How much time can you commit per week?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-4">2-4 hours per week</SelectItem>
                        <SelectItem value="5-8">5-8 hours per week</SelectItem>
                        <SelectItem value="9-12">
                          9-12 hours per week
                        </SelectItem>
                        <SelectItem value="13+">13+ hours per week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                      Relevant Skills and Experience
                    </label>
                    <Textarea
                      placeholder="Describe your relevant skills, experience, and qualifications..."
                      className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black min-h-[120px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2">
                      Why do you want to volunteer with us? *
                    </label>
                    <Textarea
                      placeholder="Tell us about your motivation and what you hope to achieve..."
                      className="rounded-none border-neutral-300 focus:ring-black focus-visible:ring-black min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-4">
                      Availability (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        "Weekday Mornings",
                        "Weekday Afternoons",
                        "Weekday Evenings",
                        "Weekends",
                      ].map((time) => (
                        <div key={time} className="flex items-center space-x-2">
                          <Checkbox className="rounded-none border-black data-[state=checked]:bg-black data-[state=checked]:text-white" id={time.toLowerCase().replace(" ", "-")} />
                          <label
                            htmlFor={time.toLowerCase().replace(" ", "-")}
                            className="text-sm text-neutral-600 cursor-pointer"
                          >
                            {time}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-black hover:bg-neutral-800 !text-white rounded-none font-mono text-sm uppercase tracking-wider py-4 h-auto"
                  >
                    Submit Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-sm text-neutral-500 text-center">
                    We'll review your application and get back to you within 1-2
                    weeks.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Volunteer Stories
              </h2>
              <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                Hear from our volunteers about their experiences and impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border border-neutral-200 rounded-none shadow-none text-center"
                >
                  <CardContent className="p-8">
                    <div className="relative w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <blockquote className="text-neutral-600 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="mb-4">
                      <p className="font-medium text-black">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {testimonial.role}
                      </p>
                    </div>
                    <Badge variant="outline" className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider">
                      Volunteering for {testimonial.duration}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
