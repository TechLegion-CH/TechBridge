"use client";

// Analytics utility for comprehensive tracking
interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  items?: Array<{
    item_id: string;
    item_name: string;
    category: string;
    price?: number;
    quantity?: number;
  }>;
}

class Analytics {
  private isInitialized = false;
  private gtag: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    // Initialize Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        send_page_view: false // We'll send manually
      });
      
      // Enhanced ecommerce and conversion tracking
      gtag('config', 'GA_MEASUREMENT_ID', {
        custom_map: {
          'custom_parameter_1': 'user_type',
          'custom_parameter_2': 'consultation_type',
          'custom_parameter_3': 'industry_vertical'
        }
      });
    `;
    document.head.appendChild(script2);

    // Set global gtag reference
    this.gtag = (window as any).gtag;
    this.isInitialized = true;

    // Track initial page load
    this.trackPageView(window.location.pathname, document.title);
  }

  // Core tracking methods
  trackPageView(page_path: string, page_title: string) {
    if (!this.isReady()) return;

    this.gtag('event', 'page_view', {
      page_title,
      page_location: `${window.location.origin}${page_path}`,
      page_path,
      content_group1: this.getContentGroup(page_path),
      content_group2: this.getUserType(),
      custom_parameter_1: this.getUserType(),
    });
  }

  trackEvent({ name, category, label, value, custom_parameters }: AnalyticsEvent) {
    if (!this.isReady()) return;

    this.gtag('event', name, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters,
    });
  }

  // Business-specific tracking methods
  trackConsultationRequest(consultationType: string, industry: string) {
    this.trackEvent({
      name: 'consultation_request',
      category: 'conversion',
      label: consultationType,
      custom_parameters: {
        consultation_type: consultationType,
        industry_vertical: industry,
        user_type: this.getUserType(),
      }
    });

    // Track as conversion
    this.trackConversion({
      event_name: 'consultation_request',
      value: 500, // Estimated lead value
      items: [{
        item_id: 'consultation',
        item_name: `${consultationType} Consultation`,
        category: 'consulting_services',
        price: 500,
        quantity: 1
      }]
    });
  }

  trackDemoBooking(demoType: string, scheduledDate: string) {
    this.trackEvent({
      name: 'demo_booking',
      category: 'conversion',
      label: demoType,
      custom_parameters: {
        demo_type: demoType,
        scheduled_date: scheduledDate,
        user_type: this.getUserType(),
      }
    });
  }

  trackToolUsage(toolName: string, action: string) {
    this.trackEvent({
      name: 'ai_tool_usage',
      category: 'engagement',
      label: toolName,
      custom_parameters: {
        tool_name: toolName,
        tool_action: action,
        page_path: window.location.pathname,
      }
    });
  }

  trackDownload(resourceType: string, resourceName: string) {
    this.trackEvent({
      name: 'resource_download',
      category: 'engagement',
      label: resourceType,
      custom_parameters: {
        resource_type: resourceType,
        resource_name: resourceName,
        user_type: this.getUserType(),
      }
    });
  }

  trackFormInteraction(formType: string, action: string, fieldName?: string) {
    this.trackEvent({
      name: 'form_interaction',
      category: 'engagement',
      label: `${formType}_${action}`,
      custom_parameters: {
        form_type: formType,
        form_action: action,
        field_name: fieldName,
      }
    });
  }

  trackScrollDepth(percentage: number) {
    if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
      this.trackEvent({
        name: 'scroll',
        category: 'engagement',
        label: `${percentage}%`,
        value: percentage,
        custom_parameters: {
          page_path: window.location.pathname,
        }
      });
    }
  }

  trackTimeOnPage(timeInSeconds: number) {
    this.trackEvent({
      name: 'time_on_page',
      category: 'engagement',
      value: timeInSeconds,
      custom_parameters: {
        page_path: window.location.pathname,
        time_bucket: this.getTimeBucket(timeInSeconds),
      }
    });
  }

  trackSearchQuery(query: string, resultsCount: number) {
    this.trackEvent({
      name: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount,
      custom_parameters: {
        search_term: query,
        results_count: resultsCount,
      }
    });
  }

  trackChatInteraction(action: string, message?: string) {
    this.trackEvent({
      name: 'chat_interaction',
      category: 'engagement',
      label: action,
      custom_parameters: {
        chat_action: action,
        message_length: message?.length || 0,
        page_path: window.location.pathname,
      }
    });
  }

  trackNewsletterSignup(source: string) {
    this.trackEvent({
      name: 'newsletter_signup',
      category: 'conversion',
      label: source,
      custom_parameters: {
        signup_source: source,
        user_type: this.getUserType(),
      }
    });
  }

  trackPricingViewed(plan: string) {
    this.trackEvent({
      name: 'pricing_viewed',
      category: 'engagement',
      label: plan,
      custom_parameters: {
        pricing_plan: plan,
        user_type: this.getUserType(),
      }
    });
  }

  // Conversion tracking
  trackConversion(conversion: ConversionEvent) {
    if (!this.isReady()) return;

    this.gtag('event', conversion.event_name, {
      currency: conversion.currency || 'USD',
      value: conversion.value || 0,
      items: conversion.items || [],
    });
  }

  // User identification and segmentation
  identifyUser(userId: string, properties: Record<string, any> = {}) {
    if (!this.isReady()) return;

    this.gtag('config', 'GA_MEASUREMENT_ID', {
      user_id: userId,
      custom_map: {
        user_type: properties.user_type,
        industry: properties.industry,
        company_size: properties.company_size,
      }
    });
  }

  setUserProperties(properties: Record<string, any>) {
    if (!this.isReady()) return;

    this.gtag('set', {
      user_properties: properties,
    });
  }

  // Utility methods
  private isReady(): boolean {
    return this.isInitialized && this.gtag && typeof window !== 'undefined';
  }

  private getUserType(): string {
    // Logic to determine user type based on behavior
    const path = window.location.pathname;
    if (path.includes('enterprise')) return 'enterprise';
    if (path.includes('startup')) return 'startup';
    if (path.includes('sme')) return 'sme';
    return 'general';
  }

  private getContentGroup(path: string): string {
    if (path.includes('healthcare') || path.includes('finance') || path.includes('manufacturing')) {
      return 'industry_solutions';
    }
    if (path.includes('ai-') || path.includes('tools')) {
      return 'ai_tools';
    }
    if (path.includes('blog') || path.includes('resources')) {
      return 'content';
    }
    if (path.includes('about') || path.includes('team')) {
      return 'company';
    }
    return 'general';
  }

  private getTimeBucket(seconds: number): string {
    if (seconds < 30) return '0-30s';
    if (seconds < 60) return '30-60s';
    if (seconds < 180) return '1-3min';
    if (seconds < 300) return '3-5min';
    if (seconds < 600) return '5-10min';
    return '10min+';
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Dynamic import for better performance
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    const onPerfEntry = (metric: any) => {
      analytics.trackEvent({
        name: 'web_vitals',
        category: 'performance',
        label: metric.name,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        custom_parameters: {
          metric_id: metric.id,
          metric_delta: metric.delta,
          metric_rating: metric.rating,
          page_path: window.location.pathname,
        }
      });
    };

    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }).catch(() => {
    console.log('Web Vitals tracking not available');
  });
};

// Enhanced scroll tracking
export const initializeScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let scrollTimeout: NodeJS.Timeout;
  let maxScroll = 0;
  let pageStartTime = Date.now();

  const trackScrollProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      analytics.trackScrollDepth(scrollPercent);
    }
  };

  const trackTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
    analytics.trackTimeOnPage(timeSpent);
  };

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(trackScrollProgress, 100);
  });

  window.addEventListener('beforeunload', trackTimeOnPage);
  
  // Track time every 30 seconds for active users
  setInterval(trackTimeOnPage, 30000);
};

// Enhanced error tracking
export const trackError = (error: Error, errorInfo?: any) => {
  analytics.trackEvent({
    name: 'javascript_error',
    category: 'error',
    label: error.message,
    custom_parameters: {
      error_stack: error.stack,
      error_info: JSON.stringify(errorInfo),
      page_path: window.location.pathname,
      user_agent: navigator.userAgent,
    }
  });
};