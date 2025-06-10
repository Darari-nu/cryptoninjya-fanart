"use client"

import { useRef, useState, Suspense, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useTexture, Sphere, Box } from "@react-three/drei"
import { Info } from "lucide-react"
import { GlitchText } from "./glitch-text"
import * as THREE from "three"

// galleryDataに3つの新しい作品を追加
const galleryData = [
  {
    image: "/images/new-art1.png",
    title: "神社の守り手",
    description: "鳥居の前でパンダを抱く少女。日本の伝統と現代が融合した幻想的な世界観。",
  },
  {
    image: "/images/new-art2.png",
    title: "とりか",
    description: "ピンクの髪が美しい少女の肖像。書道の文字が織りなす芸術的な表現。",
  },
  {
    image: "/images/new-art3.png",
    title: "セキジロウ",
    description: "刀を携えた武士の少年。静寂の中に秘められた強い意志を感じる作品。",
  },
  {
    image: "/images/new-art4.png",
    title: "狐面の少女",
    description: "神秘的な狐のマスクをかぶった着物姿の少女。日本の伝統文化の美しさ。",
  },
  {
    image: "/images/new-art5.png",
    title: "ヒナノジョウ",
    description: "忍者風の愛らしいキャラクターがケーキを運ぶ、ほのぼのとした日常の一コマ。",
  },
  {
    image: "/images/new-art6.png",
    title: "カルラ",
    description: "月夜に佇む黒髪の少女とカラス。ダークで神秘的な雰囲気が印象的。",
  },
  {
    image: "/images/new-art7.png",
    title: "魔法使いの猫娘",
    description: "猫耳の少女が魔法を操る幻想的なシーン。青と橙の炎が美しく舞い踊る。",
  },
  {
    image: "/images/new-art8.png",
    title: "雨宿りの少女",
    description: "傘を差した少女の憂いを帯びた表情。雨の日の情緒を表現した作品。",
  },
  {
    image: "/images/new-art9.png",
    title: "桜舞う季節",
    description: "赤髪の少女と舞い散る桜の花びら。日本の春の美しさを描いた傑作。",
  },
  {
    image: "/images/new-art10.png",
    title: "姉妹の絆",
    description: "ピンク髪と黒髪の2人の少女。和風の装飾が施された温かい友情の物語。",
  },
  {
    image: "/images/new-art11.jpeg",
    title: "十二月の雪景色",
    description: "雪降る冬の日に佇むピンク髪の少女。「十二月」の書道文字が季節の美しさを表現。",
  },
  {
    image: "/images/new-art12.jpeg",
    title: "夕暮れの忍者",
    description: "マスクで顔を隠した白髪の忍者。紫の夕焼け空が神秘的な雰囲気を演出。",
  },
  {
    image: "/images/new-art13.jpeg",
    title: "ゴジラの少年",
    description: "オレンジのサングラスが印象的な少年。カラフルなグラフィティと「ゴジラ」の文字が現代的。",
  },
]

// ランダムな位置を生成する関数
function getRandomPosition() {
  return [
    (Math.random() - 0.5) * 30, // x: -15 to 15
    (Math.random() - 0.5) * 20 + 5, // y: -5 to 15
    (Math.random() - 0.5) * 30, // z: -15 to 15
  ]
}

// 個別の画像コンポーネント（ランダム動作）
function RandomFloatingArtwork({ imageUrl, index, onSelect }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [position] = useState(() => getRandomPosition())
  const [randomSpeed] = useState(() => Math.random() * 0.5 + 0.3)
  const [randomOffset] = useState(() => Math.random() * Math.PI * 2)

  // useTextureフックを使用して画像を読み込み
  const texture = useTexture(imageUrl)

  useFrame((state) => {
    if (meshRef.current) {
      // ランダムな浮遊動作
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * randomSpeed + randomOffset) * 2
      meshRef.current.position.y =
        position[1] + Math.cos(state.clock.elapsedTime * randomSpeed * 0.7 + randomOffset) * 1.5
      meshRef.current.position.z =
        position[2] + Math.sin(state.clock.elapsedTime * randomSpeed * 0.5 + randomOffset) * 1.5

      // ランダムな回転
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * randomSpeed * 0.3) * 0.3
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * randomSpeed * 0.2) * 0.1
    }
  })

  // テクスチャの設定
  useEffect(() => {
    if (texture) {
      texture.flipY = false
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
    }
  }, [texture])

  return (
    <group>
      {/* メイン画像 */}
      <mesh
        ref={meshRef}
        scale={hovered ? 1.2 : 1}
        onClick={() => onSelect(index)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* 忍者風の光る枠 */}
      {hovered && (
        <mesh position={meshRef.current?.position || [0, 0, 0]}>
          <planeGeometry args={[3.5, 4.5]} />
          <meshBasicMaterial color="#ff6b6b" transparent opacity={0.3} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  )
}

// フォールバック用のプレーンコンポーネント
function FallbackArtwork({ index, onSelect }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [position] = useState(() => getRandomPosition())

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.2 : 1}
      onClick={() => onSelect(index)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[3, 4]} />
      <meshBasicMaterial color={hovered ? 0xff6b6b : 0x666666} />
    </mesh>
  )
}

