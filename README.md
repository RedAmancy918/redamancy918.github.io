# Jiahao Yang — Personal Website

Bilingual academic website for Jiahao Yang. English is the default; Chinese is available through the language toggle.

## Files

- `index.html`: biography, publications, experience and education.
- `site.js`: Chinese translations, publication filters and citation dialog.
- `style.css`: responsive page styles.
- `bibliography.json`: BibTeX records.
- `assets/`: portrait and research figures.

The site is static and requires no package installation or build step. For a local preview, serve this directory with any static HTTP server.

## 替换个人照片

当前照片区域为纯白占位，不含个人照片。

1. 将自己的照片放入 `assets/`，例如命名为 `portrait.jpg`。
2. 打开 `site.js`，将 `const PROFILE_PHOTO = 'assets/portrait.svg';` 改为 `const PROFILE_PHOTO = 'assets/portrait.jpg';`。
3. 保存并提交到 GitHub 的 `main` 分支。GitHub Pages 更新后即可显示。

同一个设置会更新电脑和手机上的照片。建议使用竖版头像，照片宽度至少 380 像素。

## 教育背景

Education 区块已在 `index.html` 中用 HTML 注释保留，当前网页不展示。需要恢复时，移除该区块外侧的 `<!-- … -->` 即可。

## Publication

Intended for GitHub Pages at https://redamancy918.github.io/ using the main branch, root directory. `.nojekyll` preserves the static files.

## Figure attribution

Research thumbnails accompany their source papers. MimicIK figures were supplied by Jiahao Yang. RoboSeek, ReFPO and MaskVLA figures come from their linked public project/paper pages:

- https://arxiv.org/abs/2606.15148
- https://russderrick.github.io/Roboseek/
- https://arxiv.org/abs/2606.21086
- https://arxiv.org/abs/2609.23565

Research figures remain subject to their original licenses. Their presence here does not grant a new license to the underlying research assets.
