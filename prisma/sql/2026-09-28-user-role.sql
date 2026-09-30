-- Adds the USER role (client accounts that only use /seo-questionnaire) and makes it the default.
-- Additive only: existing EDITOR rows are kept and treated as clients by the app.
-- Run once: npx prisma db execute --file prisma/sql/2026-09-28-user-role.sql --schema prisma/schema.prisma
ALTER TABLE `User` MODIFY `role` ENUM('ADMIN','EDITOR','USER') NOT NULL DEFAULT 'USER';
