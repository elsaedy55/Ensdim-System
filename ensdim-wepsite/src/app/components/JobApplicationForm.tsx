import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Upload } from 'lucide-react';
import { uploadJobApplicationFiles, submitJobApplication } from '../../lib/supabase';

interface JobApplicationFormProps {
  roleTitle?: string;
  formTitle?: string;
  hiddenFields?: Record<string, string>;
}

export function JobApplicationForm({
  roleTitle = '',
  formTitle,
  hiddenFields = {}
}: JobApplicationFormProps) {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultFormTitle = ar ? 'قدّم على هذه الوظيفة' : 'Apply for this role';
  const displayFormTitle = formTitle || defaultFormTitle;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cvFile) {
      setError(ar ? 'يرجى رفع السيرة الذاتية.' : 'Please upload your CV.');
      return;
    }
    setError(null);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    try {
      const { cv_path, portfolio_file_path } = await uploadJobApplicationFiles(cvFile, portfolioFile);

      await submitJobApplication({
        full_name: String(data.get('full_name') ?? ''),
        email: String(data.get('email') ?? ''),
        whatsapp: String(data.get('whatsapp') ?? ''),
        country: String(data.get('country') ?? ''),
        city: String(data.get('city') ?? '') || undefined,
        position: String(data.get('position') ?? ''),
        career_category: String(data.get('career_category') ?? '') || undefined,
        experience_level: String(data.get('experience_level') ?? ''),
        current_job_title: String(data.get('current_job_title') ?? '') || undefined,
        previous_job_title: String(data.get('previous_job_title') ?? '') || undefined,
        years_of_experience: String(data.get('years_of_experience') ?? ''),
        previous_companies: String(data.get('previous_companies') ?? '') || undefined,
        key_projects: String(data.get('key_projects') ?? '') || undefined,
        tools_skills: String(data.get('tools_skills') ?? ''),
        portfolio_url: String(data.get('portfolio_url') ?? '') || undefined,
        availability: String(data.get('availability') ?? ''),
        work_type_preference: String(data.get('work_type_preference') ?? ''),
        cv_path,
        portfolio_file_path,
        why_ensdim: String(data.get('why_ensdim') ?? ''),
        strongest_experience: String(data.get('strongest_experience') ?? ''),
        preferred_project_type: String(data.get('preferred_project_type') ?? '') || undefined,
        source_page: hiddenFields.source_page,
        career_role: hiddenFields.career_role,
        interest_type: hiddenFields.interest_type,
        language: hiddenFields.language || language,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : (ar ? 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.' : 'Something went wrong while sending. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 20 20" fill="none" className="w-6 h-6 text-green-600 no-mirror">
            <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#101418] mb-1">
          {ar ? 'تم استلام طلبك بنجاح.' : 'Your application has been received.'}
        </h3>
        <p className="text-sm text-[#4F555E]">
          {ar ? 'سنراجع بياناتك ونعود إليك إذا كان هناك توافق.' : 'We will review your profile and get back to you if there is a fit.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-[#101418] mb-6">
        {displayFormTitle}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#101418] uppercase tracking-wider">
            {ar ? 'المعلومات الشخصية' : 'Personal Information'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'الاسم الكامل' : 'Full Name'} <span className="text-[#D63A3A]">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                required
                className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'البريد الإلكتروني' : 'Email'} <span className="text-[#D63A3A]">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'} <span className="text-[#D63A3A]">*</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                required
                className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'الدولة' : 'Country'} <span className="text-[#D63A3A]">*</span>
              </label>
              <input
                type="text"
                name="country"
                required
                className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'المدينة' : 'City'}
            </label>
            <input
              type="text"
              name="city"
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
            />
          </div>
        </div>

        {/* Role Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#101418] uppercase tracking-wider">
            {ar ? 'معلومات الوظيفة' : 'Role Information'}
          </h4>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'الوظيفة المتقدم لها' : 'Position Applied For'} <span className="text-[#D63A3A]">*</span>
            </label>
            <input
              type="text"
              name="position"
              required
              defaultValue={roleTitle}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'مجال الوظيفة' : 'Career Category'}
              </label>
              <select name="career_category" className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all">
                <option value="">{ar ? 'اختر المجال' : 'Select category'}</option>
                <option value="research">{ar ? 'البحث وفهم المستخدم' : 'Research & User Understanding'}</option>
                <option value="strategy-growth">{ar ? 'الاستراتيجية، النمو، والعلاقات' : 'Strategy, Growth & Relationships'}</option>
                <option value="product-design">{ar ? 'المنتج، التصميم، والتجربة' : 'Product, Design & Experience'}</option>
                <option value="engineering">{ar ? 'الهندسة، البيانات، والذكاء الاصطناعي' : 'Engineering, Data & AI'}</option>
                <option value="delivery">{ar ? 'إدارة المشاريع والتسليم' : 'Project Management & Delivery'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'مستوى الخبرة' : 'Experience Level'} <span className="text-[#D63A3A]">*</span>
              </label>
              <select name="experience_level" required className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all">
                <option value="">{ar ? 'اختر المستوى' : 'Select level'}</option>
                <option value="intern">{ar ? 'تدريب' : 'Intern'}</option>
                <option value="junior">{ar ? 'مبتدئ' : 'Junior'}</option>
                <option value="mid">{ar ? 'متوسط الخبرة' : 'Mid-level'}</option>
                <option value="senior">{ar ? 'خبير' : 'Senior'}</option>
                <option value="lead">{ar ? 'قائد / استشاري' : 'Lead / Consultant'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#101418] uppercase tracking-wider">
            {ar ? 'الخبرة' : 'Experience'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'المسمى الوظيفي الحالي' : 'Current Job Title'}
              </label>
              <input
                type="text"
                name="current_job_title"
                className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'المسمى الوظيفي السابق' : 'Previous Job Title'}
              </label>
              <input
                type="text"
                name="previous_job_title"
                className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'سنوات الخبرة' : 'Years of Experience'} <span className="text-[#D63A3A]">*</span>
            </label>
            <input
              type="text"
              name="years_of_experience"
              required
              placeholder={ar ? 'مثال: 3 سنوات' : 'e.g., 3 years'}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'الشركات أو العملاء السابقون' : 'Previous Companies / Clients'}
            </label>
            <textarea
              name="previous_companies"
              rows={3}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'أهم المشاريع أو الأعمال ذات الصلة' : 'Key Projects or Relevant Work'}
            </label>
            <textarea
              name="key_projects"
              rows={3}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'الأدوات والمهارات' : 'Tools / Skills'} <span className="text-[#D63A3A]">*</span>
            </label>
            <textarea
              name="tools_skills"
              rows={2}
              required
              placeholder={ar ? 'مثال: Figma, React, Python...' : 'e.g., Figma, React, Python...'}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'رابط الأعمال / لينكدإن / الموقع الشخصي' : 'Portfolio / LinkedIn / Website URL'}
            </label>
            <input
              type="url"
              name="portfolio_url"
              placeholder={ar ? 'https://' : 'https://'}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
            />
          </div>
        </div>

        {/* Work Preferences */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#101418] uppercase tracking-wider">
            {ar ? 'تفضيلات العمل' : 'Work Preferences'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'موعد التفرغ' : 'Availability'} <span className="text-[#D63A3A]">*</span>
              </label>
              <select name="availability" required className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all">
                <option value="">{ar ? 'اختر الموعد' : 'Select availability'}</option>
                <option value="immediate">{ar ? 'متاح فورًا' : 'Immediate'}</option>
                <option value="2weeks">{ar ? 'خلال أسبوعين' : '2 weeks'}</option>
                <option value="1month">{ar ? 'خلال شهر' : '1 month'}</option>
                <option value="flexible">{ar ? 'مرن' : 'Flexible'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'نوع العمل المفضل' : 'Work Type Preference'} <span className="text-[#D63A3A]">*</span>
              </label>
              <select name="work_type_preference" required className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all">
                <option value="">{ar ? 'اختر النوع' : 'Select type'}</option>
                <option value="remote">{ar ? 'عن بُعد' : 'Remote'}</option>
                <option value="hybrid">{ar ? 'هجين' : 'Hybrid'}</option>
                <option value="part-time">{ar ? 'دوام جزئي' : 'Part-time'}</option>
                <option value="full-time">{ar ? 'دوام كامل' : 'Full-time'}</option>
                <option value="project-based">{ar ? 'حسب المشروع' : 'Project-based'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Files */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#101418] uppercase tracking-wider">
            {ar ? 'الملفات' : 'Files'}
          </h4>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'رفع السيرة الذاتية' : 'Upload CV'} <span className="text-[#D63A3A]">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#F8F8FF] border-2 border-dashed border-[#6D5DF6]/30 rounded-xl hover:border-[#6D5DF6] hover:bg-[#EEEAFE] transition-all cursor-pointer"
              >
                <Upload size={18} className="text-[#6D5DF6]" />
                <span className="text-sm text-[#101418]">
                  {cvFile ? cvFile.name : (ar ? 'اختر ملف السيرة الذاتية (PDF, DOC)' : 'Choose CV file (PDF, DOC)')}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'رفع ملف أعمال / نماذج أعمال' : 'Upload Portfolio / Work Samples'} <span className="text-xs text-[#4F555E]">({ar ? 'اختياري' : 'Optional'})</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.zip,.rar"
                onChange={(e) => setPortfolioFile(e.target.files?.[0] || null)}
                className="hidden"
                id="portfolio-upload"
              />
              <label
                htmlFor="portfolio-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#F8F8FF] border-2 border-dashed border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6]/30 hover:bg-[#EEEAFE] transition-all cursor-pointer"
              >
                <Upload size={18} className="text-[#4F555E]" />
                <span className="text-sm text-[#4F555E]">
                  {portfolioFile ? portfolioFile.name : (ar ? 'اختر ملف (PDF, ZIP)' : 'Choose file (PDF, ZIP)')}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#101418] uppercase tracking-wider">
            {ar ? 'أسئلة' : 'Questions'}
          </h4>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'لماذا ترغب في العمل مع إنسديم؟' : 'Why do you want to work with ENSDIM?'} <span className="text-[#D63A3A]">*</span>
            </label>
            <textarea
              name="why_ensdim"
              rows={4}
              required
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'ما أقوى خبرة لديك مرتبطة بهذا الدور؟' : 'What is the strongest relevant experience you have?'} <span className="text-[#D63A3A]">*</span>
            </label>
            <textarea
              name="strongest_experience"
              rows={4}
              required
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'ما نوع المشاريع التي تفضّل العمل عليها؟' : 'What type of projects do you prefer to work on?'}
            </label>
            <textarea
              name="preferred_project_type"
              rows={3}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all resize-none"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-[#D63A3A]">{error}</p>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] active:scale-[0.98] transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg shadow-[#6D5DF6]/25 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (ar ? 'جارٍ الإرسال...' : 'Submitting...') : (ar ? 'إرسال طلب التقديم' : 'Submit Application')}
          </button>
        </div>
      </form>
    </div>
  );
}
