import type { ContentItem } from "@/types";

export const mockContents: ContentItem[] = [
  {
    id: "1",
    query: "Galatasaray - Fenerbahçe maç sonucu",
    content:
      "Galatasaray, Türk futbolunun en büyük derbisinde Fenerbahçe'yi 3-1 mağlup etti. Maçın gollerini Icardi (2) ve Zaha attı. Fenerbahçe'nin tek golü Dzeko'dan geldi.",
    sources: ["trt.com.tr", "ntvspor.net"],
    status: "published",
    created_at: "2026-06-15T10:30:00Z",
    updated_at: "2026-06-15T12:00:00Z",
  },
  {
    id: "2",
    query: "Beşiktaş transfer haberleri Haziran 2026",
    content:
      "Beşiktaş, yaz transfer döneminde Portekizli orta saha oyuncusu Rui Silva ile 3 yıllık sözleşme imzaladı. Kulüp ayrıca sol bek pozisyonu için görüşmeler sürdürüyor.",
    sources: ["fanatik.com.tr", "sporx.com"],
    status: "published",
    created_at: "2026-06-14T09:00:00Z",
    updated_at: null,
  },
  {
    id: "3",
    query: "Trabzonspor Şampiyonlar Ligi ön eleme",
    content:
      "Trabzonspor, UEFA Şampiyonlar Ligi ön eleme turunda İskoç ekibi Celtic ile eşleşti. İlk maç Trabzon'da oynanacak.",
    sources: ["hurriyet.com.tr"],
    status: "published",
    created_at: "2026-06-13T14:20:00Z",
    updated_at: "2026-06-13T15:00:00Z",
  },
  {
    id: "4",
    query: "Fenerbahçe kadro analizi 2026-27 sezonu",
    content:
      "Fenerbahçe yeni sezon hazırlıklarında kadro güçlendirmesine gidiyor. Teknik direktör değerlendirmeleri devam ediyor.",
    sources: ["milliyet.com.tr", "sabah.com.tr"],
    status: "draft",
    created_at: "2026-06-16T08:00:00Z",
    updated_at: null,
  },
  {
    id: "5",
    query: "Galatasaray Şampiyonlar Ligi grup aşaması",
    content:
      "Galatasaray bu sezon Şampiyonlar Ligi grup aşamasında Bayern Münih, PSG ve Real Madrid ile aynı grupta yer alacak.",
    sources: ["trt.com.tr"],
    status: "draft",
    created_at: "2026-06-16T09:15:00Z",
    updated_at: null,
  },
  {
    id: "6",
    query: "Milli takım Dünya Kupası elemeleri",
    content:
      "Türkiye Milli Futbol Takımı, 2028 Dünya Kupası elemeleri A Grubu'nda yer alıyor. İlk maç Eylül ayında oynanacak.",
    sources: ["ntvspor.net", "sporx.com"],
    status: "draft",
    created_at: "2026-06-16T11:00:00Z",
    updated_at: null,
  },
];
