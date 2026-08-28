# Cebeci Medikal Kurumsal Web Platformu

## PRD + SRS + SAD + UI/UX + Branding + Güvenlik + KVKK/Gizlilik + SEO + Analitik + Test ve Yayına Alma Spesifikasyonu

**Doküman sürümü:** 1.0\
**Durum:** Tasarım ve geliştirme ana referans dokümanı\
**Hedef:** Mevcut Cebeci Medikal web sitesinin eski/öğrenci projesi
seviyesinden, gerçek bir medikal şirketinin kurumsal ihtiyaçlarını
karşılayan, premium, güvenilir, erişilebilir, çok dilli, tamamen dinamik
ve yönetilebilir bir dijital platforma dönüştürülmesi.

------------------------------------------------------------------------

## 1. Proje Özeti

Cebeci Medikal web sitesi yalnızca görsel olarak yenilenmeyecek; içerik
yönetimi, ürün vitrini, teklif talebi, hizmet sunumu, kurumsal iletişim,
ziyaretçi analitiği, çoklu dil, erişilebilirlik, güvenlik, SEO ve
yönetim operasyonları baştan tasarlanacaktır.

Platform bir **e-ticaret sitesi değildir**. Ürünlerin çevrim içi satın
alınması, sepet, ödeme ve stoktan doğrudan satış gibi e-ticaret akışları
kapsam dışıdır. Platformun temel ticari amacı:

1.  Ürünleri profesyonel bir katalog/vitrin şeklinde sunmak.
2.  Kullanıcıyı doğru ürün veya hizmete yönlendirmek.
3.  Ürün/hizmet hakkında teklif talebi oluşturmasını sağlamak.
4.  WhatsApp, telefon, e-posta ve iletişim formu üzerinden ticari
    iletişimi kolaylaştırmak.
5.  Cebeci Medikal'in kurumsal güvenilirliğini yükseltmek.
6.  Yönetimin siteyi geliştiriciye ihtiyaç duymadan yönetebilmesini
    sağlamak.
7.  Ziyaretçi davranışlarını KVKK ve uygulanabilir diğer gizlilik
    mevzuatlarına uygun şekilde ölçmek.
8.  Türkçe, İngilizce, Arapça, Almanca, Japonca ve Çince içerikleri
    gerçek i18n altyapısı ile yönetmek.

Mevcut sitenin içerik yapısında ürünler, ikinci el tıbbi cihazlar,
danışmanlık, teknik servis, iletişim ve çeşitli tıbbi cihaz kategorileri
bulunmaktadır. Mevcut sitede 2015'ten beri sektör deneyimi ve 2021
yılında CBC Medikal'in resmi faaliyete geçtiği bilgisi yer almaktadır.
Yeni platform bu mevcut kurumsal bilgileri koruyacak ancak içerik
mimarisini, dilini ve sunumunu yeniden yapılandıracaktır.

------------------------------------------------------------------------

# 2. Temel Ürün İlkeleri

## 2.1 Birinci sınıf kurumsal görünüm

Site:

-   amatör,
-   şablon,
-   jenerik AI sitesi,
-   e-ticaret şablonu,
-   aşırı animasyonlu teknoloji startup sitesi

gibi görünmemelidir.

Hedef algı:

> **Güvenilir medikal teknoloji şirketi + teknik uzmanlık + kurumsal
> ciddiyet + modern mühendislik + premium sunum**

Tasarım; hastane, klinik, biyomedikal mühendislik, tıbbi cihaz ve sağlık
teknolojileri sektörlerinin görsel dilini taşımalıdır.

## 2.2 İçerik önceliklidir

Animasyon içerikten daha önemli değildir.

Her bölüm:

-   anlamlı,
-   okunabilir,
-   hızlı,
-   erişilebilir,
-   ticari amaca hizmet eden

bir içerik taşımalıdır.

## 2.3 Gerçek veri ilkesi

Aşağıdakiler yasaktır:

-   placeholder metin,
-   lorem ipsum,
-   sahte ürün,
-   çalışmayan buton,
-   sahte istatistik,
-   sahte referans,
-   gerçekte olmayan servis,
-   varmış gibi görünen API,
-   statik/hardcoded ürün listesi,
-   statik/hardcoded yönetim paneli verisi.

Mevcut gerçek veriler kullanılmalı; eksik bilgiler admin panelinden
doldurulabilmeli ve yayınlanmadan önce onaylanmalıdır.

## 2.4 AI üretimi içerik doğrulanmadan yayınlanmamalıdır

Ürün görselleri mevcut gerçek siteden alınabilir ve ürün sayfası için
ilk taslak içerik üretiminde AI kullanılabilir.

Ancak:

-   AI ürünün teknik özelliklerini uydurmamalıdır.
-   Görselde görünmeyen teknik özellikler kesin bilgi olarak
    yazılmamalıdır.
-   Ürün üreticisi/modeli doğrulanmadan kesinleştirilmemelidir.
-   AI tarafından oluşturulan ürün açıklaması `draft` olarak
    kaydedilmelidir.
-   Admin onayı olmadan public yayın yapılmamalıdır.

------------------------------------------------------------------------

# 3. Kapsam

## 3.1 Public website

-   Ana Sayfa
-   Hakkımızda
-   Ürünler
-   Ürün detay
-   Ürün kategorileri
-   İkinci El Tıbbi Cihazlar
-   Hizmetler
-   Hizmet detay
-   Danışmanlık
-   Teknik Servis
-   Referanslar
-   Kataloglar
-   İletişim
-   Teklif Talebi
-   Arama
-   SSS
-   Blog/Haberler için geleceğe hazır yapı
-   KVKK Aydınlatma Metni
-   Gizlilik Politikası
-   Çerez Politikası
-   Çerez Tercihleri
-   Kullanım Koşulları
-   Yasal Uyarı
-   Erişilebilirlik bildirimi
-   404
-   500
-   bakım modu

## 3.2 Admin panel

-   Dashboard
-   Sayfa yönetimi
-   Menü yönetimi
-   Ürün yönetimi
-   Kategori yönetimi
-   Hizmet yönetimi
-   Referans yönetimi
-   Katalog yönetimi
-   Medya kütüphanesi
-   Dil yönetimi
-   Teklif talepleri
-   İletişim mesajları
-   Ziyaretçi analitiği
-   Arama analitiği
-   SEO yönetimi
-   Çerez/gizlilik yönetimi
-   Kullanıcı/rol yönetimi
-   Sistem ayarları
-   Audit log
-   Bildirimler
-   İçerik taslak/yayın akışı

------------------------------------------------------------------------

# 4. Marka ve Branding

## 4.1 Marka adı

Public header:

**CEBECİ MEDİKAL**

Logo ilk sürümde kullanılmayacaktır. Tipografik wordmark yeterlidir.

Logo daha sonra entegre edildiğinde:

-   header boyutları değişmemeli,
-   responsive layout bozulmamalı,
-   dark/light temalarda logo varyantı desteklenmeli.

## 4.2 Marka karakteri

Marka algısı:

-   güvenilir,
-   teknik,
-   profesyonel,
-   sakin,
-   modern,
-   çözüm odaklı,
-   medikal,
-   premium,
-   şeffaf.

Kaçınılacak dil:

-   aşırı reklam dili,
-   bağıran sloganlar,
-   gereksiz ünlem,
-   abartılı iddialar,
-   kanıtlanmamış "Türkiye'nin en iyi" vb. ifadeler.

## 4.3 Renk sistemi

Dört tema desteklenecektir:

1.  Black
2.  White
3.  Navy
4.  Green

Tema sistemi CSS değişkenleri üzerinden semantic token mantığıyla
kurulmalıdır.

### Navy tema --- önerilen ana kurumsal tema

``` text
--color-bg: #07141C
--color-surface: #0D202B
--color-surface-2: #122B37
--color-text: #F5F8FA
--color-text-muted: #AAB8BF
--color-primary: #1F8A70
--color-primary-hover: #27A184
--color-border: #24404B
```

### White tema

``` text
--color-bg: #F7F9FA
--color-surface: #FFFFFF
--color-surface-2: #EEF3F5
--color-text: #101820
--color-text-muted: #58666E
--color-primary: #176B59
--color-primary-hover: #125545
--color-border: #D9E1E5
```

### Black tema

``` text
--color-bg: #050607
--color-surface: #0D0F10
--color-surface-2: #151819
--color-text: #F5F5F5
--color-text-muted: #A7ACAE
--color-primary: #29A37F
--color-primary-hover: #38B68F
--color-border: #292D2E
```

### Green tema

``` text
--color-bg: #061612
--color-surface: #0B211B
--color-surface-2: #103027
--color-text: #F2FAF7
--color-text-muted: #A8BDB6
--color-primary: #45B890
--color-primary-hover: #5CC8A1
--color-border: #234B40
```

### Tasarım kuralı

