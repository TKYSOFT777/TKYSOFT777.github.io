/* ==========================================================
   動画の設定ファイル（YouTube / TikTok）
   ----------------------------------------------------------
   動画を公開したら、下の videos に 1 本ずつ追加するだけで
   サイトの「MOVIES」欄に並びます（URL をそのまま貼れば OK）。

   対応している URL の形：
     YouTube   https://www.youtube.com/watch?v=XXXXXXXXXXX
               https://youtu.be/XXXXXXXXXXX
     Shorts    https://www.youtube.com/shorts/XXXXXXXXXXX   （縦長で表示）
     TikTok    https://www.tiktok.com/@アカウント/video/1234567890123456789（縦長で表示）

   項目：
     url    … 動画の URL（必須）
     title  … カードに出すタイトル
     game   … 関連するゲーム名（SUPERNOVA / Palette Bullet / BrawlerOne など）
     thumb  … サムネイル画像（省略可。YouTube は自動取得。TikTok は指定がなければゲーム画像）

   channels にアカウントの URL を入れると、フッターと MOVIES 欄に
   YouTube / TikTok へのリンクボタンが出ます（空のままなら出ません）。
   ========================================================== */
window.TKY_MEDIA = {
  channels: {
    youtube: "",   // 例: "https://www.youtube.com/@TKYSOFT777"
    tiktok: ""     // 例: "https://www.tiktok.com/@tkysoft777"
  },
  videos: [
    // { url: "https://www.youtube.com/watch?v=XXXXXXXXXXX", title: "SUPERNOVA 公式トレーラー", game: "SUPERNOVA" },
    // { url: "https://www.youtube.com/shorts/XXXXXXXXXXX", title: "1分でわかる Palette Bullet", game: "Palette Bullet" },
    // { url: "https://www.tiktok.com/@tkysoft777/video/1234567890123456789", title: "BrawlerOne 4人対戦", game: "BrawlerOne" },
  ]
};
