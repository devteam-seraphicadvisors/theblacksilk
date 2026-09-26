"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	Twitter,
	Facebook,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	ArrowRight,
	X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function Footer() {
	const pathname = usePathname();

	// Don't render footer on dashboard pages, admin pages, or maintenance page
	if (
		pathname.startsWith("/dashboard") ||
		pathname.startsWith("/admin") ||
		pathname.startsWith("/maintenance") ||
		process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"
	) {
		return null;
	}

	return (
		<footer className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
			<div className="container-responsive py-12 lg:py-16">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
					{/* Brand & Description */}
					<div className="sm:col-span-2 lg:col-span-1 space-y-6">
						<Link href="/" className="flex items-center space-x-3">
							{/* Use the icon version of the logo if available for a tighter footer layout */}
							<img
								src="/images/logo-icon.png"
								alt="The Black Silk Logo"
								className="h-10 w-auto invert"
							/>
						</Link>
						<p className="text-white/80 leading-relaxed text-sm lg:text-base max-w-sm">
							India's premier platform for fostering dialogue between legal
							professionals, technologists, and policymakers.
						</p>
						<div className="flex space-x-3">
							<Link
								href="https://x.com/TheBlackSilk"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="The Black Silk on Twitter"
								title="Twitter"
							>
								<Button
									variant="ghost"
									size="icon"
									className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
								>
									<Image
										src="/icons/x.svg"
										alt="Twitter"
										width={24}
										height={24}
										// white
										className="invert"
									/>
								</Button>
							</Link>

							<Link
								href="https://www.facebook.com/TheBlackSilk.org"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="The Black Silk on Facebook"
								title="Facebook"
							>
								<Button
									variant="ghost"
									size="icon"
									className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
								>
									<Image
										src="/icons/facebook.svg"
										alt="Facebook"
										width={24}
										height={24}
										className="invert"
									/>
								</Button>
							</Link>

							<Link
								href="https://www.linkedin.com/company/the-black-silk"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="The Black Silk on LinkedIn"
								title="LinkedIn"
							>
								<Button
									variant="ghost"
									size="icon"
									className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
								>
									<Image
										src="/icons/linkedin.svg"
										alt="LinkedIn"
										width={24}
										height={24}
										className="invert"
									/>
								</Button>
							</Link>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="font-semibold text-lg lg:text-xl tracking-wide">
							Platform
						</h3>
						<ul className="space-y-3">
							{[
								{ name: "About Us", href: "/about" },
								{ name: "Membership", href: "/community/membership" },
								{ name: "Committees", href: "/community/committees" },
								{ name: "Events", href: "/events" },
								{ name: "Forum", href: "/forum" },
							].map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base group flex items-center"
									>
										{link.name}
										<ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources */}
					<div className="space-y-4">
						<h3 className="font-semibold text-lg lg:text-xl tracking-wide">
							Resources
						</h3>
						<ul className="space-y-3">
							{[
								{ name: "Insights", href: "/knowledge-hub/blog" },
								{ name: "Publications", href: "/knowledge-hub/fact-sheets" },
								{ name: "Newsletter", href: "/knowledge-hub/newsletter" },
								{ name: "Global Network", href: "/network" },
								{ name: "Contact", href: "/get-involved/contact" },
							].map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base group flex items-center"
									>
										{link.name}
										<ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter */}
					<div className="space-y-4">
						<h3 className="font-semibold text-lg lg:text-xl tracking-wide">
							Stay Connected
						</h3>
						<p className="text-white/70 text-sm lg:text-base">
							Subscribe for the latest insights and updates.
						</p>
						<div className="space-y-3">
							<Input
								type="email"
								placeholder="Enter your email"
								className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/20 transition-all duration-200"
							/>
							<Button className="w-full bg-white text-black hover:bg-white/90 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
								Subscribe
							</Button>
						</div>
					</div>
				</div>

				{/* Contact Info */}
				<div className="border-t border-white/20 mt-12 pt-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm lg:text-base text-white/70">
						<div className="flex items-center gap-3 group">
							<div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
								<MapPin className="h-4 w-4" />
							</div>
							<span>New Delhi, India</span>
						</div>
						<div className="flex items-center gap-3 group">
							<div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
								<Mail className="h-4 w-4" />
							</div>
							<span>info@blacksilk.org</span>
						</div>
						<div className="flex items-center gap-3 group">
							<div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
								<Phone className="h-4 w-4" />
							</div>
							<span>+91 11 1234 5678</span>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-white/20 mt-8 pt-8 text-center text-sm lg:text-base text-white/60">
					<p className="mb-4">
						&copy;2026 The Black Silk. All rights reserved.
					</p>
					<div className="flex flex-wrap justify-center gap-6">
						{[
							{ name: "Privacy Policy", href: "/privacy" },
							{ name: "Terms of Service", href: "/terms" },
							{ name: "Cookie Policy", href: "/cookies" },
						].map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="hover:text-white transition-colors duration-200"
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
