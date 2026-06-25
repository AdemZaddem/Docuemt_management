import Image from "next/image";
import { Files, Zap, Shield, Users, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Link from "next/link";

const features = [
  {
    icon: <Files color="#4f46e5" size={22} />,
    title: "Organize Everything",
    desc: "Keep all your team's files organized in one secure location",
  },
  {
    icon: <Shield color="#4f46e5" size={22} />,
    title: "Secure Storage",
    desc: "Enterprise-grade security to keep your documents safe",
  },
  {
    icon: <Users color="#4f46e5" size={22} />,
    title: "Team Collaboration",
    desc: "Share and collaborate with your team seamlessly",
  },
  {
    icon: <Zap color="#4f46e5" size={22} />,
    title: "Lightning Fast",
    desc: "Upload, search, and access files in seconds",
  },
];

const stats = [
  { value: "10K+", label: "Teams" },
  { value: "2M+", label: "Files stored" },
  { value: "99.9%", label: "Uptime" },
  { value: "256-bit", label: "Encryption" },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-5 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          <div className="flex flex-col gap-6 flex-1">
            <div className="inline-flex items-center gap-2 bg-[#4f46e5]/8 text-[#4f46e5] text-sm font-medium px-3 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full" />
              Now with room collaboration
            </div>
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-gray-900">
              Organize your team&apos;s files{" "}
              <span className="text-[#4f46e5]">in one place</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              Simple, secure document management for modern teams. Upload,
              organize, and share files effortlessly.
            </p>
            <div className="flex gap-3">
              <Link
                href="/register"
                className="flex items-center gap-2 bg-[#4f46e5] text-white rounded-[12px] px-5 py-2.5 text-sm font-medium transition hover:bg-[#4338ca]"
              >
                Get Started Free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 bg-gray-100 text-gray-700 rounded-[12px] px-5 py-2.5 text-sm font-medium transition hover:bg-gray-200"
              >
                Login
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              No credit card required · Free forever plan
            </p>
          </div>

          <div className="flex-1">
            <Image
              className="shadow-xl rounded-[16px] w-full"
              src="/home/hero.jpeg"
              width={800}
              height={500}
              alt="Vaultly dashboard preview"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-semibold text-gray-900">
                {stat.value}
              </span>
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1200px] mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Everything you need to manage your files
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Built for teams that need more than just a folder structure
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 p-6 rounded-[16px] border border-gray-100 hover:border-[#4f46e5]/20 hover:shadow-sm transition-all"
            >
              <div className="bg-[#4f46e5]/8 p-3 rounded-[10px] w-fit">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1200px] mx-auto px-5 pb-20">
        <div className="bg-[#4f46e5] rounded-[20px] p-14 flex flex-col items-center gap-5 text-center">
          <h2 className="text-4xl font-semibold text-white">
            Ready to get started?
          </h2>
          <p className="text-indigo-200 max-w-md">
            Join thousands of teams already using Vaultly to manage their
            documents.
          </p>
          <Link
            href="/register"
            className="flex items-center gap-2 bg-white text-[#4f46e5] rounded-[12px] px-6 py-2.5 text-sm font-medium transition hover:bg-indigo-50"
          >
            Create Your Account
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;