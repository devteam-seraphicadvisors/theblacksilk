import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Link2, Zap } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Most Trusted",
    description:
      "The Black Silk is the most trusted forum for open and frank discussions on the future of global technologies.",
    link: "READ MORE",
  },
  {
    icon: Link2,
    title: "Our Mission",
    description:
      "The Black Silk brings to the fore difficult problems in implementation of digital technologies and try to find amenable solutions by inclusive discussion.",
    link: "READ MORE",
  },
  {
    icon: Zap,
    title: "World Wide",
    description:
      "The Black Silk call attention to questions around technological development for discussion at its global forum.",
    link: "READ MORE",
  },
]

export function FeatureCards() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black text-white border-0 hover:bg-gray-900 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <feature.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <Button variant="ghost" className="text-white hover:text-gray-300 p-0 h-auto font-medium tracking-wide">
                  {feature.link} →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
