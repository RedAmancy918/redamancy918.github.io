# Jiahao Yang — Personal Website

English-language academic website at https://redamancy918.github.io/.

## Files

- `index.html`: biography, research and experience.
- `site.js`: profile photo setting, publication filters and citation dialog.
- `style.css`: responsive styles.
- `bibliography.json`: citation records.
- `life.html`, `life.css`, `life.js`: public life updates page.
- `posts.json`: published updates only.
- `assets/`: blank portrait placeholder and research figures.

The site is static and needs no package installation or build step. Serve this directory with a static HTTP server for a local preview. GitHub Pages publishes the `main` branch from the repository root.

## Replace the profile photo

The portrait area currently contains a plain white placeholder.

1. Put your photo in `assets/`, for example `assets/portrait.jpg`.
2. In `site.js`, change `const PROFILE_PHOTO = 'assets/portrait.svg';` to `const PROFILE_PHOTO = 'assets/portrait.jpg';`.
3. Commit and push the image and `site.js` to `main`.

The same setting updates all screen sizes. A portrait at least 380 pixels wide is recommended.

## Education

Undergraduate and master's education are included in the opening biography. The separate Education section is preserved inside an HTML comment in `index.html`. Remove that comment wrapper to restore the section.

## Life updates

The private editor runs only on the owner's Mac and is kept outside this public repository. Drafts and GitHub credentials are never included here. Only published text and selected photos appear in `posts.json` and `assets/life/`.

## Research attribution

MimicIK figures were supplied by Jiahao Yang. Other research thumbnails accompany their original public paper or project pages:

- MimicIK: https://arxiv.org/abs/2606.15148
- RoboSeek: https://russderrick.github.io/Roboseek/
- ReFPO: https://neurips.cc/virtual/2026/poster/152804
- MaskVLA: https://arxiv.org/abs/2609.23565
- Acting While Understanding — Shenhao Yan et al., Figure 2, unchanged original: https://arxiv.org/html/2606.15285v1/image/async_pipeline.png ([paper](https://arxiv.org/abs/2606.15285), arXiv nonexclusive distribution license).
- Elastic Queries — Ge Wang et al., Figure 2, resized proportionally for web: https://arxiv.org/html/2606.14375v1/figures/methodology.png ([paper](https://arxiv.org/abs/2606.14375), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).
- KoopmanFlow — Chengsi Yao et al., Figure 3, resized proportionally for web: https://arxiv.org/html/2603.13781v1/Koopaflow.png ([paper](https://arxiv.org/abs/2603.13781), arXiv nonexclusive distribution license).
- SVLL — Yuyuan Yang et al., Figure 4, unchanged original: https://arxiv.org/html/2603.11563v1/CVPR_4.png ([paper](https://arxiv.org/abs/2603.11563), [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)).

Research figures remain subject to their original licenses. Their inclusion does not grant a new license to the underlying research assets.