Altın sarısı, mevcut eski tasarımın ana aksan rengi olarak
kullanılmamalıdır. Yeni marka sistemi siyah/beyaz/lacivert/yeşil
ekseninde kurulacaktır.

------------------------------------------------------------------------

# 5. Tipografi

Premium kurumsal medikal görünüm için:

-   Başlık fontu: modern serif veya yüksek kaliteli editorial serif
-   Gövde fontu: modern sans-serif
-   UI fontu: aynı sans-serif ailesi

Öneri:

-   Headings: `DM Serif Display` veya lisans/performans kontrolü
    yapılmış benzer bir serif
-   Body/UI: `Inter`

Ancak Japonca ve Çince için Latin fontu zorla kullanılmamalıdır.

Dil bazlı font fallback sistemi:

``` text
Latin:
Inter

Arabic:
Noto Sans Arabic

Japanese:
Noto Sans JP

Chinese:
Noto Sans SC / Noto Sans TC
```

Fontlar performans için subset edilmelidir.

------------------------------------------------------------------------

# 6. İkonografi

Emoji kullanımı kesinlikle yasaktır.

Kullanılacak ikonlar:

-   Lucide
-   Phosphor
-   Heroicons
-   veya lisansı uygun başka profesyonel SVG icon library

İkonlar:

-   aynı stroke ağırlığında,
-   aynı optik ölçekte,
-   aynı renk sistemine bağlı,
-   tooltip ile desteklenebilir

olmalıdır.

Emoji yerine:

-   telefon SVG,
-   WhatsApp SVG,
-   mail SVG,
-   harita SVG,
-   arama SVG,
-   menü SVG,
-   servis SVG,
-   medikal cihaz SVG,
-   bakım SVG

kullanılmalıdır.

------------------------------------------------------------------------

# 7. Dil ve i18n

Desteklenecek diller:

  Kod   Dil
  ----- ---------
  tr    Türkçe
  en    English
  ar    العربية
  de    Deutsch
  ja    日本語
  zh    中文

Türkçe varsayılan dildir.

## 7.1 %100 çeviri

Sadece ana içerik değil:

-   navbar,
-   footer,
-   butonlar,
-   form alanları,
-   validation mesajları,
-   hata mesajları,
-   SEO title,
-   SEO description,
-   breadcrumb,
-   cookie paneli,
-   admin paneli,
-   arama,
-   pagination,
-   filtreler,
-   ürün özellikleri,
-   teklif formu,
-   başarı mesajları,
-   hata mesajları,
-   404,
-   500

çevirilebilir olmalıdır.

## 7.2 RTL

Arapça için:

-   `dir="rtl"`
-   RTL-aware spacing
-   ikon yönleri
-   modal yerleşimi
-   breadcrumb
-   slider
-   navigation

test edilmelidir.

## 7.3 Dil URL stratejisi

Öneri:

``` text
/tr
/en
/ar
/de
/ja
/zh
```

Örnek:

``` text
/tr/urunler
/en/products
/ar/products
/de/produkte
/ja/products
/zh/products
```

SEO için her sayfada `hreflang` kullanılmalıdır.

------------------------------------------------------------------------

# 8. Site Bilgi Mimarisi

## Ana menü

``` text
CEBECİ MEDİKAL

Ana Sayfa
Kurumsal
Ürünler
Hizmetler
2. El Tıbbi Cihazlar
Referanslar
Kataloglar
İletişim
[Arama]
[Teklif Al]
[WhatsApp]
[Dil]
[Tema]
```

Kurumsal dropdown:

-   Hakkımızda
-   Misyon & Vizyon
-   Kalite Yaklaşımımız
-   Referanslar
-   Kataloglar

Hizmetler dropdown:

-   Teknik Servis
-   Bakım & Onarım
-   Kurulum & Devreye Alma
-   Periyodik Bakım
-   Teknik Danışmanlık
-   Yedek Parça & Aksesuar
-   Tıbbi Cihaz Tedarik Danışmanlığı
-   Sağlık Yatırımı / İşletme Danışmanlığı

Not: Bir hizmet gerçek hayatta verilmiyorsa public olarak
yayınlanmamalıdır. Bu liste önerilen bilgi mimarisidir; şirket yönetimi
tarafından onaylanmalıdır.

------------------------------------------------------------------------

# 9. Ana Sayfa PRD

Ana sayfa kullanıcının ilk 10 saniyede şu soruların cevabını almasını
sağlamalıdır:

1.  Cebeci Medikal ne yapıyor?
2.  Hangi ürünleri/hizmetleri sunuyor?
3.  Neden güvenmeliyim?
4.  Nasıl iletişime geçebilirim?
5.  Teklif nasıl isteyebilirim?

## 9.1 Hero

Hero çok güçlü olmalıdır.

Önerilen yapı:

Sol:

``` text
Tıbbi Teknolojilerde
Güvenilir Çözüm Ortağınız

Tıbbi cihaz tedariki, teknik servis, bakım, onarım ve
profesyonel danışmanlık çözümleri.
```

CTA:

-   Ürünleri İncele
-   Teklif İste

Sağ:

-   gerçek medikal cihaz görseli,
-   teknik çizim hissi,
-   soft parallax,
-   çok düşük yoğunluklu grid,
-   mikro ışık efektleri.

Hero'da gereksiz video kullanılmamalıdır.

## 9.2 Güven göstergeleri

Gerçek veriler admin panelinden:

``` text
X+ Yıllık Deneyim
X+ Teknik Servis
X+ Ürün
X+ Sağlık Kuruluşu
```

Mevcut sitedeki 675+, 1350+, 3000+ gibi sayıların doğruluğu şirket
tarafından teyit edilmeden yeni sitede kullanılmaması gerekir.

## 9.3 Ürün kategorileri

Kartlar:

-   Ameliyathane
-   Yoğun Bakım / Yaşam Destek
-   Laboratuvar
-   Fizyolojik Sinyal İzleme
-   Medikal Gaz Sistemleri
-   Endovizyon
-   Sarf Malzemeler
-   2.  El Tıbbi Cihazlar

Her kart:

-   gerçek görsel,
-   kategori adı,
-   kısa açıklama,
-   ürün sayısı,
-   incele CTA

içermelidir.

Hover:

-   hafif scale,
-   ışık/radial gradient,
-   border highlight,
-   ikon hareketi.

Aşırı animasyon kullanılmamalıdır.

## 9.4 Hizmetler

Öne çıkan hizmetler:

### Teknik Servis

Arıza tespiti, bakım, onarım ve fonksiyon kontrolü.

### Periyodik Bakım

Planlı bakım ve cihaz performansının korunması.

### Kurulum & Devreye Alma

Cihazın kurulum ve ilk çalıştırma süreçleri.

### Teknik Danışmanlık

Cihaz seçimi, kullanım ve teknik süreçler.

### Yedek Parça & Aksesuar

Uygun ve doğrulanabilir parça/aksesuar tedariği.

### Tıbbi Cihaz Tedariki

İhtiyaca uygun ürün araştırma ve tekliflendirme.

Bu kapsam mevcut ticari faaliyetlerle doğrulanmalıdır.

## 9.5 Kurumsal hikâye

Timeline:

``` text
2015
Sektör deneyiminin başlangıcı

2021
CBC Medikal'in resmi faaliyeti

Bugün
Tıbbi cihaz + teknik servis + danışmanlık

Gelecek
Ulusal ve uluslararası büyüme
```

Bu veriler mevcut Cebeci Medikal içeriğindeki kurumsal bilgilerden
türetilmiştir ve admin tarafından düzenlenebilir olmalıdır.

## 9.6 Referanslar

Kullanıcının gönderdiği mevcut ekran görüntüsündeki yapı referans
alınabilir.

Mevcut görselde:

-   sol tarafta başlık,
-   dekoratif merkez grafik,
-   müşteri yorumları,
-   yıldız değerlendirmesi,
-   yatay/ızgara kart sistemi

bulunmaktadır.

Yeni sürümde sahte isim ve yorumlar kullanılmamalıdır.

Gerçek referanslar admin panelinden:

``` text
kurum adı
sektör
şehir
logo
proje/hizmet
açıklama
yayın izni
```

ile yönetilmelidir.

Müşteri yorumu yayınlanacaksa yayın izni alınmalıdır.

## 9.7 Güven / süreç bölümü

Örnek:

``` text
İhtiyacınızı Anlıyoruz
        ↓
Uygun Çözümü Belirliyoruz
        ↓
Tekliflendiriyoruz
        ↓
Tedarik / Servis
        ↓
Teslim / Teknik Destek
```

## 9.8 CTA

Sayfanın sonuna:

``` text
İhtiyacınız için doğru çözümü birlikte belirleyelim.

Ürün veya hizmet hakkında bilgi almak için bize ulaşın.
```

CTA:

-   Teklif İste
-   WhatsApp'tan Yaz
-   İletişime Geç

