#!/usr/bin/env bash
curl -L -o tmp-paper.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Vintage_Paper_Texture_%289789792113%29.jpg"
cwebp -q 75 tmp-paper.jpg -o public/images/paper-texture.webp
rm tmp-paper.jpg
echo "✅ paper-texture.webp ready"