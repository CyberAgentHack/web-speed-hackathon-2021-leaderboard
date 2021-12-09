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