------------------------------------------------------------------------

# 10. Ürünler

## 10.1 Ürün listeleme

Filtreler:

-   Kategori
-   Alt kategori
-   Marka
-   Model
-   Durum
-   Yeni / 2. El
-   Hizmet verilen kullanım alanı
-   Arama

Sort:

-   Öne çıkan
-   Yeni eklenen
-   Alfabetik

Fiyat gösterimi zorunlu değildir.

Ürün kartında:

-   gerçek ürün fotoğrafı,
-   ürün adı,
-   marka/model,
-   kategori,
-   kısa açıklama,
-   Teklif İste,
-   İncele

bulunmalıdır.

## 10.2 Ürün detay

Her ürünün benzersiz URL'si:

``` text
/tr/urunler/<slug>
```

Örnek:

``` text
/tr/urunler/...
```

Sayfa:

-   breadcrumb
-   ürün galerisi
-   büyük görsel
-   thumbnail
-   fullscreen/lightbox
-   zoom
-   ürün adı
-   marka
-   model
-   kategori
-   durum
-   açıklama
-   teknik özellikler
-   kullanım alanları
-   ilgili ürünler
-   teklif iste CTA
-   WhatsApp CTA

### Görsel inceleme

Kullanıcı:

-   görseli büyütebilmeli,
-   fullscreen açabilmeli,
-   zoom yapabilmeli,
-   mobilde pinch-to-zoom kullanabilmeli.

## 10.3 Ürün görsellerinin migrasyonu

Kodlama ajanına açık talimat:

> Mevcut Cebeci Medikal/CBC Medikal sitesindeki gerçek ürün görsellerini
> tespit et, görselleri ürünlerle eşleştir, mümkün olan en yüksek
> çözünürlükte medya kütüphanesine aktar ve ürün kayıtlarına bağla.
> Placeholder image kullanma. Görsel ile ürün eşleşmesi belirsizse ürünü
> otomatik yayınlama; admin inceleme kuyruğuna gönder.

Görsellerin telif/lisans kullanım hakkı şirket tarafından
doğrulanmalıdır.

------------------------------------------------------------------------

# 11. Ürün İçerik Modeli

Her ürün:

``` text
id
slug
status
category_id
brand
model
sku/internal_code
condition
title_tr
title_en
title_ar
title_de
title_ja
title_zh
description_*
short_description_*
technical_specs
applications
images
documents
featured
seo_title_*
seo_description_*
created_at
updated_at
published_at
```

`status`:

``` text
draft
review
published
archived
```

AI-generated content:

``` text
ai_generated = true
human_reviewed = false
```

yayınlanmamalıdır.

------------------------------------------------------------------------

# 12. Hizmetler

Önerilen bilgi mimarisi:

1.  Teknik Servis
2.  Arıza Tespit
3.  Bakım & Onarım
4.  Periyodik Koruyucu Bakım
5.  Kurulum & Devreye Alma
6.  Teknik Kontrol & Fonksiyon Testleri
7.  Yedek Parça & Aksesuar Tedariki
8.  Teknik Danışmanlık
9.  Tıbbi Cihaz Tedarik Danışmanlığı
10. İşletme / Yatırım Danışmanlığı
11. 2.  El Cihaz Değerlendirme ve Tedarik

Bu hizmetler sektör sitelerinde yaygın olarak görülen teknik servis,
bakım, onarım, kurulum, yedek parça, danışmanlık ve cihaz tedarik
süreçleriyle uyumludur; Cebeci Medikal'in gerçekten sunduğu hizmetler
yönetim tarafından doğrulanmalıdır.

------------------------------------------------------------------------

# 13. Teklif Talep Sistemi

Bu platform e-ticaret değildir.

Teklif talebi birincil dönüşüm mekanizmasıdır.

## 13.1 Form

Zorunlu:

-   Ad Soyad
-   Firma/Kurum
-   E-posta
-   Telefon
-   Şehir
-   Talep konusu
-   Mesaj
-   KVKK/onay kutusu

Opsiyonel:

-   Ürün
-   Marka
-   Model
-   Adet
-   Dosya/teknik doküman
-   Tercih edilen iletişim kanalı

## 13.2 Ürün üzerinden teklif

Ürün detayında:

`Bu Ürün İçin Teklif İste`

butonu.

Form açıldığında:

``` text
Ürün: [otomatik]
Ürün ID: [hidden backend reference]
```

kullanılmalı.

Kullanıcı ürün seçimini değiştirebilmelidir.

## 13.3 Spam koruması

-   rate limit
-   honeypot
-   CSRF
-   server-side validation
-   CAPTCHA yalnızca gerektiğinde
-   IP abuse throttling
-   disposable email detection opsiyonel

## 13.4 Bildirim

Yeni teklif:

-   admin panelinde görünür,
-   e-posta bildirimi,
-   opsiyonel WhatsApp/harici bildirim entegrasyonu,
-   durum takibi

``` text
Yeni
İnceleniyor
Teklif Hazırlanıyor
İletişime Geçildi
Sonuçlandı
Kapatıldı
Spam
```

------------------------------------------------------------------------

# 14. WhatsApp

Site genelinde sabit fakat rahatsız etmeyen WhatsApp CTA olabilir.

Ürün sayfasında dinamik mesaj:

``` text
Merhaba, [Ürün Adı] hakkında fiyat teklifi almak istiyorum.
```

Genel CTA:

``` text
Merhaba, Cebeci Medikal hakkında bilgi almak istiyorum.
```

Telefon numarası admin panelinden yönetilmelidir.

WhatsApp numarası UI koduna hardcoded edilmemelidir.

------------------------------------------------------------------------

# 15. İletişim

Mevcut verilen bilgiler:

-   E-posta: cbcmedikal@gmail.com
-   Telefonlar:
    -   +90 506 606 15 40
    -   +90 506 835 57 41
-   Adres:
    -   Fevzi Çakmak Mahallesi, Cumhuriyet Bulvarı No: 83/A, Sincan /
        Ankara

Adres admin panelinden düzenlenebilir olmalıdır.

## Sosyal medya

Facebook:

https://www.facebook.com/cebeci.medikal/

Instagram:

https://www.instagram.com/cbcmedikal

Google Maps:

Cebeci Medikal Google Maps kaydı.

Google Maps embed:

``` html
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1527.9390696789906!2d32.5200753!3d40.0111695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d32fe1ff03044d%3A0x95404729878581f0!2sCebeci%20Medikal!5e0!3m2!1str!2str!4v1787872118602!5m2!1str!2str" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
```

Embed responsive container içinde kullanılmalıdır; sabit 600x450
görünümüne bağımlı tasarım yapılmamalıdır.

------------------------------------------------------------------------

# 16. Arama

Navbar arama ikonuna tıklanınca ekran ortasında modal/command-palette
tarzı arama açılmalıdır.

Özellikler:

-   keyboard shortcut: `/` veya `Ctrl/Cmd + K`
-   autocomplete
-   ürün arama
-   hizmet arama
-   sayfa arama
-   kategori arama
-   Türkçe karakter desteği
-   typo tolerance
-   dil bazlı arama
-   sonuç kategorileri
-   klavye ile gezinme

Sonuç:

``` text
Ürünler
Hizmetler
Sayfalar
```

Arama analitiği admin paneline kaydedilebilir.

------------------------------------------------------------------------

# 17. Sayfa Geçişleri ve Animasyon

## 17.1 Page transition

Sayfa değişiminde:

-   kısa,
-   premium,
-   medikal hissiyatlı,
-   dikkat dağıtmayan

loading transition.

Öneri:

Koyu yüzey + ince yeşil çizgi + minimal radial pulse.

Animasyon süresi:

``` text
180–350ms
```

Yavaş ve kullanıcıyı bekleten animasyon yasaktır.

## 17.2 Scroll reveal

Bölümler:

-   fade
-   translateY 12--24px
-   stagger

ile ortaya çıkabilir.

## 17.3 Parallax

Hero ve belirli editorial bölümlerde kullanılabilir.

Parallax:

-   düşük yoğunluklu,
-   GPU-friendly,
-   mobilde azaltılmış,
-   `prefers-reduced-motion` ile kapatılabilir

olmalıdır.

## 17.4 Hover

Kartlarda:

-   border glow,
-   image scale 1.02--1.04,
-   shadow değişimi,
-   küçük ikon hareketi

kullanılabilir.

Aşırı neon efekt kullanılmamalıdır.

------------------------------------------------------------------------

# 18. Çerez Paneli

Modern ve medikal kurumsal görünümlü cookie consent.

Kategoriler:

1.  Zorunlu
2.  Tercihler
3.  Analitik
4.  Pazarlama

Varsayılan:

-   zorunlu açık,
-   diğerleri kapalı.

Butonlar:

-   Tümünü kabul et
-   Yalnızca zorunlu
-   Tercihleri yönet

Panel:

