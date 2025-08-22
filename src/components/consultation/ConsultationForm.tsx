'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormField, validationRules } from '@/components/ui/FormField';
import { useToast } from '@/contexts/ToastContext';

const timeSlots = [
  '10:00-11:00',
  '11:00-12:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
];

const consultationTopics = [
  'IPO準備全般',
  '内部統制構築',
  '資金調達',
  'IR戦略',
  '事業計画策定',
  'その他',
];

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    topic: '',
    message: '',
    agree: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success
    setIsSubmitting(false);
    // Show success message
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              無料相談を予約する
            </h2>
            <p className="text-lg text-gray-600">
              下記フォームにご記入ください。24時間以内にご連絡いたします。
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="お名前"
                  name="name"
                  value={formData.name}
                  onChange={(value) => setFormData({ ...formData, name: value })}
                  required
                  validationRules={[validationRules.minLength(2)]}
                />

                <FormField
                  label="会社名"
                  name="company"
                  value={formData.company}
                  onChange={(value) => setFormData({ ...formData, company: value })}
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="メールアドレス"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  required
                  validationRules={[validationRules.email]}
                />

                <FormField
                  label="電話番号"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value })}
                  required
                  validationRules={[validationRules.phone]}
                />
              </div>

              {/* Schedule */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    希望日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <FormField
                  label="希望時間帯"
                  name="preferredTime"
                  type="select"
                  value={formData.preferredTime}
                  onChange={(value) => setFormData({ ...formData, preferredTime: value })}
                  options={timeSlots.map(slot => ({ value: slot, label: slot }))}
                  required
                />
              </div>

              {/* Topic */}
              <FormField
                label="相談内容"
                name="topic"
                type="select"
                value={formData.topic}
                onChange={(value) => setFormData({ ...formData, topic: value })}
                options={consultationTopics.map(topic => ({ value: topic, label: topic }))}
                required
              />

              {/* Message */}
              <FormField
                label="具体的な相談内容・質問事項"
                name="message"
                type="textarea"
                value={formData.message}
                onChange={(value) => setFormData({ ...formData, message: value })}
                rows={5}
                helpText="現在の状況や課題など、詳しくお書きください"
                validationRules={[validationRules.minLength(20)]}
              />

              {/* Agreement */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    required
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    <a href="/privacy" className="text-primary-600 hover:underline">
                      プライバシーポリシー
                    </a>
                    に同意の上、送信します
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agree}
                  className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      送信中...
                    </>
                  ) : (
                    <>
                      無料相談を予約する
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}