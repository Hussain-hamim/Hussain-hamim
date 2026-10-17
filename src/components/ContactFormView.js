import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import Button from './Button';

export default function ContactFormView({ formik, isLoading, isPashto, pending = false }) {
  return (
    <motion.div
      initial={pending ? false : { opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#D7FF00]/[0.05] via-white/[0.04] to-black/50 backdrop-blur-md border border-white/10 p-8 pb-12 md:p-12 md:pb-16 rounded-3xl relative overflow-hidden mb-4 md:mb-6"
    >
      <form aria-busy={pending || isLoading} onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider"
            >
              {isPashto ? "نوم" : "Name"}
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder={isPashto ? "ستاسو نوم" : "Your name"}
              {...formik.getFieldProps("firstName")}
              className={`w-full bg-white/5 border ${
                formik.touched.firstName && formik.errors.firstName
                  ? "border-red-500"
                  : "border-white/10"
              } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D7FF00] transition-colors placeholder-gray-600`}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-xs mt-1 font-mono">
                {formik.errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider"
            >
              {isPashto ? "ایمېل" : "Email"}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={isPashto ? "email@example.com" : "you@company.com"}
              {...formik.getFieldProps("email")}
              className={`w-full bg-white/5 border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-white/10"
              } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D7FF00] transition-colors placeholder-gray-600`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1 font-mono">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider"
            >
              {isPashto ? "د پوښتنې ډول" : "What's this about?"}
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                {...formik.getFieldProps("type")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D7FF00] transition-colors appearance-none cursor-pointer"
              >
                <option value="hireMe" className="bg-[#1a1a1a]">
                  {isPashto ? "د فريلانس پروژې وړانديز" : "A project you'd like built"}
                </option>
                <option value="collaboration" className="bg-[#1a1a1a]">
                  {isPashto ? "پر پروژه ګډه همکاري" : "Working on something together"}
                </option>
                <option value="openSource" className="bg-[#1a1a1a]">
                  {isPashto ? "د Open Source مشوره" : "Help with open source"}
                </option>
                <option value="jobOffer" className="bg-[#1a1a1a]">
                  {isPashto ? "د کار فرصت" : "A role you have in mind"}
                </option>
                <option value="other" className="bg-[#1a1a1a]">
                  {isPashto ? "بل څه" : "Something else"}
                </option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider"
            >
              {isPashto ? "پيغام" : "Message"}
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={3}
              placeholder={isPashto ? "د خپلې پروژې په اړه راته وليکئ..." : "What would you like to talk about?"}
              {...formik.getFieldProps("comment")}
              className={`w-full bg-white/5 border ${
                formik.touched.comment && formik.errors.comment
                  ? "border-red-500"
                  : "border-white/10"
              } rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#D7FF00] transition-colors placeholder-gray-600 resize-none`}
            />
            {formik.touched.comment && formik.errors.comment && (
              <p className="text-red-500 text-xs mt-1 font-mono">
                {formik.errors.comment}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={pending || isLoading}
          fullWidth
          size="sm"
          icon={!isLoading ? <FaPaperPlane /> : undefined}
        >
          {isLoading
            ? isPashto
              ? "پيغام لېږل کېږي..."
              : "Sending it..."
            : isPashto
            ? "پيغام ولېږه"
            : "Send it over"}
        </Button>
      </form>
    </motion.div>
  );
}

const emptyForm = {
  touched: {},
  errors: {},
  getFieldProps: () => ({ disabled: true }),
  handleSubmit: event => event.preventDefault(),
};

export function ContactFormPlaceholder({ locale }) {
  return <ContactFormView formik={emptyForm} isLoading={false} isPashto={locale === 'ps'} pending />;
}