-   mobile bottom sheet,
-   desktop bottom/right card,
-   erişilebilir,
-   keyboard navigable

olmalıdır.

Çerez tercihi daha sonra footer üzerinden değiştirilebilmelidir.

------------------------------------------------------------------------

# 19. Ziyaretçi Analitiği

Bu özellik özel önem taşır.

## 19.1 Metrikler

Admin dashboard:

-   toplam ziyaret
-   tekil ziyaretçi
-   aktif ziyaretçi
-   sayfa görüntüleme
-   oturum
-   ortalama oturum süresi
-   giriş sayfası
-   çıkış sayfası
-   trafik kaynağı
-   cihaz
-   işletim sistemi
-   tarayıcı
-   dil
-   ülke
-   şehir
-   sayfa bazlı görüntüleme
-   ürün görüntüleme
-   teklif CTA tıklaması
-   WhatsApp tıklaması
-   telefon tıklaması
-   e-posta tıklaması
-   arama sorguları

## 19.2 Refresh problemi

F5 kesinlikle yeni ziyaretçi olarak sayılmamalıdır.

Model:

``` text
anonymous visitor_id
session_id
page_view_id
```

### Visitor

İlk ziyaret:

``` text
visitor_id = random UUID
```

Birinci taraf, güvenli ve anonim cookie/local storage mekanizması ile
saklanır.

### Session

Örneğin 30 dakika inactivity timeout.

F5:

-   yeni page view olabilir,
-   yeni visitor değildir,
-   yeni session değildir.

### Metrik ayrımı

``` text
Unique Visitors
= distinct visitor_id

Visits/Sessions
= distinct session_id

Page Views
= total page_view records
```

Böylece:

``` text
F5 → +1 page view
F5 → +0 unique visitor
F5 → +0 session
```

## 19.3 Cookie reddedilirse

Kullanıcı analitik çerezlerini reddettiyse analytics tracking
yapılmamalıdır.

Zorunlu olmayan tracking gizlilik tercihine bağlı olmalıdır.

## 19.4 Şehir tespiti

Yaklaşık konum:

``` text
IP → GeoIP database/service → country/city
```

Kesin adres gösterilmemelidir.

Admin:

``` text
Şehir
Ülke
Ziyaretçi sayısı
Oturum
Sayfa görüntüleme
```

görür.

Örnek:

``` text
Ankara     482
İstanbul   214
İzmir       83
Bursa       51
```

IP adresi admin UI'da gereksiz yere gösterilmemelidir.

## 19.5 Veri saklama

Önerilen:

-   raw analytics: 12 ay
-   aggregate statistics: daha uzun süre
-   form submissions: ticari ve hukuki gereksinime göre
-   IP: mümkün olduğunca kısa süre veya hash/anonymization

Kesin retention süreleri şirketin KVKK danışmanı/hukukçusu ile
belirlenmelidir.

## 19.6 Fingerprinting

Browser fingerprinting kullanılmamalıdır.

Amaç kullanıcıyı gizlice izlemek değil, anlamlı ve gizlilik dostu
ziyaret metrikleri üretmektir.

------------------------------------------------------------------------

# 20. Admin Paneli

Admin paneli public site gibi kurumsal görünmelidir.

## Dashboard

Üst KPI:

``` text
Bugünkü Ziyaretçiler
Bugünkü Oturumlar
Sayfa Görüntüleme
Teklif Talepleri
İletişim Mesajları
WhatsApp Tıklamaları
```

Grafikler:

-   7 gün
-   30 gün
-   90 gün
-   özel tarih

## Ziyaretçi analitiği

Liste:

  Şehir   Ülke     Ziyaretçi   Oturum   Sayfa Görüntüleme Son Görülme
  ------- ------ ----------- -------- ------------------- -------------

IP adresi varsayılan listede gösterilmemelidir.

## Ürün yönetimi

Admin:

-   ürün ekle
-   düzenle
-   sil
-   arşivle
-   kategori seç
-   marka
-   model
-   açıklama
-   teknik özellik
-   görsel
-   PDF
-   SEO
-   dil içerikleri
-   öne çıkar
-   yayınla

## Medya kütüphanesi

-   drag & drop
-   klasör/tag
-   alt text
-   caption
-   MIME validation
-   dosya boyutu
-   image optimization
-   WebP/AVIF conversion
-   duplicate detection

## Sayfa editörü

Tam serbest WYSIWYG yerine structured block editor önerilir.

Block türleri:

-   Hero
-   Rich Text
-   Image
-   Image + Text
-   Cards
-   Product Grid
-   Service Grid
-   Statistics
-   Timeline
-   Testimonials
-   FAQ
-   CTA
-   Gallery
-   Map
-   Contact
-   Custom HTML yalnızca admin yetkisi olan kullanıcılar için

Bu yaklaşım tasarım sisteminin bozulmasını engeller.

------------------------------------------------------------------------

# 21. İçerik Yönetimi

İçerik modeli:

``` text
Page
PageTranslation
Section
SectionTranslation
Product
ProductTranslation
Service
ServiceTranslation
Category
CategoryTranslation
Reference
ReferenceTranslation
FAQ
FAQTranslation
Menu
MenuTranslation
SEO
Media
```

Hardcoded içerik yerine database/CMS kaynaklı içerik kullanılmalıdır.

Kodda yalnızca:

-   component logic,
-   schema,
-   design tokens,
-   route definitions,
-   validation rules

bulunmalıdır.

Kurumsal metinler kod içine gömülmemelidir.

------------------------------------------------------------------------

# 22. İçerik Yayın Akışı

Önerilen workflow:

``` text
Draft
  ↓
Review
  ↓
Approved
  ↓
Published
  ↓
Archived
```

Değişikliklerde:

-   kim değiştirdi,
-   ne zaman değiştirdi,
-   önceki değer,
-   yeni değer

audit log'a yazılmalıdır.

------------------------------------------------------------------------

# 23. Roller

Minimum:

### Super Admin

Her şey.

### Content Manager

-   sayfa
-   ürün
-   hizmet
-   medya
-   SEO

### Sales/Support

-   teklif talepleri
-   iletişim mesajları
-   müşteri kayıtları

### Analyst

-   analytics
-   rapor

### Viewer

-   yalnızca okuma.

RBAC server-side uygulanmalıdır.

------------------------------------------------------------------------

# 24. Sistem Mimarisi --- SAD

Önerilen modern mimari:

``` text
Browser
   |
CDN / WAF
   |
Web Application
   |
API / Server Actions
   |
--------------------------------
| CMS | Product | Quote | Analytics |
--------------------------------
   |
PostgreSQL
   |
Object Storage
```

Örnek teknoloji stack:

### Frontend

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS veya CSS Modules
-   Framer Motion / Motion
-   accessible component system

### Backend

Next.js server layer veya ayrı modular backend.

### Database

PostgreSQL.

### ORM

Prisma veya Drizzle.

### Storage

S3-compatible object storage.

### Email

Transactional email provider.

### Analytics

First-party privacy-aware analytics service veya custom server-side
analytics.

### Search

İlk sürümde PostgreSQL full-text/trigram.

Büyüme durumunda:

-   Meilisearch
-   Typesense
-   Elasticsearch

değerlendirilebilir.

------------------------------------------------------------------------

# 25. Modüler Kod Yapısı

God Context kesinlikle kullanılmayacaktır.

Kaçınılacak:

``` text
GlobalAppContext
EverythingContext
MegaProvider
```

Bunun yerine:

``` text
/features
  /products
  /services
  /quotes
  /analytics
  /cms
  /search
  /auth
```

Her feature:

``` text
components/
hooks/
services/
schemas/
types/
utils/
```

ayrımına sahip olabilir.

UI:

``` text
/components
  /ui
  /layout
  /navigation
  /forms
  /media
  /motion
```

olmalıdır.

------------------------------------------------------------------------

# 26. Önerilen klasör yapısı

``` text
src/
  app/
    [locale]/
      page.tsx
      hakkimizda/
      urunler/
      hizmetler/
      referanslar/
      iletisim/
      teklif/
      yasal/
    admin/
  components/
    ui/
    layout/
    navigation/
    sections/
    forms/
  features/
    products/
    services/
    quotes/
    analytics/
    search/
    cms/
    media/
    i18n/
  lib/
    db/
    auth/
    email/
    geo/
    analytics/
    storage/
    security/
  server/
    actions/
    queries/
    mutations/
  schemas/
  types/
  config/
```

------------------------------------------------------------------------

# 27. API Tasarım Prensipleri

Örnek endpoint grupları:

``` text
/api/products
/api/categories
/api/services
/api/pages
/api/search
/api/quotes
/api/contact
/api/analytics
/api/admin/media
/api/admin/users
```

Her mutation:

-   authentication,
-   authorization,
-   validation,
-   rate limiting,
-   audit log

kontrolünden geçmelidir.

