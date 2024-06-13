## Быстрый запуск проекта

```bash
# 1.
$ cp env-example .env

# 2.
$ docker compose up
```
Api доступно по адресу http://localhost:3000

## Нагрузочное тестирование метода поиска

Перед запуском команд нужно убедиться что проект запущен

```bash
# Тест без индекса
$ npm run test:load

# Тест с индексом
$ npm run test:load-index

```
## Разработка

```bash
# 1.
$ cp env-example .env

# 2. В файле .env изменить DATABASE_URL=mongodb://mongo:27017 на DATABASE_URL=mongodb://localhost:27017

# 3.
$ docker compose -f docker-compose-dev.yaml up -d

# 4.
$ npm install

# 5. Добавляет 10млн документов вида {name: [RANDOM_STRING]}
$ npm run seed:run

# 6.
$ npm run start:dev
```