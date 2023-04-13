FROM mcr.microsoft.com/playwright:focal
# copy project (including tests)
COPY . /tests
WORKDIR /tests
# Install dependencies
RUN npm install
# Install browsers
RUN npx playwright install
# Run playwright test
CMD [ "npx", "playwright", "test" ]