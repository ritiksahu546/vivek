import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Star, ShieldCheck, Quote, CheckCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { doctor, reviews } = useClinic();

  // Only display approved reviews on the public facing site
  const publishedReviews = reviews.filter(r => r.isApproved);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide uppercase">
            Patient Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Patient Experiences & Clinical Care
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Real feedback from patients managed for asthma, chronic cough, COPD, and respiratory infections in Bhopal.
          </p>

          {/* Rating Summary Strip */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 px-5 py-3 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {doctor.rating.toFixed(1)} out of 5.0 Rating
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="text-xs sm:text-sm font-semibold text-slate-700">
              Based on {doctor.reviewCount}+ Google & Clinic Reviews
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishedReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between text-left hover:border-teal-200 transition-all shadow-2xs relative"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 shrink-0" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-5 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                    {review.patientName}
                    {review.isVerified && (
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 inline" />
                    )}
                  </div>
                  <div className="text-[11px] text-teal-700 font-medium">
                    {review.conditionTreated}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  {review.reviewDate}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Notice regarding patient testimonials */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            Testimonials reflect individual patient clinical experiences and are verified for medical authenticity. No fabricated claims.
          </span>
        </div>

      </div>
    </section>
  );
};
