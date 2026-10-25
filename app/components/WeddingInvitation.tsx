"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { weddingData as wedding } from "@/app/wedding-data";
import MusicPlayer from "@/app/components/MusicPlayer";

const photos = wedding.media.gallery;

const hearts = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${(i * 23 + 5) % 100}%`,
  delay: `${(i % 6) * 1.7}s`,
  duration: `${14 + (i % 5) * 3}s`,
  size: `${12 + (i % 4) * 5}px`,
}));

function photoAt(index: number) {
  return photos[index % photos.length];
}

function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border-[5px] border-white bg-white p-1 pb-5 shadow-lg sm:pb-7 ${className}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 35vw, 220px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-7 text-center">
      {eyebrow && (
        <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#754F5C] sm:text-xs sm:tracking-[0.3em]">
          {eyebrow}
        </p>
      )}

      <h2 className="font-heading text-3xl leading-tight text-[#593744] sm:text-4xl md:text-5xl">
        {title}
      </h2>

      <div className="mx-auto mt-3 flex items-center justify-center gap-3">
        <span className="h-px w-9 bg-[#D985A0]" />
        <span className="text-sm text-[#D985A0]">♥</span>
        <span className="h-px w-9 bg-[#D985A0]" />
      </div>
    </div>
  );
}

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [slide, setSlide] = useState(0);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (photos.length <= 1) return;

    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % photos.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  function openInvitation() {
    setOpened(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F3C3D0] text-[#593744]">
      {/* Floating hearts */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart absolute bottom-[-30px] text-[#D985A0]/60"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {!opened ? (
        /* =====================================
           1. MOBILE-FIRST COVER
        ===================================== */
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F9E5E9] via-[#F3C3D0] to-[#E4EEE7]" />

          <div className="absolute left-[-70px] top-[10%] h-48 w-48 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute bottom-[5%] right-[-50px] h-48 w-48 rounded-full bg-[#D985A0]/25 blur-3xl" />

          {/* Mobile photo collage */}
          <div className="absolute left-[3%] top-[7%] z-[1] w-[24%] max-w-[112px] -rotate-[12deg] sm:left-[7%] sm:top-[9%] sm:w-36">
            <Photo src={photoAt(0)} alt="Kỷ niệm của chúng mình" />
          </div>

          <div className="absolute right-[3%] top-[11%] z-[1] w-[22%] max-w-[100px] rotate-[11deg] sm:right-[8%] sm:top-[8%] sm:w-32">
            <Photo src={photoAt(1)} alt="Ảnh cưới" />
          </div>

          <div className="absolute bottom-[13%] left-[2%] z-[1] w-[23%] max-w-[105px] rotate-[8deg] sm:bottom-[9%] sm:left-[8%] sm:w-36">
            <Photo src={photoAt(2)} alt="Khoảnh khắc hạnh phúc" />
          </div>

          <div className="absolute bottom-[10%] right-[3%] z-[1] w-[23%] max-w-[108px] -rotate-[9deg] sm:bottom-[8%] sm:right-[8%] sm:w-36">
            <Photo src={photoAt(3)} alt="Kỷ niệm tình yêu" />
          </div>

          {/* Center invitation */}
          <div className="relative z-10 my-10 w-full max-w-[390px] sm:my-12 sm:max-w-md">
            <div className="rounded-t-[42%] rounded-b-[28px] border border-white/90 bg-[#FFF9FA]/95 px-5 pb-7 pt-10 shadow-2xl shadow-[#754F5C]/20 sm:px-10 sm:pb-9 sm:pt-14">
              <p className="text-center text-[9px] uppercase tracking-[0.28em] text-[#754F5C] sm:text-xs sm:tracking-[0.35em]">
                Wedding Invitation
              </p>

              <h1 className="mt-3 text-center font-heading text-4xl italic text-[#D985A0] sm:mt-5 sm:text-5xl">
                Thiệp Mời
              </h1>

              <div className="mx-auto mt-2 h-px w-16 bg-[#D985A0]/60" />

              <p className="mt-3 text-center text-[10px] tracking-[0.16em] sm:text-xs sm:tracking-[0.2em]">
                TRÂN TRỌNG KÍNH MỜI
              </p>

              {/* Main cover photo */}
              <div className="relative mx-auto my-5 w-[67%] rotate-[-2deg] border-[6px] border-white bg-white p-1 shadow-xl sm:my-7 sm:w-[72%]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={wedding.media.cover}
                    alt={`Ảnh cưới ${wedding.bride.name} và ${wedding.groom.name}`}
                    fill
                    priority
                    sizes="(max-width: 640px) 55vw, 260px"
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-center font-heading text-[27px] leading-tight sm:text-4xl">
                {wedding.bride.name}
                <span className="mx-2 text-[#D985A0]">&</span>
                {wedding.groom.name}
              </h2>

              <p className="mt-2 text-center text-xs tracking-[0.16em] text-[#754F5C] sm:text-sm">
                {wedding.wedding.displayDate}
              </p>

              <p className="mx-auto mt-4 max-w-[250px] text-center text-xs leading-6 text-[#754F5C] sm:text-sm sm:leading-7">
                Hai trái tim, một hành trình.
                <br />
                Chúng mình mong bạn có mặt
                <br />
                trong ngày hạnh phúc này.
              </p>

              <div className="mt-6 text-center">
                <button
                  onClick={openInvitation}
                  className="wedding-button rounded-full px-7 py-3 text-xs font-semibold shadow-md sm:px-8 sm:py-3.5 sm:text-sm"
                >
                  ♡ &nbsp; Mở thiệp mời &nbsp; →
                </button>
              </div>

              <p className="mt-4 text-center font-heading text-lg italic text-[#D985A0] sm:text-xl">
                With love, forever
              </p>
            </div>
          </div>

          <span className="absolute left-[29%] top-[25%] text-xl text-white/90">
            ♡
          </span>
          <span className="absolute right-[27%] bottom-[25%] text-lg text-[#D985A0]">
            ♥
          </span>
        </section>
      ) : (
        <>
          {/* =====================================
              2. HERO: PHOTO + TEXT
          ===================================== */}
          <section className="relative bg-[#FFF9FA] pb-10 sm:pb-16">
            <div className="relative h-[64svh] min-h-[380px] max-h-[650px] sm:h-[78vh] sm:max-h-[800px]">
              <Image
                src={wedding.media.hero}
                alt="Cô dâu và chú rể"
                fill
                priority
                sizes="100vw"
                className="object-cover object-top "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#593744]/65 via-[#593744]/10 to-[#593744]/10" />

              <div className="absolute inset-x-4 bottom-8 text-center text-white sm:bottom-14">
                <p className="text-[10px] uppercase tracking-[0.3em] sm:text-xs sm:tracking-[0.4em]">
                  Our Wedding Day
                </p>

                <h1 className="mt-3 font-heading text-5xl italic leading-tight sm:text-7xl md:text-8xl">
                  {wedding.bride.name}
                  <span className="block text-[#F3C3D0]">&</span>
                  {wedding.groom.name}
                </h1>

                <p className="mt-3 text-sm tracking-[0.18em] sm:text-lg">
                  {wedding.wedding.displayDate}
                </p>
              </div>

              <div className="absolute -bottom-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#FFF9FA] bg-[#D985A0] text-lg text-white">
                ♥
              </div>
            </div>

            <div className="mx-auto max-w-xl px-6 pt-12 text-center sm:px-8 sm:pt-16">
              <p className="font-heading text-2xl italic text-[#D985A0] sm:text-3xl">
                A beautiful beginning
              </p>
              <p className="mt-3 text-sm leading-7 text-[#754F5C] sm:text-base sm:leading-8">
                Một ngày đặc biệt sẽ càng trọn vẹn hơn khi có bạn cùng chia sẻ.
                Chúng mình trân trọng mời bạn đến chung vui trong ngày hạnh phúc
                của hai đứa.
              </p>

              <a
                href="#loi-moi"
                className="mt-5 inline-flex items-center rounded-full border border-[#D985A0] px-6 py-2.5 text-xs transition hover:bg-[#D985A0] hover:text-white sm:text-sm"
              >
                Đọc lời mời ↓
              </a>
            </div>
          </section>

          {/* =====================================
              3. HEARTFELT LETTER
          ===================================== */}
          <section
            id="loi-moi"
            className="relative px-4 py-14 sm:px-6 sm:py-24"
          >
            <div className="mx-auto max-w-5xl">
              <SectionTitle
                eyebrow="Thư gửi từ chú rể và cô dâu"
                title="Lời mời thân thương"
              />

              {/* Mobile: letter first, photos underneath */}
              <div className="rounded-[24px] border border-white/80 bg-[#FFF9FA]/90 p-5 shadow-sm sm:rounded-3xl sm:p-10 md:p-12">
                <div className="space-y-4 text-sm leading-7 text-[#754F5C] sm:space-y-5 sm:text-base sm:leading-8">
                  <p>Gửi những người thân yêu của chúng mình,</p>

                  <p>
                    Sau bao nhiêu chặng đường, chúng mình thật may mắn khi tìm
                    thấy nhau, cùng viết nên câu chuyện tình yêu của riêng mình.
                    Từ những ngày đầu bỡ ngỡ đến hôm nay, mỗi khoảnh khắc đều
                    trở thành một kỷ niệm mà chúng mình muốn nâng niu.
                  </p>

                  <p>
                    Và rồi, chúng mình quyết định cùng nhau bước sang một hành
                    trình mới — hành trình của gia đình, của yêu thương, sẻ chia
                    và đồng hành.
                  </p>

                  <p>
                    Ngày vui của chúng mình sẽ thật trọn vẹn nếu có sự hiện diện
                    của bạn. Chúng mình mong được đón bạn đến chung vui, cùng
                    lưu giữ những khoảnh khắc đáng nhớ và gửi đến nhau những lời
                    chúc tốt đẹp nhất.
                  </p>

                  <p className="pt-1 font-heading text-2xl italic text-[#D985A0] sm:text-3xl">
                    Cảm ơn bạn rất nhiều! ♡
                  </p>
                </div>
              </div>

              {/* Scrapbook photos */}
              <div className="mx-auto mt-7 grid max-w-md grid-cols-2 items-start gap-5 px-3 sm:mt-10 sm:gap-8">
                <div className="-rotate-3">
                  <Photo src={photoAt(0)} alt="Kỷ niệm của chúng mình" />
                  <p className="mt-2 text-center font-heading text-sm italic sm:text-lg">
                    Together ♥
                  </p>
                </div>

                <div className="mt-8 rotate-3">
                  <Photo src={photoAt(1)} alt="Khoảnh khắc tình yêu" />
                  <p className="mt-2 text-center font-heading text-sm italic sm:text-lg">
                    Forever ♡
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================
              4. FAMILY
          ===================================== */}
          <section className="bg-[#E4EEE7] px-4 py-14 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <SectionTitle
                eyebrow="Hai gia đình"
                title="Trân trọng kính mời"
              />

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {[
                  {
                    title: "Nhà trai",
                    father: wedding.families.groom.father,
                    mother: wedding.families.groom.mother,
                    address: wedding.families.groom.address,
                    photo: photoAt(2),
                    message:
                      "Gia đình chúng tôi rất vui mừng khi được chia sẻ niềm hạnh phúc của các con cùng quý khách.",
                  },
                  {
                    title: "Nhà gái",
                    father: wedding.families.bride.father,
                    mother: wedding.families.bride.mother,
                    address: wedding.families.bride.address,
                    photo: photoAt(3),
                    message:
                      "Tình yêu thương của gia đình là hành trang để các con cùng nhau xây dựng một mái ấm hạnh phúc.",
                  },
                ].map((family) => (
                  <div
                    key={family.title}
                    className="group relative overflow-hidden rounded-[28px] border border-[#EBD7DE] bg-gradient-to-b from-[#FFFCFC] to-[#FFF4F7] p-5 shadow-[0_12px_35px_rgba(160,90,115,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(160,90,115,0.13)] sm:p-7"
                  >
                    {/* Họa tiết trang trí */}
                    <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#E9C9D4]/70" />
                    <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full border border-[#E9C9D4]/50" />

                    {/* Tiêu đề */}
                    <div className="relative mb-5 text-center">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#B77B90] sm:text-xs">
                        Trân trọng giới thiệu
                      </p>

                      <h3 className="mt-2 font-heading text-3xl text-[#754F5C] sm:text-4xl">
                        Gia đình {family.title.toLowerCase()}
                      </h3>

                      <div className="mt-3 flex items-center justify-center gap-3">
                        <span className="h-px w-10 bg-[#DDB5C2]" />
                        <span className="text-sm text-[#D985A0]">✿</span>
                        <span className="h-px w-10 bg-[#DDB5C2]" />
                      </div>
                    </div>

                    {/* Ảnh và thông tin cha mẹ */}
                    <div className="relative flex items-center gap-4 sm:gap-6">
                      <div className="w-[108px] shrink-0 -rotate-3 rounded-sm bg-white p-2 pb-5 shadow-[0_5px_18px_rgba(100,60,70,0.15)] transition-transform duration-300 group-hover:rotate-0 sm:w-36 sm:p-3 sm:pb-7">
                        <Photo src={family.photo} alt={`Ảnh ${family.title}`} />
                        <p className="mt-2 text-center font-heading text-sm italic text-[#B77B90] sm:text-base">
                          With love
                        </p>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#B77B90] sm:text-xs">
                          Kính mời quý khách
                        </p>

                        <div className="space-y-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#B77B90] sm:text-xs">
                              Ông
                            </p>
                            <p className="mt-0.5 whitespace-pre-line break-words font-heading text-lg leading-snug text-[#684552] sm:text-xl">
                              {family.father}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#B77B90] sm:text-xs">
                              Bà
                            </p>
                            <p className="mt-0.5 whitespace-pre-line break-words font-heading text-lg leading-snug text-[#684552] sm:text-xl">
                              {family.mother}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lời nhắn của gia đình */}
                    <div className="relative mt-6 rounded-2xl border border-[#F0DCE2] bg-white/70 px-4 py-4 text-center sm:px-5">
                      <span className="font-heading text-3xl leading-none text-[#D9A0B2]">
                        “
                      </span>
                      <p className="mx-auto max-w-sm font-heading text-lg italic leading-relaxed text-[#8B6170] sm:text-xl">
                        {family.message}
                      </p>
                      <span className="font-heading text-3xl leading-none text-[#D9A0B2]">
                        ”
                      </span>
                    </div>

                    {/* Địa chỉ gia đình */}
                    <div className="relative mt-4 flex items-start gap-3 rounded-xl bg-[#F8E9EE]/70 px-4 py-3">
                      <span className="mt-0.5 text-lg text-[#C47F98]">⌖</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#B77B90] sm:text-xs">
                          Địa chỉ gia đình
                        </p>
                        <p className="mt-1 whitespace-pre-line break-words text-xs leading-6 text-[#754F5C] sm:text-sm sm:leading-7">
                          {family.address}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================
              5. WEDDING DETAILS
          ===================================== */}
          <section className="bg-[#F3C3D0] px-4 py-14 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <SectionTitle eyebrow="Save the date" title="Thông tin lễ cưới" />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                {[
                  {
                    icon: "♡",
                    title: "Ngày tổ chức",
                    value: wedding.wedding.displayDate,
                  },
                  {
                    icon: "◷",
                    title: "Giờ làm lễ",
                    value: wedding.wedding.ceremony,
                  },
                  {
                    icon: "♧",
                    title: "Tiệc mừng",
                    value: wedding.wedding.reception,
                  },
                  {
                    icon: "⌖",
                    title: "Địa điểm",
                    link: "https://www.google.com/maps/search/?api=1&query=20.501129150390625,106.07402801513672&gidzl=N2PgSSssfbbMC69opQgkNLWsQdNK-FeA4pHkBuFu-L10P3rqswx-2nnbEII7-wuEGs1iSpcYgFKSohwcMW",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-white/90 bg-[#FFF9FA]/90 px-3 py-5 text-center shadow-sm sm:min-h-[175px] sm:px-5"
                  >
                    <span className="text-2xl text-[#D985A0] sm:text-3xl">
                      {item.icon}
                    </span>

                    <h3 className="mt-2 text-[10px] uppercase tracking-wider text-[#754F5C] sm:text-xs">
                      {item.title}
                    </h3>

                    <p className="mt-2 break-words font-heading text-base leading-snug sm:text-xl">
                      {item.value}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-[#D985A0] hover:text-[#B86B8A]"
                      >
                        Xem trên Google Maps
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================
              6. PHOTO GALLERY
          ===================================== */}
          <section className="px-4 py-14 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-6xl">
              <SectionTitle
                eyebrow="Our sweetest memories"
                title="Khoảnh khắc của chúng mình"
              />

              <p className="mx-auto mb-8 max-w-sm text-center text-xs leading-6 text-[#754F5C] sm:mb-12 sm:text-sm sm:leading-7">
                Mỗi bức ảnh là một mảnh ghép nhỏ trong hành trình yêu thương.
              </p>

              {/* Mobile photo collage */}
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -left-1 top-8 z-10 w-[23%] -rotate-[8deg] sm:left-0 sm:w-32">
                  <Photo
                    src={photoAt((slide + 1) % photos.length)}
                    alt="Ảnh kỷ niệm"
                  />
                </div>

                <div className="absolute -right-1 bottom-8 z-10 w-[23%] rotate-[8deg] sm:right-0 sm:w-32">
                  <Photo
                    src={photoAt((slide + 2) % photos.length)}
                    alt="Ảnh cưới"
                  />
                </div>

                <div className="mx-auto w-[78%] rotate-[-2deg] bg-white p-2 pb-8 shadow-xl sm:w-[72%] sm:p-4 sm:pb-12">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#E4EEE7] sm:aspect-[4/3]">
                    {photos.map((photo, index) => (
                      <Image
                        key={`${photo}-${index}`}
                        src={photo}
                        alt={`Kỷ niệm ${index + 1} của cô dâu chú rể`}
                        fill
                        sizes="(max-width: 640px) 75vw, 600px"
                        className={`gallery-image ${
                          index === slide ? "is-active" : ""
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-3 text-center font-heading text-base italic text-[#754F5C] sm:text-xl">
                    Forever starts with you ♡
                  </p>
                </div>

                <button
                  onClick={() =>
                    setSlide((slide - 1 + photos.length) % photos.length)
                  }
                  aria-label="Ảnh trước"
                  className="absolute left-0 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#D985A0] text-xl text-white shadow-md sm:-left-2 sm:h-11 sm:w-11"
                >
                  ‹
                </button>

                <button
                  onClick={() => setSlide((slide + 1) % photos.length)}
                  aria-label="Ảnh tiếp theo"
                  className="absolute right-0 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#D985A0] text-xl text-white shadow-md sm:-right-2 sm:h-11 sm:w-11"
                >
                  ›
                </button>
              </div>

              {/* Gallery indicators */}
              <div className="mt-7 flex justify-center gap-2">
                {photos.map((photo, index) => (
                  <button
                    key={`${photo}-dot-${index}`}
                    onClick={() => setSlide(index)}
                    aria-label={`Chuyển đến ảnh ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      slide === index
                        ? "w-6 bg-[#D985A0]"
                        : "w-2 bg-[#D985A0]/40"
                    }`}
                  />
                ))}
              </div>

              {/* Polaroid thumbnails */}
              <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5 lg:grid-cols-6">
                {photos.map((photo, index) => (
                  <button
                    key={`${photo}-thumb-${index}`}
                    onClick={() => setSlide(index)}
                    aria-label={`Xem ảnh số ${index + 1}`}
                    className={`transition duration-300 hover:-translate-y-1 ${
                      index % 2 === 0 ? "-rotate-3" : "rotate-3"
                    } ${slide === index ? "scale-105" : ""}`}
                  >
                    <Photo src={photo} alt={`Ảnh kỷ niệm ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================
              7. THANK YOU + QR
          ===================================== */}
          <section className="bg-[#FFF9FA]/85 px-4 py-14 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
                <div className="rounded-3xl bg-[#F3C3D0]/45 p-5 sm:p-8">
                  <SectionTitle title="Một chút yêu thương" />

                  <p className="text-sm leading-7 text-[#754F5C] sm:text-base sm:leading-8">
                    Cảm ơn bạn đã dành thời gian đọc thiệp mời và luôn yêu
                    thương, đồng hành cùng chúng mình. Sự hiện diện và lời chúc
                    của bạn là món quà vô cùng ý nghĩa trong ngày đặc biệt này.
                  </p>

                  <p className="mt-4 font-heading text-2xl italic text-[#D985A0] sm:text-3xl">
                    Hẹn gặp bạn trong ngày vui nhé! ♡
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 px-2">
                    <div className="-rotate-3">
                      <Photo src={photoAt(5)} alt="Khoảnh khắc đáng nhớ" />
                    </div>

                    <div className="mt-6 rotate-3">
                      <Photo src={photoAt(6)} alt="Kỷ niệm tình yêu" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#E8D7DC] bg-[#F3C3D0]/45 p-6 text-center sm:p-9">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#754F5C] sm:text-xs">
                    With love, forever
                  </p>

                  <h2 className="mt-4 font-heading text-4xl italic leading-tight sm:text-5xl">
                    {wedding.bride.name}
                    <span className="block text-[#D985A0]">&</span>
                    {wedding.groom.name}
                  </h2>

                  <p className="mt-4 text-sm tracking-widest">
                    {wedding.wedding.displayDate}
                  </p>

                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="wedding-button mt-6 rounded-full px-7 py-3 text-xs font-medium sm:text-sm"
                  >
                    {showQR ? "Ẩn mã QR ↑" : "Xem mã QR →"}
                  </button>

                  {showQR && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {[
                        {
                          label: "Cô dâu",
                          src: wedding.bride.qr,
                        },
                        {
                          label: "Chú rể",
                          src: wedding.groom.qr,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-[#E8D7DC] bg-white p-3"
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={item.src}
                              alt={`Mã QR ${item.label}`}
                              fill
                              sizes="160px"
                              className="object-contain"
                            />
                          </div>

                          <p className="mt-2 text-xs text-[#754F5C] sm:text-sm">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12 text-center sm:mt-16">
                <span className="text-xl text-[#D985A0]">♡</span>
                <p className="mt-2 font-heading text-xl italic text-[#D985A0] sm:text-2xl">
                  Thank you for being part of our story
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[#754F5C]">
                  Made with love ♥
                </p>
              </div>
            </div>
          </section>
        </>
      )}
      <MusicPlayer src={wedding.music} />
    </main>
  );
}
