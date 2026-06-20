import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Upload } from 'lucide-react';

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

  const defaultFormTitle = ar ? 'قدّم على هذه الوظيفة' : 'Apply for this role';
  const displayFormTitle = formTitle || defaultFormTitle;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-[#101418] mb-6">
        {displayFormTitle}
      </h3>

      <form className="space-y-6">
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
              <select className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all">
                <option value="">{ar ? 'اختر المجال' : 'Select category'}</option>
                <option value="product-research">{ar ? 'البحث والمنتج' : 'Product & Research'}</option>
                <option value="strategy-growth">{ar ? 'الاستراتيجية والنمو' : 'Strategy & Growth'}</option>
                <option value="design-product">{ar ? 'التصميم والمنتج' : 'Design & Product'}</option>
                <option value="engineering">{ar ? 'الهندسة' : 'Engineering'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'مستوى الخبرة' : 'Experience Level'} <span className="text-[#D63A3A]">*</span>
              </label>
              <select required className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all">
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
                className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#101418] mb-2">
                {ar ? 'المسمى الوظيفي السابق' : 'Previous Job Title'}
              </label>
              <input
                type="text"
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
              rows={3}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'أهم المشاريع أو الأعمال ذات الصلة' : 'Key Projects or Relevant Work'}
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101418] mb-2">
              {ar ? 'الأدوات والمهارات' : 'Tools / Skills'} <span className="text-[#D63A3A]">*</span>
            </label>
            <textarea
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
              <select required className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all">
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
              <select required className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all">
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
                required
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
              rows={3}
              className="w-full px-4 py-2.5 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#6D5DF6] focus:ring-2 focus:ring-[#6D5DF6]/20 transition-all resize-none"
            />
          </div>
        </div>

        {/* Hidden Fields */}
        {Object.entries(hiddenFields).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] active:scale-[0.98] transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg shadow-[#6D5DF6]/25"
          >
            {ar ? 'إرسال طلب التقديم' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}