------------------------------------------------------------------------

# 28. Veritabanı Ana Tabloları

Önerilen:

``` text
users
roles
permissions
audit_logs

pages
page_translations
page_sections
page_section_translations

products
product_translations
product_categories
categories
category_translations

services
service_translations

references
reference_translations

media
media_translations

quotes
quote_items
contact_messages

faqs
faq_translations

menus
menu_items
menu_item_translations

seo_metadata

analytics_visitors
analytics_sessions
analytics_page_views
analytics_events

cookie_consents
search_queries

site_settings
theme_settings
locale_settings
```

------------------------------------------------------------------------

# 29. Güvenlik

## Authentication

Admin:

-   secure session
-   HttpOnly cookies
-   Secure
-   SameSite
-   password hashing
-   MFA önerilir
-   login rate limiting
-   brute force protection

## Authorization

Frontend'de buton gizlemek yeterli değildir.

Server-side:

``` text
can("product.update")
can("quote.read")
can("analytics.read")
```

kontrolü zorunludur.

## Input validation

Zod veya eşdeğeri.

Her kullanıcı girdisi:

-   client-side validation
-   server-side validation

geçmelidir.

## XSS

Rich text sanitization.

## SQL Injection

Parameterized query / ORM.

## CSRF

Mutation endpointlerinde korunma.

## Upload security

-   MIME validation
-   extension validation
-   file size limit
-   image decoding validation
-   SVG upload varsayılan olarak kapalı veya sanitize edilmeli
-   executable upload yasak
-   random storage filename

## Headers

-   CSP
-   HSTS
-   X-Content-Type-Options
-   Referrer-Policy
-   Permissions-Policy
-   frame restrictions uygun şekilde

------------------------------------------------------------------------

# 30. KVKK ve Gizlilik

Site teklif formu ve iletişim formu ile kişisel veri topladığı için KVKK
uyumluluğu tasarımın temel parçasıdır.

Gerekli sayfalar:

1.  KVKK Aydınlatma Metni
2.  Gizlilik Politikası
3.  Çerez Politikası
4.  Çerez Tercihleri
5.  Kullanım Koşulları
6.  Yasal Uyarı
7.  İletişim / veri sorumlusu bilgileri

Hukuki metinler otomatik AI çıktısı olarak doğrudan yayınlanmamalıdır.
Hukukçu/uyum uzmanı tarafından incelenmelidir.

## Formlarda

Kişisel veri işleme amacı açıklanmalı.

Gerekli açık rıza ile:

-   hizmetin sunulması için gerekli veri,
-   pazarlama izni,
-   analitik çerez izni

birbirinden ayrılmalıdır.

Önceden işaretli pazarlama checkbox kullanılmamalıdır.

------------------------------------------------------------------------

# 31. SEO

Her public sayfa:

-   title
-   description
-   canonical
-   Open Graph
-   Twitter/X card
-   hreflang
-   structured data

desteklemelidir.

Schema:

-   Organization
-   LocalBusiness uygunluğu
-   Product
-   Service
-   BreadcrumbList
-   FAQPage yalnızca gerçekten FAQ içeriği varsa

## Sitemap

Dil bazlı URL'ler sitemap'e dahil edilmeli.

## Robots

Admin ve private endpointler indexlenmemeli.

------------------------------------------------------------------------

# 32. Görsel SEO

Her ürün görseli:

-   descriptive filename
-   alt text
-   width/height
-   responsive source
-   WebP/AVIF
-   lazy loading

kullanmalıdır.

Hero/LCP görseli preload edilebilir.

------------------------------------------------------------------------

# 33. Performans

Hedef:

-   Lighthouse Performance: 90+
-   Accessibility: 95+
-   Best Practices: 95+
-   SEO: 95+

Core Web Vitals:

-   LCP \< 2.5s
-   INP \< 200ms
-   CLS \< 0.1

Mobil performans öncelikli.

Animasyon performansı:

-   transform
-   opacity

üzerinden yapılmalıdır.

Layout thrashing ve ağır JS yasaktır.

------------------------------------------------------------------------

# 34. Responsive

Breakpoints örneği:

``` text
360
390
430
768
1024
1280
1440
1920+
```

Test:

-   iPhone
-   Android
-   tablet
-   laptop
-   desktop
-   ultra-wide

------------------------------------------------------------------------

# 35. Accessibility

WCAG 2.2 AA hedeflenmelidir.

Gereklilikler:

-   keyboard navigation
-   visible focus
-   semantic HTML
-   alt text
-   aria labels
-   form errors
-   sufficient contrast
-   reduced motion
-   screen reader
-   skip navigation
-   accessible modal
-   accessible carousel

------------------------------------------------------------------------

# 36. Arama Erişilebilirliği

Arama modalı:

-   ESC ile kapanır
-   focus trap
-   input autofocus
-   keyboard navigation
-   screen reader label

destekler.

------------------------------------------------------------------------

# 37. Çerez ve Analitik Mimari

Analytics scriptleri:

``` text
Consent Manager
      |
      +-- necessary
      |
      +-- analytics
      |
      +-- marketing
```

Kullanıcı analitik izni vermediyse analytics event gönderilmemelidir.

------------------------------------------------------------------------

# 38. Referans / Yorum Sistemi

Admin:

``` text
kurum
müşteri adı
pozisyon
yorum
puan
logo
şehir
hizmet
yayın izni
featured
```

alanlarını yönetir.

Müşteri adı/kurum bilgisi izin olmadan public yayınlanmamalıdır.

------------------------------------------------------------------------

# 39. Kataloglar

PDF kataloglar admin panelinden yüklenebilir.

Özellikler:

-   başlık
-   dil
-   kategori
-   açıklama
-   dosya
-   thumbnail
-   yayın tarihi
-   versiyon
-   aktif/pasif

PDF download analytics:

``` text
catalog_view
catalog_download
```

olarak ölçülebilir.

------------------------------------------------------------------------

# 40. Blog / İçerik Sistemi

İlk sürümde zorunlu değil fakat mimari geleceğe hazır olmalıdır.

Blog:

-   kategori
-   yazar
-   kapak
-   içerik
-   SEO
-   dil
-   yayın tarihi
-   related products
-   related services

destekleyebilir.

------------------------------------------------------------------------

# 41. Admin Audit Log

Kritik işlemler:

``` text
LOGIN
LOGIN_FAILED
PRODUCT_CREATED
PRODUCT_UPDATED
PRODUCT_PUBLISHED
PRODUCT_DELETED
PAGE_UPDATED
QUOTE_VIEWED
QUOTE_STATUS_CHANGED
USER_CREATED
USER_ROLE_CHANGED
SETTING_CHANGED
MEDIA_UPLOADED
MEDIA_DELETED
```

kaydedilmelidir.

Audit log silme yetkisi sadece Super Admin'de olmalıdır veya immutable
storage yaklaşımı uygulanmalıdır.

------------------------------------------------------------------------

# 42. Bildirim Sistemi

Admin notification center:

-   yeni teklif
-   yeni iletişim formu
-   yeni ürün taslağı
-   içerik onay bekliyor
-   sistem uyarısı
-   güvenlik uyarısı

gösterebilir.

------------------------------------------------------------------------

# 43. Hata Yönetimi

Kullanıcıya:

``` text
Bir hata oluştu. Lütfen tekrar deneyin.
```

gibi anlamlı mesaj.

Admin/log tarafında:

-   request ID
-   timestamp
-   error category
-   stack trace

bulunmalıdır.

Production'da stack trace kullanıcıya gösterilmemelidir.

------------------------------------------------------------------------

# 44. Observability

Önerilen:

-   application logs
-   error tracking
-   uptime monitoring
-   database monitoring
-   performance monitoring
-   audit logs

Sensitive data loglanmamalıdır.

------------------------------------------------------------------------

# 45. Backup

Database:

-   günlük otomatik backup
-   haftalık uzun süreli backup
-   retention
-   restore testi

Object storage:

-   versioning
-   backup
-   lifecycle

Backup alınması yeterli değildir; restore testi yapılmalıdır.

------------------------------------------------------------------------

# 46. Disaster Recovery

Minimum:

``` text
RPO: 24 saat veya daha iyi
RTO: 4–8 saat veya daha iyi
```

Kurumsal gereksinime göre sıkılaştırılabilir.

------------------------------------------------------------------------

# 47. Rate Limiting

Özellikle:

``` text
/login
/contact
/quote
/search
/analytics
```

endpointleri rate limit altında olmalıdır.

Örnek:

``` text
quote: 5 / 10 min / IP
contact: 5 / 10 min / IP
login: 5 / 15 min / account+IP
```

Gerçek limitler trafik analizine göre belirlenmelidir.

------------------------------------------------------------------------

# 48. Admin Dashboard UX

Sidebar:

