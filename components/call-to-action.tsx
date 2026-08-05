import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CallToAction() {
  return (
    <section className="py-20 lg:py-32 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop"
          alt="Legal technology conference"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gray-900/80" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Ready to Shape the Future of{" "}
              <span className="text-prussian-blue">Legal Technology?</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Join our community of forward-thinking legal professionals,
              technologists, and policymakers who are transforming the legal
              landscape through innovation and collaboration.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 bg-prussian-blue rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">
                  Exclusive Networking
                </div>
                <div className="text-sm text-gray-300">
                  Connect with industry leaders
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">Premium Events</div>
                <div className="text-sm text-gray-300">
                  Access to exclusive conferences
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link href="/community/membership">
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-gray-900 hover:bg-white hover:text-gray-900"
              asChild
            >
              <Link href="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
