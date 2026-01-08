import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Brain, 
  BarChart3, 
  Users, 
  CheckCircle,
  Star,
  ChevronRight
} from 'lucide-react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const ModernHomepage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms for intelligent risk analysis and fraud detection.',
      color: 'blue',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process claims in seconds with our optimized system architecture.',
      color: 'yellow',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and security protocols to protect your data.',
      color: 'green',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time dashboards and insights for better decision making.',
      color: 'purple',
    },
    {
      icon: Users,
      title: 'Multi-Role Support',
      description: 'Seamless collaboration for employees, agents, HR, and administrators.',
      color: 'pink',
    },
    {
      icon: CheckCircle,
      title: 'Automated Workflows',
      description: 'Streamlined processes that reduce manual work and errors.',
      color: 'cyan',
    },
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '2M+', label: 'Claims Processed', icon: CheckCircle },
    { number: '24/7', label: 'Support Available', icon: Zap },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Claims Manager',
      image: '👩‍💼',
      text: 'InsurAI has transformed how we handle claims. Processing time reduced by 70%!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Admin Director',
      image: '👨‍💼',
      text: 'The AI insights have helped us identify fraud patterns we never noticed before.',
      rating: 5,
    },
    {
      name: 'Emma Wilson',
      role: 'Employee',
      image: '👩‍🔬',
      text: 'Filing a claim has never been easier. The chatbot answered all my questions!',
      rating: 5,
    },
  ];

  const roles = [
    {
      role: 'Employee',
      benefits: ['File claims easily', 'Track status realtime', 'Get AI support', '24/7 chatbot'],
      action: () => navigate('/employee/login'),
      color: 'from-blue-600 to-blue-400',
    },
    {
      role: 'Agent',
      benefits: ['Manage clients', 'Process faster', 'Real-time insights', 'Performance tracking'],
      action: () => navigate('/agent/login'),
      color: 'from-purple-600 to-purple-400',
      featured: true,
    },
    {
      role: 'HR Manager',
      benefits: ['Employee management', 'Policy oversight', 'Analytics reports', 'Compliance tracking'],
      action: () => navigate('/hr/login'),
      color: 'from-pink-600 to-pink-400',
    },
    {
      role: 'Administrator',
      benefits: ['Full system control', 'User management', 'Fraud detection', 'Advanced analytics'],
      action: () => navigate('/admin/login'),
      color: 'from-cyan-600 to-cyan-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" size="lg" className="gap-2">
                <Zap className="w-4 h-4" />
                <span>Introducing InsurAI Platform</span>
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span>Insurance, </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Reinvented
              </span>
              <span> with</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A next-generation insurance platform with automated claims, intelligent risk analysis, and enterprise-grade security.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button
                variant="gradient"
                size="lg"
                onClick={() => navigate('/employee/register')}
                className="group"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="border-white text-white hover:bg-white/10"
              >
                Explore System
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm">Scroll to explore</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <Card key={stat.label} variant="glass" className="text-center">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="primary" size="lg" className="mb-4 justify-center">
              <Zap className="w-4 h-4" />
              <span>Powerful Features</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need for
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Modern Insurance
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools designed to streamline your insurance operations.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} variant="gradient" className="hover:scale-105 transition-transform duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${feature.color}-600 to-${feature.color}-400 p-3 mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" size="lg" className="mb-4 justify-center">
              <Users className="w-4 h-4" />
              <span>Multiple Roles</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tailored Experience for
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Every User
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose your role and experience InsurAI designed specifically for you.
            </p>
          </div>

          {/* Roles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((roleItem) => (
              <div
                key={roleItem.role}
                className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  roleItem.featured ? 'lg:col-span-1 lg:row-span-2 scale-105' : ''
                }`}
              >
                <Card
                  variant="neon"
                  className={`h-full flex flex-col justify-between bg-gradient-to-br ${roleItem.color} hover:shadow-2xl hover:shadow-blue-500/50`}
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{roleItem.role}</h3>
                    <ul className="space-y-3 mb-6">
                      {roleItem.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full bg-white text-blue-600 hover:bg-gray-100"
                    onClick={roleItem.action}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Access Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="info" size="lg" className="mb-4 justify-center">
              <Star className="w-4 h-4" />
              <span>Testimonials</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Insurance Professionals
              </span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} variant="glass">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card
            variant="neon"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-center p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Insurance?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals already using InsurAI to revolutionize their claims process.
            </p>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/employee/register')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ModernHomepage;
