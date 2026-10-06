import { MessageSquare, Calendar, FileCheck, MapPin } from "lucide-react";

export function Stats() {
  const stats = [
    {
      value: "25",
      label: "Discussions Held",
      description: "Structured stakeholder consultations and policy roundtables",
      icon: MessageSquare,
    },
    {
      value: "5",
      label: "Events Convened",
      description: "National symposiums, forums, and specialized workshops",
      icon: Calendar,
    },
    {
      value: "19",
      label: "Submissions Received",
      description: "Whitepapers, stakeholder feedback, and policy recommendations",
      icon: FileCheck,
    },
    {
      value: "15+",
      label: "Cities",
      description: "Active participation and representation across India",
      icon: MapPin,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-black text-white border-b border-neutral-800">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 border border-neutral-700 bg-neutral-900 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-4">
            Since our founding
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-normal text-white mb-6">
            Measurable National Impact
          </h2>
          <p className="!text-neutral-200 text-lg font-light leading-relaxed">
            Bringing together India's legal practitioners, policy architects, and
            technology leaders through structured dialogue and evidence-based
            recommendations.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-neutral-950 border border-neutral-800 p-8 text-center flex flex-col justify-between hover:border-white transition-colors duration-300 group"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-12 h-12 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center group-hover:border-white transition-colors">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-serif font-normal text-white mb-3 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-base font-medium !text-neutral-200 mb-2 uppercase tracking-wider text-xs font-mono">
                    {stat.label}
                  </div>
                  <div className="text-sm !text-neutral-200 leading-relaxed font-sans">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
