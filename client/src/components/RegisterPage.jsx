import React, { useState } from 'react'
import { BookMarked, Eye, EyeOff, ArrowRight, ArrowLeft, Check, Feather, Sparkles } from 'lucide-react'

export default function RegisterPage({ onNavigateToLogin, onNavigateToHome }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Calculate password strength score (0-4)
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-transparent' }
    let score = 0
    if (pass.length >= 8) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    if (score <= 1) return { score: 1, label: 'Kekuatan: Lemah', color: 'bg-amber-600' }
    if (score === 2) return { score: 2, label: 'Kekuatan: Cukup', color: 'bg-amber-500' }
    if (score === 3) return { score: 3, label: 'Kekuatan: Bagus', color: 'bg-emerald-600' }
    return { score: 4, label: 'Kekuatan: Sangat Kuat', color: 'bg-[#192F23]' }
  }

  const strength = getPasswordStrength(formData.password)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrorMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setErrorMessage('Mohon isi nama lengkap atau nama pena Anda.')
      return
    }

    if (!formData.email.trim()) {
      setErrorMessage('Mohon cantumkan alamat email Anda.')
      return
    }

    if (formData.password.length < 8) {
      setErrorMessage('Kata sandi harus memiliki minimal 8 karakter.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.')
      return
    }

    if (!formData.agreeTerms) {
      setErrorMessage('Anda perlu menyetujui Ketentuan Layanan untuk melanjutkan.')
      return
    }

    setIsSubmitting(true)
    // Simulate register request
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessMessage(`Selamat datang di Sanctuary, ${formData.name}! Rak bacamu telah disiapkan.`)
    }, 1200)
  }

  return (
    <div className="min-h-screen w-full bg-[#F6F3ED] flex items-center justify-center p-3 sm:p-6 lg:p-10">
      
      {/* Background + Shadow Main Container: 1280px by 992px responsive */}
      <div className="w-full max-w-[1280px] min-h-[920px] bg-white rounded-lg shadow-book overflow-hidden flex flex-col lg:flex-row relative">

        {/* ========================================================= */}
        {/* LEFT COLUMN: The Sanctuary (approx 58%)                    */}
        {/* ========================================================= */}
        <section 
          aria-label="The Sanctuary"
          className="relative w-full lg:w-[58%] bg-[#192F23] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden select-none isolation-auto"
        >
          {/* Atmospheric Backdrop Image with scrim */}
          <div 
            className="absolute -inset-6 bg-cover bg-center pointer-events-none mix-blend-multiply opacity-55 transition-transform duration-1000 ease-out hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1507842229450-799042b9340e?q=80&w=1400&auto=format&fit=crop')`,
            }}
          />

          {/* Warm gradient scrims for absolute legibility & tactile vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(0deg, #192F23 0%, rgba(25, 47, 35, 0.6) 50%, rgba(25, 47, 35, 0.0) 100%)',
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(25, 47, 35, 0.85) 0%, rgba(25, 47, 35, 0.3) 50%, rgba(25, 47, 35, 0.6) 100%)',
            }}
          />

          {/* Subtle Decorative Archival Lines (Background Texture) */}
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none hidden lg:block" />

          {/* Warm Ambient Glow Overlay + Blur */}
          <div 
            className="absolute -right-24 -top-24 w-96 h-96 rounded-xl pointer-events-none blur-2xl"
            style={{ background: 'rgba(255, 220, 188, 0.08)' }}
          />

          {/* Top Return Link (Header Area on Left Column) */}
          <div className="relative z-10 flex items-center justify-between">
            <button
              type="button"
              onClick={onNavigateToHome}
              className="inline-flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#99B2A1] hover:text-[#FFF8F5] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Kembali ke Beranda</span>
            </button>
            <span className="text-[11px] font-sans tracking-widest text-[#FABA75]/80 uppercase">
              Edisi Perdana
            </span>
          </div>

          {/* Central Hero Content: Monolithic Literary Quote */}
          <div className="relative z-10 my-auto py-10 lg:py-16 max-w-[576px]">
            {/* Tag / Category Header with Horizontal Divider */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#FABA75]/70" />
              <span className="font-sans font-semibold text-xs leading-4 tracking-[1.2px] uppercase text-[#FABA75]">
                Babak Pembuka
              </span>
            </div>

            {/* Inspiring Literary Blockquote for Registration */}
            <blockquote className="font-serif italic font-normal text-3xl sm:text-4xl lg:text-[46px] lg:leading-[54px] tracking-tight text-[#FFF8F5] mb-8">
              “Sebuah buku adalah pintu gerbang menuju semesta baru yang menunggumu untuk dijelajahi. Buka lembaran pertamamu di sini.”
            </blockquote>

            {/* Author / Citation Container */}
            <div className="flex items-center gap-4">
              {/* Emblem Badge Icon */}
              <div className="w-8 h-8 rounded-xl bg-[#FFDCBC]/20 flex items-center justify-center flex-shrink-0">
                <Feather className="w-4 h-4 text-[#FFDCBC]" />
              </div>

              {/* Author Details */}
              <div className="flex flex-col">
                <cite className="font-serif not-italic font-medium text-lg sm:text-xl text-white leading-snug">
                  Carlos Ruiz Zafón
                </cite>
                <span className="font-sans text-xs sm:text-sm text-[#99B2A1] leading-tight">
                  Pengelana Kata &amp; Penulis Sastra
                </span>
              </div>
            </div>
          </div>

          {/* Left Column Bottom Perks Footer */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[#99B2A1]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FABA75]" />
              Kurasi koleksi tanpa batas
            </span>
            <span>•</span>
            <span>Refleksi &amp; catatan pribadi</span>
            <span>•</span>
            <span>Komunitas literasi santun</span>
          </div>
        </section>


        {/* ========================================================= */}
        {/* RIGHT COLUMN: Authentication Sanctuary (approx 42%)       */}
        {/* ========================================================= */}
        <section 
          aria-label="Form Pendaftaran Sanctuary"
          className="w-full lg:w-[42%] bg-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto"
        >
          {/* Top Row: Editorial Branding & Emblem */}
          <div className="flex items-center justify-between pb-4">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); if (onNavigateToHome) onNavigateToHome(); }}
              className="flex items-center gap-2.5 group"
            >
              {/* Logo Box Emblem (#FFEADD) */}
              <div className="w-9 h-9 rounded bg-[#FFEADD] flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                <BookMarked className="w-4 h-4 text-[#192F23]" />
              </div>
              <span className="font-serif text-[28px] leading-9 font-semibold tracking-[-0.7px] text-[#261910]">
                Bookly<span className="text-[#835418]">.</span>
              </span>
            </a>

            {/* Quick Switch to Login on Top Right */}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-xs font-sans font-medium text-[#835418] hover:underline"
            >
              Sudah punya akun?
            </button>
          </div>

          {/* Main Form Container */}
          <div className="py-4 my-auto max-w-[448px] w-full mx-auto">
            {/* Header Text */}
            <div className="mb-6">
              <h1 className="font-serif font-medium text-3xl sm:text-[38px] leading-[44px] tracking-[-1px] text-[#261910] mb-2">
                Ciptakan Akun Baru
              </h1>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#424844]">
                Buka ruang baca pribadimu, simpan catatan perenungan, dan mulailah kurasi karya sastra terbaik.
              </p>
            </div>

            {/* Success State Alert */}
            {successMessage && (
              <div className="mb-6 p-4 rounded bg-[#DCE5DF]/60 border border-[#192F23]/20 flex items-start gap-3">
                <Check className="w-5 h-5 text-[#192F23] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-sans text-sm font-medium text-[#192F23]">{successMessage}</p>
                  <button
                    type="button"
                    onClick={onNavigateToLogin}
                    className="mt-2 text-xs font-sans font-semibold text-[#835418] underline inline-flex items-center gap-1"
                  >
                    Masuk ke Sanctuary sekarang <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Error State Alert */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded bg-red-50 border border-red-200 text-red-800 text-xs font-sans">
                {errorMessage}
              </div>
            )}

            {/* Form Elements */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Field 1: Nama Lengkap / Pena */}
              <div className="flex flex-col gap-1.5">
                <label 
                  htmlFor="register-name"
                  className="font-sans font-medium text-xs sm:text-sm tracking-[0.28px] text-[#261910]"
                >
                  Nama Lengkap / Nama Pena
                </label>
                <div className="relative rounded bg-[#FFF8F5] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#C2C8C2]/30 focus-within:border-[#192F23] transition-colors">
                  <input
                    id="register-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Pramoedya Ananta"
                    className="w-full h-[46px] px-4 bg-transparent font-sans text-sm sm:text-base text-[#261910] placeholder-[#737973] focus:outline-none"
                  />
                </div>
              </div>

              {/* Field 2: Alamat Email */}
              <div className="flex flex-col gap-1.5">
                <label 
                  htmlFor="register-email"
                  className="font-sans font-medium text-xs sm:text-sm tracking-[0.28px] text-[#261910]"
                >
                  Email
                </label>
                <div className="relative rounded bg-[#FFF8F5] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#C2C8C2]/30 focus-within:border-[#192F23] transition-colors">
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="kurator@sanctuary.org"
                    className="w-full h-[46px] px-4 bg-transparent font-sans text-sm sm:text-base text-[#261910] placeholder-[#737973] focus:outline-none"
                  />
                </div>
              </div>

              {/* Field 3: Kata Sandi (Password) */}
              <div className="flex flex-col gap-1.5">
                <label 
                  htmlFor="register-password"
                  className="font-sans font-medium text-xs sm:text-sm tracking-[0.28px] text-[#261910]"
                >
                  Kata Sandi
                </label>
                <div className="relative rounded bg-[#FFF8F5] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#C2C8C2]/30 focus-within:border-[#192F23] transition-colors flex items-center">
                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 8 karakter"
                    className="w-full h-[46px] pl-4 pr-11 bg-transparent font-sans text-sm sm:text-base text-[#261910] placeholder-[#737973] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1 text-[#737973] hover:text-[#261910] transition-colors"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password strength bar */}
                {formData.password && (
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#EBE8E2] rounded-full overflow-hidden flex gap-0.5">
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 2 ? strength.color : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 4 ? strength.color : 'bg-transparent'}`} />
                    </div>
                    <span className="font-sans text-[11px] text-[#737973]">{strength.label}</span>
                  </div>
                )}
              </div>

              {/* Field 4: Konfirmasi Kata Sandi */}
              <div className="flex flex-col gap-1.5">
                <label 
                  htmlFor="register-confirm-password"
                  className="font-sans font-medium text-xs sm:text-sm tracking-[0.28px] text-[#261910]"
                >
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative rounded bg-[#FFF8F5] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#C2C8C2]/30 focus-within:border-[#192F23] transition-colors flex items-center">
                  <input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi kata sandi Anda"
                    className="w-full h-[46px] pl-4 pr-11 bg-transparent font-sans text-sm sm:text-base text-[#261910] placeholder-[#737973] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 p-1 text-[#737973] hover:text-[#261910] transition-colors"
                    aria-label={showConfirmPassword ? "Sembunyikan konfirmasi kata sandi" : "Lihat konfirmasi kata sandi"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Persetujuan Syarat & Ketentuan Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded border-[#C2C8C2] text-[#192F23] focus:ring-[#192F23] cursor-pointer accent-[#192F23]"
                />
                <label 
                  htmlFor="agreeTerms" 
                  className="font-sans text-xs sm:text-sm text-[#424844] leading-snug cursor-pointer select-none"
                >
                  Saya menyetujui{' '}
                  <a href="#" className="underline text-[#835418] hover:text-[#261910]">
                    Ketentuan Layanan
                  </a>{' '}
                  dan{' '}
                  <a href="#" className="underline text-[#835418] hover:text-[#261910]">
                    Kebijakan Privasi
                  </a>{' '}
                  Sanctuary.
                </label>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 mt-2 bg-[#192F23] hover:bg-[#13241b] active:scale-[0.99] text-white font-sans font-medium text-sm tracking-[0.35px] rounded shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 transition-all disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mempersiapkan Rak...
                  </span>
                ) : (
                  <>
                    <span>Daftar ke Sanctuary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Elegant Parchment Separator */}
            <div className="relative flex items-center justify-center my-5">
              <div className="w-full h-[1px] bg-[#F7DECE]" />
              <span className="absolute px-4 bg-white font-serif italic text-xs sm:text-sm text-[#737973]">
                atau daftar dengan
              </span>
            </div>

            {/* Social Literary Auth Grid (Google & Apple) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google Auth Button */}
              <button
                type="button"
                className="h-10 px-3 bg-[#FFF8F5] hover:bg-[#F6F3ED] border border-[#C2C8C2]/30 rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2 transition-colors group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.3 7.5 23.5 12 23.5z"
                  />
                </svg>
                <span className="font-sans font-medium text-xs sm:text-sm tracking-[0.28px] text-[#261910]">
                  Google
                </span>
              </button>

              {/* Apple Auth Button */}
              <button
                type="button"
                className="h-10 px-3 bg-[#FFF8F5] hover:bg-[#F6F3ED] border border-[#C2C8C2]/30 rounded shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2 transition-colors group"
              >
                <svg className="w-4 h-4 fill-[#261910]" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.79 1.45-.59.69-1.12 1.83-.98 2.93 1.07.08 2.15-.55 2.78-1.28" />
                </svg>
                <span className="font-sans font-medium text-xs sm:text-sm tracking-[0.28px] text-[#261910]">
                  Apple
                </span>
              </button>
            </div>

            {/* Registration to Login Link */}
            <div className="mt-5 text-center flex items-center justify-center gap-1.5 font-sans text-xs sm:text-sm text-[#424844]">
              <span>Sudah memiliki akun Sanctuary?</span>
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="font-medium text-[#835418] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                Masuk ke Akun
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column Footer: Micro-Meta */}
          <div className="pt-4 border-t border-[#C2C8C2]/20 flex items-center justify-center gap-4 text-[11px] font-sans font-semibold tracking-[0.72px] text-[#737973] uppercase">
            <a href="#" className="hover:text-[#261910] transition-colors">
              Bantuan &amp; Kurasi
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#261910] transition-colors">
              Privasi &amp; Etika Baca
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