``` text
Dashboard

İçerik
  Sayfalar
  Menüler
  Hizmetler
  Referanslar
  SSS

Ticari
  Ürünler
  Kategoriler
  Teklifler
  İletişim Mesajları
  Kataloglar

Medya
  Medya Kütüphanesi

Analitik
  Ziyaretçiler
  Trafik
  Arama
  Dönüşümler

Sistem
  Kullanıcılar
  Roller
  Ayarlar
  Diller
  SEO
  Çerezler
  Audit Log
```

------------------------------------------------------------------------

# 49. Admin Responsive

Admin mobilde de kullanılabilir olmalı.

Ancak kompleks tablo işlemlerinde:

-   responsive table,
-   horizontal scroll,
-   card fallback

kullanılabilir.

------------------------------------------------------------------------

# 50. Tema Yönetimi

Admin panelinden:

-   aktif tema
-   logo ileride
-   favicon
-   accent
-   header
-   footer
-   sosyal medya
-   telefon
-   e-posta
-   adres
-   WhatsApp
-   Google Maps
-   çalışma saatleri

yönetilebilir.

------------------------------------------------------------------------

# 51. Site Ayarları

`site_settings`:

``` text
company_name
company_short_name
email
phone_primary
phone_secondary
whatsapp
address
facebook_url
instagram_url
google_maps_url
google_maps_embed
default_locale
timezone
analytics_enabled
maintenance_mode
```

gibi alanlar içerebilir.

------------------------------------------------------------------------

# 52. Hardcoded Content Politikası

Kesinlikle hardcoded olmaması gerekenler:

-   ürün isimleri
-   ürün açıklamaları
-   hizmet metinleri
-   şirket metinleri
-   referanslar
-   telefon
-   e-posta
-   adres
-   sosyal medya
-   menü metinleri
-   SEO metinleri
-   istatistikler
-   kataloglar
-   FAQ
-   CTA metinleri

Kod içinde bulunabilecekler:

-   validation messages için translation key
-   component logic
-   default configuration
-   design token
-   route/schema

------------------------------------------------------------------------

# 53. God Context Politikası

Kesinlikle:

``` text
AppContext
GodContext
GlobalEverythingContext
```

yapısı kullanılmayacak.

State kategorileri ayrılmalı:

``` text
server state
form state
UI state
auth state
locale state
theme state
```

Mümkün olduğunca server state server tarafında tutulmalıdır.

------------------------------------------------------------------------

# 54. Placeholder Politikası

Production UI'da:

-   lorem ipsum
-   `Product Name`
-   `Company Name`
-   `John Doe`
-   placeholder image
-   fake statistics
-   fake review

yasaktır.

Veri yoksa:

``` text
Bu içerik henüz yayınlanmamıştır.
```

gibi public mesaj bile ancak gerçekten gerekli durumda kullanılmalı;
tercihen ilgili section admin tarafından yayınlanmayacak şekilde
yapılandırılmalıdır.

------------------------------------------------------------------------

# 55. Loading States

Her async işlem için gerçek loading state:

-   skeleton
-   spinner
-   disabled button

olmalıdır.

Butona basınca hiçbir şey olmaması yasaktır.

------------------------------------------------------------------------

# 56. Empty States

Admin:

``` text
Henüz ürün bulunmuyor.
```

Public:

İçerik yoksa ilgili section render edilmemelidir.

------------------------------------------------------------------------

# 57. Form UX

Form:

-   label
-   required indicator
-   helper text
-   validation
-   server error
-   success state

içermeli.

Gönderim sırasında:

``` text
Gönderiliyor...
```

buton disable.

Double submit engellenmelidir.

------------------------------------------------------------------------

# 58. Ürün Görsel Galerisi

Desktop:

``` text
thumbnail rail | main image
```

Mobil:

``` text
main image
dots / thumbnails
```

Fullscreen:

-   ESC
-   arrows
-   zoom
-   close

------------------------------------------------------------------------

# 59. Footer

Footer:

``` text
CEBECİ MEDİKAL

Kurumsal
Hakkımızda
Referanslar
Kataloglar

Ürünler
Kategoriler
2. El Cihazlar

Hizmetler
Teknik Servis
Bakım & Onarım
Danışmanlık

İletişim
Telefon
E-posta
Adres
Harita

Sosyal
Instagram
Facebook

Yasal
KVKK
Gizlilik
Çerez Politikası
Kullanım Koşulları

© Cebeci Medikal
```

------------------------------------------------------------------------

# 60. SEO İçerik Stratejisi

Önemli ticari kümeler:

``` text
tıbbi cihaz
medikal cihaz
tıbbi cihaz satışı
medikal cihaz Ankara
ikinci el tıbbi cihaz
ikinci el medikal cihaz
medikal cihaz teknik servis
tıbbi cihaz bakım onarım
hastabaşı monitör
ventilatör
EKG
ameliyathane cihazları
laboratuvar cihazları
endovizyon
medikal gaz sistemleri
```

Anahtar kelimeler keyword stuffing şeklinde sayfaya gömülmemelidir.

Her sayfa gerçek kullanıcı niyetine göre optimize edilmelidir.

------------------------------------------------------------------------

# 61. Local SEO

Ankara/Sincan odağı için:

-   Google Business Profile
-   NAP consistency
-   LocalBusiness structured data
-   şehir odaklı hizmet sayfaları yalnızca gerçekten hizmet veriliyorsa
-   Google Maps
-   gerçek müşteri referansları

kullanılabilir.

------------------------------------------------------------------------

# 62. Conversion Funnel

Ana funnel:

``` text
Landing
  ↓
Category/Product/Service
  ↓
Detail
  ↓
CTA
  ↓
Quote Form / WhatsApp
  ↓
Lead
  ↓
Admin
  ↓
Contact
```

Ölçülecek eventler:

``` text
product_view
service_view
quote_open
quote_submit
whatsapp_click
phone_click
email_click
map_click
catalog_download
search
language_change
theme_change
```

------------------------------------------------------------------------

# 63. Riskler

## Risk: Sahte ürün bilgisi

Çözüm:

AI draft + human approval.

## Risk: Yanlış teknik iddia

Çözüm:

Technical specs sadece doğrulanmış kaynaktan.

## Risk: KVKK ihlali

Çözüm:

Consent + privacy-by-design + minimum data.

## Risk: Spam

Çözüm:

rate limit + honeypot + server validation.

## Risk: Admin ele geçirilmesi

Çözüm:

MFA + RBAC + secure session + audit.

## Risk: Görsel telif problemi

Çözüm:

Mevcut görsellerin kullanım hakkı doğrulanmalı.

## Risk: Aşırı animasyon

Çözüm:

motion budget + reduced motion.

## Risk: SEO kaybı

Çözüm:

eski URL redirect map.

## Risk: Mobil performans

Çözüm:

image optimization + code splitting.

## Risk: Çoklu dilde tutarsızlık

Çözüm:

translation completeness dashboard.

------------------------------------------------------------------------

# 64. Migration

Eski siteden:

-   ürünler
-   ürün görselleri
-   kategoriler
-   hakkımızda
-   teknik servis
-   danışmanlık
-   kataloglar
-   iletişim
-   sosyal medya
-   SEO

verileri çıkarılmalı.

Migration sonrası:

``` text
Old URL
   ↓
Redirect map
   ↓
New URL
```

301 redirect.

Eski SEO değerinin korunması için tüm önemli URL'ler manuel olarak
eşleştirilmelidir.

------------------------------------------------------------------------

# 65. Migration Validation

Her migrated product:

``` text
product
image
category
slug
language
SEO
status
```

kontrolünden geçmelidir.

Belirsiz ürünler:

``` text
NEEDS_REVIEW
```

durumuna alınmalıdır.

------------------------------------------------------------------------

# 66. Test Planı

## Unit tests

-   validators
-   price/quote logic
-   analytics session logic
-   locale utilities
-   permissions
-   slug generation

## Integration tests

-   product CRUD
-   quote submission
-   contact submission
-   analytics events
-   admin authorization
-   media upload

## E2E

Playwright:

``` text
homepage
language switch
theme switch
search
product listing
product detail
quote form
contact form
admin login
admin product CRUD
admin content publishing
analytics
cookie consent
```

------------------------------------------------------------------------

# 67. Özel Analitik Testleri

Senaryo:

``` text
User A opens site
→ visitor 1
→ session 1
→ pageview 1

F5
→ visitor 1
→ session 1
→ pageview 2

navigate
→ visitor 1
→ session 1
→ pageview 3

after session timeout
→ visitor 1
→ session 2
```

Dashboard:

``` text
Unique visitors = 1
Sessions = 2
Page views = 3
```

olmalıdır.

Yeni cihaz/browser:

``` text
visitor 2
```

olabilir.

Bu nedenle "unique visitor" mutlak insan sayısı olarak sunulmamalıdır;
"benzersiz anonim ziyaretçi" şeklinde adlandırılmalıdır.

------------------------------------------------------------------------

