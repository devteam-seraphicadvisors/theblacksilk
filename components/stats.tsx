import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, Calendar, Globe, TrendingUp, Award } from "lucide-react"
import Image from "next/image"

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Active Members",
      description: "Legal professionals, technologists, and policymakers",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
    {
      icon: FileText,
      value: "50+",
      label: "Publications",
      description: "Research papers, white papers, and policy briefs",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-500",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    },
    {
      icon: Calendar,
      value: "25+",
      label: "Events",
      description: "Symposiums, workshops, and collaborative sessions",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
    },
    {
      icon: Globe,
      value: "15+",
      label: "Cities",
      description: "Global reach with local impact across India",
      gradient: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    },
  ]

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23003153' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
            <TrendingUp className="h-4 w-4 text-prussian-blue mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Our Impact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Global Engagements and
            <span className="block text-prussian-blue">Thought Leadership</span>
          </h2>
          <p className="text-xl text-gray-600 text-justify max-w-6xl mx-auto">
            The impact of The Black Silk extends beyond local boundaries. We
            actively engage in global discussions and initiatives to address
            universal issues in the digital world. Through our publications,
            research papers, and consultations, we contribute to the collective
            knowledge base, shedding light on the latest trends, challenges, and
            ethical considerations in digital technology. By providing thought
            leadership, we strive to inspire policymakers, industry leaders, and
            the wider community to adopt ethical practices and ensure the
            responsible development and use of digital technologies. Together,
            we can create a more equitable and inclusive digital ecosystem for
            the benefit of all.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group bg-white"
            >
              {/* Image Header */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={stat.image || "/placeholder.svg"}
                  alt={stat.label}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${stat.gradient} opacity-80`}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6 text-center bg-white">
                <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-prussian-blue transition-colors">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Highlights */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Achievements
            </h3>
            <p className="text-lg text-gray-600">
              Milestones that showcase our community's growth and impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Best Legal Tech Platform 2024",
                description:
                  "Recognized by the Indian Legal Technology Association",
                date: "December 2024",
                color: "text-yellow-600",
                bg: "bg-yellow-50",
              },
              {
                icon: Users,
                title: "500+ Member Milestone",
                description: "Reached our goal of 500 active community members",
                date: "November 2024",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: FileText,
                title: "50th Publication Released",
                description:
                  "Published our 50th research paper on AI in legal practice",
                date: "October 2024",
                color: "text-green-600",
                bg: "bg-green-50",
              },
            ].map((achievement, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 ${achievement.bg} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <achievement.icon
                      className={`h-6 w-6 ${achievement.color}`}
                    />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-gray-500">{achievement.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
