FROM mcr.microsoft.com/playwright:focal
COPY . /tests
WORKDIR /tests
RUN npm install
RUN npx playwright install
CMD [ "npx", "playwright", "test" ]