import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/902919321?background=1&autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&playsinline=1"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Background video"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-black/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          Empowering
          <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            A Digital Future
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
          Connect with legal professionals, access exclusive research, attend
          premium events, and shape the future of law and technology in India.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 shadow-2xl hover:shadow-white/20 transition-all duration-300 rounded-xl px-8 py-4 font-semibold text-lg"
            asChild
          >
            <Link href="/community/membership">
              Start Your Membership
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all duration-300 rounded-xl px-8 py-4 font-semibold text-lg bg-transparent"
            asChild
          >
            <Link href="/about">
              <Play className="mr-2 h-5 w-5" />
              Learn More
            </Link>
          </Button>
        </div>

        {/* Stats/Features */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">5,000+</h3>
            <p className="text-gray-300">Active Members</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">200+</h3>
            <p className="text-gray-300">Research Papers</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
            <p className="text-gray-300">Events Annually</p>
          </div>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
