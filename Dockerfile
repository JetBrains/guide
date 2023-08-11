FROM node:20.5-alpine As builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=builder /app/_site/ /usr/share/nginx/html
