'use client';

import React from 'react';
import { 
  ArrowRight, 
  Palette, 
  Users, 
  Zap, 
  Shield, 
  Download, 
  Star,
  Play,
  CheckCircle
} from 'lucide-react';

// Import custom UI components
import { Button } from '@repo/ui/button';
import { Card, CardContent } from '@repo/ui/card';
import { Container } from '@repo/ui/container';
import { Section } from '@repo/ui/section';
import { Grid } from '@repo/ui/grid';
import { Navbar } from '@repo/ui/navbar';
import { Hero } from '@repo/ui/hero';
import { FeatureCard } from '@repo/ui/feature';
import { Badge } from '@repo/ui/badge';

export default function Home() {
  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Pricing', href: '#pricing' }
  ];

  const navActions = (
    <>
      <Button variant="outline" size="sm" className="transition-colors duration-200 border-gray-300 hover:border-primary hover:text-primary">Sign In</Button>
      <Button size="sm" className="transition-colors duration-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">Get Started</Button>
    </>
  );

  const heroVisual = (
    <div className="bg-white rounded-3xl shadow-2xl p-10 mx-auto max-w-4xl border border-gray-200">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(99,102,241,0.08)_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="text-center z-10">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center transform rotate-12 shadow-lg">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 text-lg font-medium">Interactive Canvas Preview</p>
          <p className="text-gray-400 text-sm mt-2">Click "Start Drawing" to begin creating</p>
        </div>
      </div>
    </div>
  );

  const features = [
    {
      icon: <Palette className="w-6 h-6 text-white" />,
      title: 'Hand-drawn Style',
      description: 'Create diagrams that feel personal and approachable with our signature hand-drawn aesthetic.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: 'Real-time Collaboration',
      description: 'Work together seamlessly with your team in real-time. See changes instantly as they happen.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: 'Lightning Fast',
      description: 'Built for speed and performance. Start drawing immediately without any lag or delays.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: 'Privacy First',
      description: 'Your data stays private. Everything is stored locally or encrypted in the cloud.',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Download className="w-6 h-6 text-white" />,
      title: 'Export Anywhere',
      description: 'Export your diagrams as PNG, SVG, or PDF. Perfect for presentations and documentation.',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      title: 'No Sign-up Required',
      description: 'Start creating immediately. No account required to begin drawing and sharing your ideas.',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <Navbar
        brand={{
          name: 'ExciliDraw',
          icon: (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Palette className="w-5 h-5 text-white" />
            </div>
          )
        }}
        items={navItems}
        actions={navActions}
      />

      {/* Hero Section */}
      <Hero
        badge={{
          text: 'Trusted by 10,000+ creators worldwide',
          icon: <Star className="w-4 h-4 mr-2 text-yellow-400" />
        }}
        title="Create Beautiful"
        subtitle="Hand-Drawn Diagrams"
        description="The intuitive whiteboard tool that brings your ideas to life with beautiful, hand-drawn style diagrams. Perfect for brainstorming, wireframing, and collaboration."
        primaryAction={{
          text: 'Start Drawing Now',
          icon: <ArrowRight className="w-5 h-5 ml-2" />
        }}
        secondaryAction={{
          text: 'Watch Demo',
          icon: <Play className="w-5 h-5 mr-2" />
        }}
        visual={heroVisual}
      />

      {/* Features Section */}
      <Section background="white" padding="xl" className="rounded-3xl shadow-lg mx-4 my-12">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Everything you need to bring ideas to life
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make diagramming intuitive, collaborative, and beautiful.
            </p>
          </div>

          <Grid cols={3} gap="xl">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Demo Section */}
      <Section background="gradient" padding="xl" className="rounded-3xl mx-4 my-12 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              See ExciliDraw in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the intuitive interface and powerful features that make diagramming effortless.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="rounded-2xl shadow-lg border-0 bg-white">
                <div className="p-4">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                        <Play className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-gray-600 text-lg font-medium">Interactive Demo</p>
                      <p className="text-gray-400 text-sm mt-2">Click to see live preview</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 shadow">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intuitive Drawing Tools</h3>
                  <p className="text-gray-600">
                    Pen, shapes, text, and arrows with natural hand-drawn styling that looks professional yet approachable.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 shadow">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Connections</h3>
                  <p className="text-gray-600">
                    Automatically connect shapes and maintain relationships as you move elements around the canvas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Infinite Canvas</h3>
                  <p className="text-gray-600">
                    Never run out of space. Pan and zoom across an unlimited canvas to accommodate any project size.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="dark" padding="xl" className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mx-4 my-12 shadow-xl">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of creators, designers, and teams who use ExciliDraw to visualize their thoughts and collaborate effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg transition-colors duration-200">
                Start Drawing for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-semibold shadow-lg transition-colors duration-200">
                View Examples
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 rounded-t-3xl shadow-inner mt-16">
        <Container>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ExciliDraw</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The most intuitive whiteboard tool for creating beautiful, hand-drawn style diagrams and wireframes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">
                  <span className="text-sm font-bold text-white">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 cursor-pointer transition-colors">
                  <span className="text-sm font-bold text-white">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold text-white">in</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 ExciliDraw. All rights reserved. Made with <span className="text-pink-400">❤️</span> for creators worldwide.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}



// import Image from "next/image";
// import { Button } from "@repo/ui/button";
// import { Card } from "@repo/ui/card";
// import { Pencil, Share2, Users2, Sparkles, Github, Download } from "lucide-react";
// import Link from "next/link";


// export default function Home() {
//   return (
//     // <div >
//     //       <h1>Hello</h1>
//     // </div>

//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <header className="relative overflow-hidden">
//         <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
//               Collaborative Whiteboarding
//               <span className="text-primary block">Made Simple</span>
//             </h1>
//             <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
//               Create, collaborate, and share beautiful diagrams and sketches with our intuitive drawing tool. 
//               No sign-up required.
//             </p>
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <Link href={"/signin"}>
//                 <Button variant={"primary"} size="lg" className="h-12 px-6">
//                   Sign in
//                   <Pencil className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//               <Link href="/signup">
//                 <Button variant="outline" size="lg" className="h-12 px-6">
//                   Sign up
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="py-24 bg-muted/50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
//             <Card className="p-6 border-2 hover:border-primary transition-colors" title={"jjjj"} href={""}>
//               <div className="flex items-center gap-4">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <Share2 className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
//               </div>
//               <p className="mt-4 text-muted-foreground">
//                 Work together with your team in real-time. Share your drawings instantly with a simple link.
//               </p>
//             </Card>

//             <Card className="p-6 border-2 hover:border-primary transition-colors" title={"jjj"} href={""}>
//               <div className="flex items-center gap-4">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <Users2 className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Multiplayer Editing</h3>
//               </div>
//               <p className="mt-4 text-muted-foreground">
//                 Multiple users can edit the same canvas simultaneously. See who's drawing what in real-time.
//               </p>
//             </Card>

//             <Card className="p-6 border-2 hover:border-primary transition-colors" title={""} href={""}>
//               <div className="flex items-center gap-4">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <Sparkles className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Smart Drawing</h3>
//               </div>
//               <p className="mt-4 text-muted-foreground">
//                 Intelligent shape recognition and drawing assistance helps you create perfect diagrams.
//               </p>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-primary rounded-3xl p-8 sm:p-16">
//             <div className="mx-auto max-w-2xl text-center">
//               <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
//                 Ready to start creating?
//               </h2>
//               <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
//                 Join thousands of users who are already creating amazing diagrams and sketches.
//               </p>
//               <div className="mt-10 flex items-center justify-center gap-x-6">
//                 <Button size="lg" variant="secondary" className="h-12 px-6">
//                   Open Canvas
//                   <Pencil className="ml-2 h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="lg" className="h-12 px-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
//                   View Gallery
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t">
//         <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
//             <p className="text-sm text-muted-foreground">
//               © 2024 Excalidraw Clone. All rights reserved.
//             </p>
//             <div className="flex space-x-6">
//               <a href="https://github.com" className="text-muted-foreground hover:text-primary">
//                 <Github className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-muted-foreground hover:text-primary">
//                 <Download className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