# 68. Security Testing

-   OWASP Top 10
-   XSS
-   CSRF
-   SSRF
-   IDOR
-   broken access control
-   SQL injection
-   file upload
-   auth bypass
-   rate-limit bypass
-   session fixation
-   privilege escalation

test edilmelidir.

------------------------------------------------------------------------

# 69. Çoklu Dil Testleri

Her sayfa için:

``` text
TR
EN
AR
DE
JA
ZH
```

kontrolü.

Eksik translation:

Admin dashboard'da:

``` text
TR 100%
EN 100%
AR 100%
DE 100%
JA 100%
ZH 100%
```

gibi görünmelidir.

Public'te eksik dil fallback'i sessizce başka dile dönmemeli; eksik
içerik publish edilmeden yakalanmalıdır.

------------------------------------------------------------------------

# 70. Admin Yayın Öncesi Checklist

Ürün:

-   [ ] Başlıklar tamam
-   [ ] Tüm diller tamam
-   [ ] Görseller tamam
-   [ ] Alt text tamam
-   [ ] Teknik bilgiler doğrulandı
-   [ ] SEO tamam
-   [ ] Kategori tamam
-   [ ] CTA çalışıyor
-   [ ] Teklif formu çalışıyor
-   [ ] Mobil görünüm kontrol edildi
-   [ ] Yayına hazır

------------------------------------------------------------------------

# 71. Public Yayın Öncesi Checklist

-   [ ] Gerçek telefon
-   [ ] Gerçek e-posta
-   [ ] Gerçek adres
-   [ ] Gerçek sosyal medya
-   [ ] Gerçek Maps
-   [ ] KVKK
-   [ ] Çerez
-   [ ] Gizlilik
-   [ ] Kullanım koşulları
-   [ ] 404
-   [ ] 500
-   [ ] favicon
-   [ ] metadata
-   [ ] sitemap
-   [ ] robots
-   [ ] redirects
-   [ ] SSL
-   [ ] analytics consent
-   [ ] form delivery
-   [ ] WhatsApp
-   [ ] mobile
-   [ ] accessibility
-   [ ] performance

------------------------------------------------------------------------

# 72. Tasarım Sistemi

Component library:

``` text
Button
IconButton
Input
Textarea
Select
Checkbox
Radio
Switch
Badge
Card
Modal
Drawer
Tooltip
Tabs
Accordion
Breadcrumb
Pagination
Dropdown
Toast
Skeleton
Table
DataTable
ImageGallery
Lightbox
Carousel
Section
Container
```

Hepsi design token üzerinden çalışmalıdır.

------------------------------------------------------------------------

# 73. Spacing

8pt sistem:

``` text
4
8
12
16
24
32
40
48
64
80
96
120
```

Hero gibi özel alanlar dışında rastgele spacing kullanılmamalıdır.

------------------------------------------------------------------------

# 74. Border Radius

Kurumsal premium görünüm için:

``` text
sm: 6px
md: 10px
lg: 14px
xl: 20px
```

Aşırı yuvarlak "startup SaaS" kartları kullanılmamalıdır.

------------------------------------------------------------------------

# 75. Shadow

Minimal:

``` text
soft
medium
elevated
```

Koyu temada shadow yerine border ve surface contrast daha fazla
kullanılabilir.

------------------------------------------------------------------------

# 76. Motion System

``` text
fast: 120ms
normal: 220ms
slow: 350ms
page: 300ms
```

Easing:

``` text
cubic-bezier(0.22, 1, 0.36, 1)
```

`prefers-reduced-motion: reduce` durumunda:

-   parallax kapalı
-   stagger kapalı
-   transition minimal

------------------------------------------------------------------------

# 77. Kullanıcı Deneyimi Prensibi

Her sayfada kullanıcıya tek birincil CTA verilmelidir.

Öncelik:

``` text
Teklif İste
```

İkincil:

``` text
Ürünleri İncele
WhatsApp
İletişim
```

------------------------------------------------------------------------

# 78. Mobil Navigation

Mobil navbar:

-   Cebeci Medikal
-   menu button
-   Teklif CTA

drawer:

``` text
Ana Sayfa
Kurumsal
Ürünler
Hizmetler
2. El
Referanslar
Kataloglar
İletişim
```

Search ayrı modal.

------------------------------------------------------------------------

# 79. Sticky CTA

Mobilde özellikle ürün detay sayfasında:

``` text
Teklif İste | WhatsApp
```

sticky bottom bar olabilir.

İçerik alanını kapatmamalı ve safe-area desteklemelidir.

------------------------------------------------------------------------

# 80. Arama SEO ve UX

Arama sonucu URL:

``` text
/tr/arama?q=ventilatör
```

Arama sonuçları indexlenmemelidir.

Admin arama analytics:

``` text
query
language
result_count
clicked_result
timestamp
```

kişisel veri toplamadan tutulabilir.

------------------------------------------------------------------------

# 81. Yasal Sınırlar

Site:

-   teşhis koymamalı,
-   tedavi önerisi vermemeli,
-   medikal cihazı sağlık sonucunu garanti eder gibi sunmamalı,
-   yetki/sertifika yoksa varmış gibi göstermemeli,
-   "FDA/CE/ISO" gibi ibareleri doğrulamadan kullanmamalıdır.

Ürün teknik özellikleri yalnızca doğrulanabilir bilgiye dayanmalıdır.

------------------------------------------------------------------------

# 82. Referans Ekran Görüntüsü Tasarım Notu

Eklenen mevcut ekran görüntüsü yeni referans bölümünün başlangıç noktası
olarak kullanılabilir.

Mevcut yaklaşım:

-   sol editorial başlık,
-   dekoratif medikal/kurumsal grafik,
-   sağda müşteri yorum kartları,
-   koyu arka plan,
-   yatay akış

şeklindedir.

Yeni tasarımda:

-   altın renk kaldırılabilir,
-   yeşil aksan kullanılabilir,
-   kartlar daha rafine hale getirilebilir,
-   gerçek müşteri/kurum bilgileri kullanılmalı,
-   sürekli kayan carousel yerine kontrollü motion kullanılmalı,
-   klavye erişimi sağlanmalı,
-   mobilde yatay scroll yerine swipe carousel kullanılmalı.

------------------------------------------------------------------------

# 83. Kodlama Ajanı İçin Kesin Kurallar

Aşağıdaki kurallar non-negotiable'dır:

1.  Emoji kullanma.
2.  GodContext kullanma.
3.  Hardcoded kurumsal içerik kullanma.
4.  Placeholder kullanma.
5.  Sahte ürün kullanma.
6.  Sahte müşteri yorumu kullanma.
7.  İşlevsiz buton yazma.
8.  Çalışıyormuş gibi görünen fake API yazma.
9.  Ürün bilgisi uydurma.
10. AI üretimi teknik bilgiyi doğrulanmış gerçek olarak yayınlama.
11. Tüm public içerikleri CMS/database kaynaklı yap.
12. Admin panelini gerçek CRUD ile bağla.
13. Formları gerçek backend ile bağla.
14. E-posta gönderimini gerçek servis ile bağla.
15. Analytics'i gerçek veri modeli ile bağla.
16. F5 ziyaretçi sayısını manipüle etmesin.
17. Unique visitor ile session/visit/pageview ayrımını koru.
18. Yaklaşık şehir verisini gizlilik ilkeleriyle işle.
19. Admin yetkilerini server-side kontrol et.
20. SVG ikon kullan.
21. Responsive tasarım yap.
22. Accessibility uygula.
23. `prefers-reduced-motion` destekle.
24. Tüm 6 dili destekle.
25. RTL destekle.
26. SEO metadata dinamik olsun.
27. Ürün görsellerini mevcut gerçek siteden migrate et.
28. Görsel/ürün eşleşmesi belirsizse admin review oluştur.
29. Yayına çıkmadan tüm AI-generated content insan onayından geçsin.
30. Public sitede debug verisi bırakma.

------------------------------------------------------------------------

# 84. Definition of Done

Proje tamamlandı sayılabilmesi için:

### Public

-   tüm ana sayfalar çalışıyor,
-   tüm ürünler database'den geliyor,
-   tüm hizmetler database'den geliyor,
-   tüm formlar çalışıyor,
-   WhatsApp çalışıyor,
-   Maps çalışıyor,
-   arama çalışıyor,
-   i18n çalışıyor,
-   RTL çalışıyor,
-   temalar çalışıyor,
-   cookie consent çalışıyor,
-   analytics doğru çalışıyor,
-   admin paneli çalışıyor.

### Admin

-   CRUD gerçek,
-   RBAC gerçek,
-   audit log gerçek,
-   media upload gerçek,
-   publishing workflow gerçek,
-   analytics gerçek,
-   form leads gerçek.

### Quality

