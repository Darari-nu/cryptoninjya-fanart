"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import dynamic from "next/dynamic"
import { GlitchText } from "@/components/glitch-text"
import { ParticleSystem } from "@/components/particle-system"

// 3Dコンポーネントを動的インポートでSSRを無効化
const GalleryHeader = dynamic(
  () => import("@/components/gallery-header").then((mod) => ({ default: mod.GalleryHeader })),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <GlitchText className="text-4xl font-bold text-white mb-4">CRYPTO NINJA FAN ART MUSEUM</GlitchText>
          <p className="text-white/70 text-lg">Loading Gallery...</p>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-400 mx-auto"></div>
          </div>
        </div>
      </div>
    ),
  },
)

function ParallaxSection({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, offset])

  return <motion.div style={{ y }}>{children}</motion.div>
}

function ScrollTriggeredSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ArtGallery() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <ParticleSystem />

      {/* 3D Gallery Header - フルスクリーンヘッダー */}
      <section className="h-screen relative">
        <GalleryHeader />
      </section>

      {/* スクロール可能なコンテンツセクション */}
      <section className="relative bg-gradient-to-b from-black via-indigo-900 to-black">
        <div className="container mx-auto px-6 py-24">
          {/* ウェルカムセクション */}
          <ScrollTriggeredSection className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-8 backdrop-blur-sm bg-black/20 rounded-3xl p-8 border border-purple-500/20"
            >
              <GlitchText className="text-5xl md:text-6xl font-bold text-white mb-5 bg-gradient-to-r from-purple-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-wider">
                CRYPTO NINJA WORLD
              </GlitchText>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed font-light"
              >
                忍者たちの世界が織りなす幻想的なファンアートギャラリー。伝統と未来が交差する次元へ。
              </motion.p>
            </motion.div>
          </ScrollTriggeredSection>

          {/* First parallax section */}
          <ScrollTriggeredSection className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <GlitchText className="text-5xl font-bold text-white mb-6 leading-tight">忍者の</GlitchText>
              <motion.h4
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
              >
                美学
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed font-light"
              >
                Crypto Ninjaの世界観にインスパイアされた美しいファンアート。現代のNFT文化と日本の伝統が融合。
              </motion.p>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300 text-base">Digital Art</span>
              </div>
            </div>
            <ParallaxSection offset={-50}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Image
                  src="/images/new-art12.jpeg"
                  alt="夕暮れの忍者"
                  width={700}
                  height={900}
                  className="rounded-3xl shadow-2xl relative z-10"
                />
              </motion.div>
            </ParallaxSection>
          </ScrollTriggeredSection>

          {/* Second parallax section */}
          <ScrollTriggeredSection className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <ParallaxSection offset={50}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: -5 }}
                transition={{ duration: 0.3 }}
                className="relative group order-2 md:order-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Image
                  src="/images/new-art4.png"
                  alt="狐面の少女"
                  width={700}
                  height={700}
                  className="rounded-3xl shadow-2xl relative z-10"
                />
              </motion.div>
            </ParallaxSection>
            <div className="order-1 md:order-2">
              <GlitchText className="text-5xl font-bold text-white mb-6 leading-tight">神秘の</GlitchText>
              <motion.h4
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent mb-6"
              >
                仮面
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed font-light"
              >
                狐のマスクに隠された少女の物語。NFTアートと日本の伝統文化の美しい融合。
              </motion.p>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-gray-300 text-base">Traditional Culture</span>
              </div>
            </div>
          </ScrollTriggeredSection>

          {/* Gallery grid with stagger animation */}
          <ScrollTriggeredSection className="text-center py-16">
            <GlitchText className="text-6xl font-bold text-white mb-10 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              FAN ART COLLECTION
            </GlitchText>
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {[
                { src: "/images/new-art9.png", delay: 0, title: "桜舞う季節" },
                { src: "/images/new-art13.jpeg", delay: 0.2, title: "ゴジラの少年" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: item.delay, duration: 0.8, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    transition: { duration: 0.3 },
                  }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={600}
                    className="rounded-3xl shadow-2xl relative z-10"
                  />
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: item.delay + 0.3, duration: 0.5 }}
                    className="text-xl font-bold text-white mt-4"
                  >
                    {item.title}
                  </motion.h3>
                </motion.div>
              ))}
            </div>
          </ScrollTriggeredSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-black via-indigo-900 to-black border-t border-purple-500/20 py-16">
        <div className="container mx-auto px-6 text-center">
          <GlitchText className="text-3xl font-bold text-white mb-5 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CRYPTO NINJA FAN ART MUSEUM
          </GlitchText>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-base text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            忍者たちの世界とNFTアートの無限の可能性を探求し続ける旅路へ
          </motion.p>
          <div className="flex justify-center space-x-10 text-sm">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              PRIVACY
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
              TERMS
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
              CONTACT
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