// 安全な画像読み込みコンポーネント
function SafeArtwork(props: any) {
  try {
    return <RandomFloatingArtwork {...props} />
  } catch (error) {
    console.warn(`Failed to load image: ${props.imageUrl}`, error)
    return <FallbackArtwork {...props} />
  }
}

// 和風背景要素
function JapaneseBackground() {
  const bambooRef = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (bambooRef.current) {
      bambooRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2
    }
  })

  return (
    <group>
      {/* 竹林 */}
      <group ref={bambooRef}>
        {Array.from({ length: 20 }, (_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const radius = 25
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          return (
            <Box key={i} position={[x, Math.random() * 10 + 5, z]} scale={[0.3, Math.random() * 8 + 5, 0.3]}>
              <meshBasicMaterial color="#2d5016" transparent opacity={0.6} />
            </Box>
          )
        })}
      </group>

      {/* 雲 */}
      <group ref={cloudsRef}>
        {Array.from({ length: 8 }, (_, i) => (
          <Sphere
            key={i}
            position={[(Math.random() - 0.5) * 40, Math.random() * 5 + 15, (Math.random() - 0.5) * 40]}
            scale={[Math.random() * 3 + 2, 1, Math.random() * 3 + 2]}
          >
            <meshBasicMaterial color="#f0f0f0" transparent opacity={0.3} />
          </Sphere>
        ))}
      </group>

      {/* 月 */}
      <Sphere position={[20, 18, -20]} scale={[2, 2, 2]}>
        <meshBasicMaterial color="#ffeaa7" transparent opacity={0.8} />
      </Sphere>

      {/* 桜の花びら風パーティクル */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 50))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#ffb3d9" transparent opacity={0.7} />
      </points>
    </group>
  )
}

function Scene({ onImageSelect }: { onImageSelect: (index: number) => void }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffeaa7" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#74b9ff" />
      <pointLight position={[0, 20, 0]} intensity={0.3} color="#fd79a8" />

      <JapaneseBackground />

      {galleryData.map((item, i) => (
        <Suspense key={i} fallback={<FallbackArtwork index={i} onSelect={onImageSelect} />}>
          <SafeArtwork imageUrl={item.image} index={i} onSelect={onImageSelect} />
        </Suspense>
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        maxPolarAngle={Math.PI / 1.2}
        minPolarAngle={Math.PI / 6}
        minDistance={5}
        maxDistance={35}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

export function GalleryHeader() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // 画像のプリロード
    galleryData.forEach((item) => {
      const img = new Image()
      img.src = item.image
    })
  }, [])

  if (!isClient) {
    return (
      <div className="h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <GlitchText className="text-4xl font-bold text-white mb-4">CRYPTO NINJA FAN ART MUSEUM</GlitchText>
          <p className="text-white/70 text-lg">Loading Gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-black/30 backdrop-blur-md border-b border-purple-500/20">
          <GlitchText className="text-xl font-bold text-white">CRYPTO NINJA FAN ART MUSEUM</GlitchText>
          <button onClick={() => setShowInfo(true)} className="p-2 text-white hover:text-purple-400 transition-colors">
            <Info size={20} />
          </button>
        </header>

        <Canvas camera={{ position: [0, 8, 20], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene onImageSelect={setSelectedImage} />
          </Suspense>
        </Canvas>

        {/* 操作ヒント */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white/70">
          <p className="text-xs mb-2">画像をクリックして詳細を表示 | ドラッグして視点を変更</p>
          <div className="animate-bounce">
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* 画像詳細モーダル */}
      {selectedImage !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-md">
          <div className="bg-black/70 p-6 rounded-lg max-w-3xl max-h-[calc(100vh-8rem)] overflow-auto border border-purple-500/30">
            <img
              src={galleryData[selectedImage].image || "/placeholder.svg"}
              alt={galleryData[selectedImage].title}
              className="w-full h-auto mb-4 object-contain max-h-[60vh] rounded-lg"
            />
            <h2 className="text-2xl font-bold mb-3 text-white">{galleryData[selectedImage].title}</h2>
            <p className="mb-5 text-gray-200 text-base leading-relaxed">{galleryData[selectedImage].description}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full hover:from-purple-600 hover:to-pink-700 transition-all text-sm"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* 情報モーダル */}
      {showInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-md">
          <div className="bg-black/70 p-6 rounded-lg max-w-2xl max-h-[calc(100vh-8rem)] overflow-auto border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4 text-white">CRYPTO NINJA FAN ART MUSEUMについて</h2>
            <p className="mb-4 text-gray-200 text-base leading-relaxed">
              このギャラリーは、Crypto Ninjaの世界観にインスパイアされた美しいファンアートを3D空間で展示しています。
              忍者たちの作品がランダムに浮遊し、和風の背景と共に幻想的な体験をお楽しみください。
            </p>
            <h3 className="text-lg font-bold mb-3 text-white">操作方法</h3>
            <ul className="list-disc list-inside mb-5 text-gray-200 space-y-1 text-sm">
              <li>マウスをドラッグして、ギャラリー内を自由に移動できます</li>
              <li>画像をクリックすると、その作品の詳細情報が表示されます</li>
              <li>マウスホイールでズームイン・アウトができます</li>
              <li>作品はランダムに浮遊し、それぞれ独自の動きをします</li>
            </ul>
            <button
              onClick={() => setShowInfo(false)}
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full hover:from-purple-600 hover:to-pink-700 transition-all text-sm"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  )
}
