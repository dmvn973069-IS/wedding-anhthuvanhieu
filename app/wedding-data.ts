export const weddingData = {
  bride: {
    name: "Anh Thư",
    qr: "/qr/bride-qr.png",
  },

  groom: {
    name: "Văn Hiếu",
    qr: "/qr/groom-qr.png",
  },

  wedding: {
    date: "2026-11-28",
    displayDate: "28 . 11 . 2026",
    ceremony: "12:20, Chủ nhật (29/11/2026)",
    reception: "16:30, Thứ Bảy (28/11/2026)",
  },

  families: {
    bride: {
      father: "Lã Văn Viết",
      mother: "Trịnh Thị Thơm",
      address: "Thôn Tân Phong, xã Bình An, Tỉnh Ninh Bình",
    },
    groom: {
      father: "Trần Văn Hưng",
      mother: "Cù Thị Thắm",
      address: "Thôn Tiên Xuân, xã Bình An, Tỉnh Ninh Bình",
    },
  },

  site: {
    title: "Thiệp cưới Anh Thư & Văn Hiếu",
    description:
      "Trân trọng mời bạn đến chung vui trong ngày hạnh phúc của Anh Thư và Văn Hiếu.",
  },

  media: {
    cover: "/images/couple-09.jpg",
    hero: "/images/couple-04.jpg",
    gallery: [
      "/images/couple-01.jpg",
      "/images/couple-02.jpg",
      "/images/couple-03.jpg",
      "/images/couple-05.jpg",
      "/images/couple-06.jpg",
      "/images/couple-07.jpg",
      "/images/couple-08.jpg",
    ],
    ogImage: "/images/couple-04.jpg",
  },
  music: "/audio/music.mp3",
} as const;