-   E2E testler geçiyor,
-   Lighthouse hedefleri karşılanıyor,
-   WCAG AA kontrolleri yapılıyor,
-   security testleri yapılıyor,
-   backup/restore test ediliyor,
-   staging ortamı production'dan ayrılıyor.

------------------------------------------------------------------------

# 85. Staging ve Production

Ortamlar:

``` text
local
development
staging
production
```

Production verisi development'a kopyalanmamalıdır.

Secrets:

-   environment variables
-   secret manager

ile yönetilmelidir.

Git repository içine:

-   API key
-   password
-   SMTP credential
-   database URL
-   JWT secret

konulmaz.

------------------------------------------------------------------------

# 86. CI/CD

Pipeline:

``` text
push
 ↓
lint
 ↓
typecheck
 ↓
unit test
 ↓
build
 ↓
integration test
 ↓
security checks
 ↓
deploy staging
 ↓
E2E
 ↓
manual approval
 ↓
production
```

------------------------------------------------------------------------

# 87. Monitoring Alertleri

Uyarılar:

-   site down
-   5xx spike
-   database unavailable
-   storage failure
-   email failure
-   quote submission failure
-   authentication abuse
-   unusual admin login
-   analytics ingestion failure

------------------------------------------------------------------------

# 88. Son Kullanıcı Güven Unsurları

Ana sayfada gerçek veriler doğrulandıktan sonra:

-   sektör deneyimi,
-   hizmet kapsamı,
-   ürün kategorileri,
-   teknik servis,
-   referanslar,
-   çalışma alanları,
-   iletişim bilgileri,
-   açık adres,
-   Google Maps

gösterilmelidir.

Güven unsuru olarak sahte "müşteri sayısı" veya "başarı oranı"
kullanılmamalıdır.

------------------------------------------------------------------------

# 89. Gelecek Fazlar

İlk sürüm sonrasında:

### Faz 2

-   Blog
-   gelişmiş arama
-   katalog yönetimi
-   gelişmiş CRM entegrasyonu
-   servis talebi takip sistemi

### Faz 3

-   müşteri portalı
-   servis kayıtları
-   cihaz bakım geçmişi
-   teklif durum takibi
-   B2B müşteri hesabı

### Faz 4

-   ERP/CRM entegrasyonu
-   stok entegrasyonu
-   teklif PDF oluşturma
-   e-posta otomasyonu
-   gelişmiş BI

Bunlar ilk sürümde gereksiz karmaşıklık yaratmamalıdır.

------------------------------------------------------------------------

# 90. Proje Önceliklendirme

## P0 --- Yayın için zorunlu

-   kurumsal ana sayfa
-   ürünler
-   ürün detay
-   hizmetler
-   hakkımızda
-   iletişim
-   teklif formu
-   WhatsApp
-   admin
-   CMS
-   i18n
-   KVKK
-   cookie consent
-   güvenlik
-   SEO
-   responsive
-   analytics
-   gerçek veri

## P1 --- Güçlü şekilde önerilir

-   referanslar
-   kataloglar
-   gelişmiş arama
-   audit log
-   media library
-   translation completeness
-   advanced dashboard

## P2 --- Sonraki faz

-   blog
-   CRM
-   servis takip
-   müşteri portalı
-   ERP entegrasyonu

------------------------------------------------------------------------

# 91. Başlangıç İçerik Migrasyonu

Mevcut siteden doğrulanacak başlıca içerikler:

-   2015 sektör deneyimi
-   2021 CBC Medikal kuruluş/faaliyet bilgisi
-   tıbbi cihaz satışı
-   teknik servis
-   işletme ve yatırım danışmanlığı
-   mevcut ürün kategorileri
-   ikinci el tıbbi cihaz kategorileri
-   mevcut iletişim bilgileri

Yeni site bunları aynen kopyalamak yerine kurumsal dil ve bilgi mimarisi
açısından yeniden düzenlemelidir.

------------------------------------------------------------------------

# 92. Mevcut Ürün Kategorileri İçin Başlangıç Haritası

Mevcut sitede görülen kategoriler:

``` text
Ameliyathane Cihazları
Laboratuvar Cihazları
Fizik Tedavi Cihazları
Fizyolojik Sinyal İzleyiciler
Yaşam Destek Cihazları
Medikal Gaz Sistemleri
Sarf Malzemeler
Endovizyon Sistemleri
2. El Tıbbi Cihazlar
```

Bu kategoriler migration sırasında admin paneline aktarılmalı; yeni
taxonomy şirket tarafından doğrulanmalıdır.

------------------------------------------------------------------------

# 93. Marka Güveni İçin Önerilen Ana Sayfa Sıralaması

``` text
1. Hero
2. Güven / kısa şirket özeti
3. Ürün kategorileri
4. Hizmetler
5. Neden Cebeci Medikal?
6. Teknik uzmanlık / süreç
7. Öne çıkan ürünler
8. Kurumsal hikâye
9. Referanslar
10. Katalog / bilgi kaynakları
11. Teklif CTA
12. İletişim + harita
13. Footer
```

Bu sıralama kullanıcının keşiften güvene, güvenden dönüşüme ilerlemesini
sağlar.

------------------------------------------------------------------------

# 94. Final Tasarım Hedefi

Yeni Cebeci Medikal sitesi açıldığında kullanıcıda şu izlenim
oluşmalıdır:

> "Bu eski bir medikal cihaz satış sitesi değil; ürün, teknik servis ve
> danışmanlık tarafında gerçek bir kurumsal sağlık teknolojileri
> şirketi."

Site:

-   premium,
-   hızlı,
-   güvenilir,
-   sade,
-   teknik,
-   modern,
-   erişilebilir,
-   çok dilli,
-   yönetilebilir

olmalıdır.

Animasyon tasarımın kendisi değil, tasarımı destekleyen katman
olmalıdır.

------------------------------------------------------------------------

# 95. Kaynak ve Referans Notları

Mevcut Cebeci Medikal sitesinde ana navigasyonda Ana Sayfa, Hakkımızda,
Ürünler, 2. El Tıbbi Cihazlar, Kataloglar, Danışmanlık, Teknik Servis ve
İletişim bölümleri yer almakta; ürün tarafında ameliyathane,
laboratuvar, fizik tedavi, fizyolojik sinyal izleyiciler, yaşam destek,
medikal gaz, sarf ve endovizyon gibi kategoriler görülmektedir.

Mevcut hakkımızda içeriğinde 2015'ten beri sağlık sektörüne hizmet
verildiği ve 2021'de CBC Medikal'in resmi faaliyete geçtiği
belirtilmektedir.

Teknik servis hizmet mimarisi oluşturulurken sektördeki benzer kurumsal
yapılarda görülen arıza tespiti, bakım-onarım, kurulum/devreye alma,
teknik kontrol, yedek parça ve danışmanlık gibi hizmet grupları
incelenebilir; ancak Cebeci Medikal'in gerçekten sunduğu hizmetler
yönetim tarafından onaylanmadan yayınlanmamalıdır.

Kaynaklar:

-   https://www.cebecimedikal.com/
-   https://www.cebecimedikal.com/hakkimizda
-   https://www.cebecimedikal.com/2el-tibbi-cihazlar
-   https://www.facebook.com/cebeci.medikal/
-   https://www.instagram.com/cbcmedikal
-   https://www.google.com/maps/place/Cebeci+Medikal/
-   https://www.okasaglik.com/
-   https://www.promedser.com/
-   https://makmedikal.com/hizmet/medikal-teknik-servis
-   https://www.atlasbiyomedikal.com.tr/
-   https://lumimedmedical.com/tr/teknik-servis/

------------------------------------------------------------------------

# 96. Kodlama Ajanına Verilecek Son Talimat

Bu doküman projenin ana ürün, mimari, tasarım ve kalite sözleşmesi
olarak kabul edilmelidir.

İmplementasyon sırasında bir özellik:

-   gerçekten çalışmıyorsa tamamlanmış sayılmayacak,
-   gerçek veri gerektiriyorsa database/CMS bağlantısı kurulacak,
-   kullanıcı verisi işliyorsa güvenlik ve KVKK dikkate alınacak,
-   çoklu dil gerektiriyorsa altı dilde desteklenecek,
-   admin tarafından yönetilmesi gerekiyorsa admin CRUD'u yapılacak,
-   placeholder gerekiyorsa ilgili içerik public'e çıkarılmayacak,
-   AI içerik üretiyorsa insan onayına girmeden yayınlanmayacak.

Öncelik sırası:

``` text
Doğruluk
↓
Güvenlik
↓
Kullanılabilirlik
↓
Performans
↓
Erişilebilirlik
↓
SEO
↓
Estetik
↓
Animasyon
```

Hiçbir görsel efekt gerçek işlevselliğin önüne geçmemelidir.

**Hedef sonuç:** Cebeci Medikal'in gerçek ticari operasyonlarını temsil
eden, uzun yıllar sürdürülebilecek, kurumsal seviyede bir web platformu.
