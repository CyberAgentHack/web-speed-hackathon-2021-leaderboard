## 2021/12/27 20:30 JST

Web Speed Hackathon 2021 mini 運営 @3846masa です

2 点お知らせがあります

---

### 計測がうまくいかない不具合について

2021/12/27 未明より、GitHub Actions による計測が不安定であることを確認しています

- `/rerun` コマンドが反応しない
- コメントが「計測しています」のまま動かなくなる
- スコアの計測に失敗する
- リーダーボードの更新に失敗する

もし、上記のような状態になった場合、GitHub Actions のログをご確認いただければ幸いです

GitHub Actions のログをご覧になるには、コメント下部に記載される URL を開くか、次の URL から該当の workflow を検索してください

https://github.com/CyberAgentHack/web-speed-hackathon-2021-leaderboard/actions

---

### スコア計測時の GitHub Actions に日本語フォントをインストールします

**スコア計測時の GitHub Actions に日本語フォントがインストールされておらず、スコアが全体的に低く算出される問題が判明しました**

このアナウンスより後の計測では、 **スコア計測時の GitHub Actions に Noto Sans CJK をインストールします**

この変更により、再計測でスコアが大きく変動する可能性があります、ご了承ください

なお、**この件にかんして、運営からはスコアの再計測を行いません**

**再計測を希望する方は従来通り `/rerun` コマンドをご利用ください**

---

この件について質問があれば、お気軽に @3846masa までお問い合わせください

**残り 1 週間になりましたが、このあとも Web Speed Hackathon 2021 mini をお楽しみください！**

## 2021/12/10 0:20 JST

Web Speed Hackathon 2021 mini 運営 @CyberAgentHack/wsh-admin です

**課題のコードで不具合があったため、修正パッチを公開します**

### 修正内容

<details>

- webpack の設定に間違いがあり、webpack-dev-server が起動しない
- webfont.css の `@charset` 規則によって PostCSS でエラーが起きる
- 投稿取得の API から返却される画像情報の順序が一意にならない

</details>

### パッチの取り込み方法

<details>

1. 最新の main branch を fetch します

   - ```bash
     git remote add upstream https://github.com/CyberAgentHack/web-speed-hackathon-2021.git
     git fetch upstream main
     ```

2. FETCH_HEAD を rebase します

   - ```bash
     git rebase FETCH_HEAD
     ```
   - `"Initial commit"` でコンフリクトした場合は skip します
     ```bash
     git rebase --skip
     ```
   - それ以外でコンフリクトが発生したら、実装に合わせて解消してください

3. upstream を削除します

   - ```bash
     git remote remove upstream
     ```

</details>

:warning: **VRT チェックも更新されるため、修正パッチを必ず適用してください**

---

この件について質問があれば、お気軽に @CyberAgentHack/wsh-admin までお問い合わせください

**このあとも Web Speed Hackathon 2021 mini をお楽しみください！**
